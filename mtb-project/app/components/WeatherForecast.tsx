"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';



interface WeatherDay {
  day: string;
  icon: string;
  high: number;
  low: number;
}

interface WeatherForecastProps {
  location: string;
  latitude: number;
  longitude: number;
  apiKey: string;
}

// Add this helper function after the interfaces
const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  if (url.startsWith('/')) {
    return `https://cdn.weatherapi.com${url}`;
  }
  if (!url.startsWith('http')) {
    return `https://cdn.weatherapi.com/weather/64x64/day/${url}`;
  }
  return url;
};

// Add proper types for the API response
interface WeatherAPIResponse {
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        condition: {
          icon: string;
        };
        maxtemp_f: number;
        mintemp_f: number;
      };
      hour: Array<{
        time: string;
        temp_f: number;
        condition: {
          icon: string;
          text: string;
        };
      }>;
    }>;
  };
}

interface ErrorType extends Error {
  name: string;
  message: string;
}

export default function WeatherForecast({ location, latitude, longitude, apiKey }: WeatherForecastProps) {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [hourlyData, setHourlyData] = useState<{ time: string; temp: number; icon: string; text: string }[]>([]);

  // Function to get day name
  const getDayName = (dateStr: string): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  // Fallback data
  const getFallbackData = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Set fallback weather data
    setWeatherData([
      { day: 'Today', icon: '☀️', high: 82, low: 64 },
      { day: getDayName(new Date(now.setDate(now.getDate() + 1)).toISOString()), icon: '🌤️', high: 80, low: 62 },
      { day: getDayName(new Date(now.setDate(now.getDate() + 1)).toISOString()), icon: '🌧️', high: 75, low: 60 },
      { day: getDayName(new Date(now.setDate(now.getDate() + 1)).toISOString()), icon: '☁️', high: 78, low: 62 },
      { day: getDayName(new Date(now.setDate(now.getDate() + 1)).toISOString()), icon: '☀️', high: 83, low: 65 }
    ]);

    // Set fallback hourly data
    const hours = [];
    let baseTemp = 75;
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0') + ':00';
      // Create a simple temperature curve
      const temp = baseTemp + Math.sin((i - 6) * Math.PI / 12) * 8;
      hours.push({
        time: hour,
        temp: Math.round(temp),
        icon: '☀️',
        text: 'Sunny'
      });
    }
    setHourlyData(hours);
    setLoading(false);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      let timeoutId: NodeJS.Timeout | undefined;

      try {
        setLoading(true);
        
        // Skip API call if key is not provided
        if (!apiKey || apiKey === 'process.env.NEXT_PUBLIC_WEATHERAPI_KEY' || apiKey === '') {
          console.log('No API key provided, using fallback data');
          getFallbackData();
          return;
        }
        
        console.log('Using API key (truncated):', apiKey.substring(0, 5) + '...');
        
        // Use WeatherAPI endpoint
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`;
        
        console.log('Fetching weather data from:', apiUrl?.replace(apiKey, 'API_KEY_HIDDEN'));
        
        // Create fetch request with timeout
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(apiUrl, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API response error:', response.status, errorText);
          throw new Error(`API responded with status ${response.status}: ${errorText}`);
        }
        
        const data = (await response.json()) as WeatherAPIResponse;
        console.log('Weather data received successfully');
        
        // Process WeatherAPI data format
        const forecastDays = data.forecast.forecastday;
        const todayDate = forecastDays[0].date;
        const todayWeekday = getDayName(todayDate);
        const processedData: WeatherDay[] = [
          {
            day: 'Today',
            icon: `https:${forecastDays[0].day.condition.icon}`,
            high: Math.round(forecastDays[0].day.maxtemp_f),
            low: Math.round(forecastDays[0].day.mintemp_f),
          },
          ...forecastDays
            .slice(1)
            .filter((day) => day.date !== todayDate && getDayName(day.date) !== todayWeekday)
            .map((day) => ({
              day: getDayName(day.date),
              icon: `https:${day.day.condition.icon}`,
              high: Math.round(day.day.maxtemp_f),
              low: Math.round(day.day.mintemp_f),
            }))
        ];

        // For hourly forecast (for today)
        const todayHourly = forecastDays[0]?.hour.map((hour) => ({
          time: hour.time.split(' ')[1], // "HH:MM"
          temp: Math.round(hour.temp_f),
          icon: `https:${hour.condition.icon}`,
          text: hour.condition.text,
        })) || [];
        setWeatherData(processedData);
        setHourlyData(todayHourly);
        setError(null);
        
        // Format current time for "last updated"
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err: unknown) {
        if (timeoutId) clearTimeout(timeoutId);
        
        const error = err as ErrorType;
        if (error.name === 'AbortError') {
          console.error('API request timeout');
          throw new Error('Weather API request timed out');
        }
        
        console.error('Error fetching weather data:', error);
        let errorMessage = error.message;
        
        // Don't show API key errors to users
        if (errorMessage.includes('API key')) {
          errorMessage = 'Weather API not configured correctly';
        }
        
        setError(errorMessage);
        
        // Fallback to default values
        setWeatherData([
          { day: 'Today', icon: '☀️', high: 82, low: 64 },
          { day: 'Wed', icon: '🌤️', high: 80, low: 62 },
          { day: 'Thu', icon: '🌧️', high: 75, low: 60 },
          { day: 'Fri', icon: '☁️', high: 78, low: 62 },
          { day: 'Sat', icon: '☀️', high: 83, low: 65 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, apiKey]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3 text-white">Weather Forecast</h3>
      
      {/* Weather Location/City Component */}
      <div className="bg-gray-700 rounded-lg p-4 mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm">📍</span>
          </div>
          <a 
            href={`https://www.weather.gov/search?q=${encodeURIComponent(location)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-blue-300 transition-colors"
            title={`View detailed weather for ${location}`}
          >
            {location}
          </a>
        </div>
        <div className="text-xs text-gray-300">
          {loading ? 'Loading...' : `Updated ${lastUpdated}`}
        </div>
      </div>
      
      {/* Weather Forecast Cards */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-4">{error}</div>
          ) : (
            <div className="space-y-3">
              {weatherData.map((day, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center">
                    {day.icon.includes('cdn.weatherapi.com') ? (
                      <img 
                        src={day.icon} 
                        alt="weather icon" 
                        className="w-8 h-8 mr-3"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span className="text-2xl mr-3" role="img" aria-label="weather icon">{day.icon}</span>
                    )}
                    <span className="text-white">{day.day}</span>
                  </div>
                  <div className="text-white">{day.high}° / {day.low}°</div>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-3 text-center">
            {error ? (
              'Using fallback data'
            ) : 'Weather data from WeatherAPI.com'}
          </div>
        </div>
      </div>

      {/* Hourly Forecast for Today */}
      {hourlyData.length > 0 && (
        <>
          <h4 className="text-lg font-semibold text-white mt-8 mb-2">Today&apos;s Hourly Forecast</h4>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {hourlyData.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center bg-gray-700 rounded-lg px-2 py-3 min-w-[70px]">
                <span className="text-xs text-gray-300">{hour.time}</span>
                {hour.icon.includes('cdn.weatherapi.com') ? (
                  <img 
                    src={hour.icon}
                    alt={hour.text} 
                    className="w-8 h-8 my-1"
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="text-2xl my-1" role="img" aria-label={hour.text}>{hour.icon}</span>
                )}
                <span className="text-white font-medium">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 