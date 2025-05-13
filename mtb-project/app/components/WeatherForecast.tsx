"use client";

import { useState, useEffect } from 'react';



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

export default function WeatherForecast({ location, latitude, longitude, apiKey }: WeatherForecastProps) {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [hourlyData, setHourlyData] = useState<{ time: string; temp: number; icon: string; text: string }[]>([]);

  // Helper function to get proper weather icon
  const getWeatherIcon = (conditionCode: string): string => {
    // Map OpenWeatherMap condition codes to emojis
    const iconMap: Record<string, string> = {
      '01d': '☀️', // clear sky day
      '01n': '🌙', // clear sky night
      '02d': '⛅', // few clouds day
      '02n': '☁️', // few clouds night
      '03d': '☁️', // scattered clouds
      '03n': '☁️',
      '04d': '☁️', // broken clouds
      '04n': '☁️',
      '09d': '🌧️', // shower rain
      '09n': '🌧️',
      '10d': '🌦️', // rain day
      '10n': '🌧️', // rain night
      '11d': '⛈️', // thunderstorm
      '11n': '⛈️',
      '13d': '❄️', // snow
      '13n': '❄️',
      '50d': '🌫️', // mist
      '50n': '🌫️',
    };

    return iconMap[conditionCode] || '🌤️';
  };

  // Function to get day name
  const getDayName = (dateStr: string): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      let timeoutId: NodeJS.Timeout | undefined;

      try {
        setLoading(true);
        
        // Skip API call if key is placeholder or not provided
        if (!apiKey || apiKey === 'process.env') {
          console.log('No valid API key provided, using fallback data');
          throw new Error('API key not configured');
        }
        
        console.log('Using API key (truncated):', apiKey.substring(0, 5) + '...');
        
        // Use OpenWeatherMap API key
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
        
        const data = await response.json();
        console.log('Weather data received successfully');
        
        // Process WeatherAPI data format
        const todayDate = data.forecast.forecastday[0].date;
        const todayWeekday = getDayName(todayDate);
        const processedData: WeatherDay[] = [
          {
            day: 'Today',
            icon: data.forecast.forecastday[0].day.condition.icon,
            high: Math.round(data.forecast.forecastday[0].day.maxtemp_f),
            low: Math.round(data.forecast.forecastday[0].day.mintemp_f),
          },
          ...data.forecast.forecastday
            .slice(1)
            .filter((day: any) => day.date !== todayDate && getDayName(day.date) !== todayWeekday)
            .map((day: any) => ({
              day: getDayName(day.date),
              icon: day.day.condition.icon,
              high: Math.round(day.day.maxtemp_f),
              low: Math.round(day.day.mintemp_f),
            }))
        ];

        // For hourly forecast (for today)
        const todayHourly = data.forecast.forecastday[0]?.hour.map((hour: any) => ({
          time: hour.time.split(' ')[1], // "HH:MM"
          temp: Math.round(hour.temp_f),
          icon: hour.condition.icon,
          text: hour.condition.text,
        })) || [];
        setWeatherData(processedData);
        setHourlyData(todayHourly);
        setError(null);
        
        // Format current time for "last updated"
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err: any) {
        if (timeoutId) clearTimeout(timeoutId);
        
        if (err.name === 'AbortError') {
          console.error('API request timeout');
          throw new Error('Weather API request timed out');
        }
        
        console.error('Error fetching weather data:', err);
        let errorMessage = 'Could not load weather data';
        
        if (err instanceof Error) {
          errorMessage = err.message;
          // Don't show API key errors to users
          if (errorMessage.includes('API key')) {
            errorMessage = 'Weather API not configured correctly';
          }
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
                    <img src={day.icon} alt="weather icon" className="w-8 h-8 mr-3 inline-block" />
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
          <h4 className="text-lg font-semibold text-white mt-8 mb-2">Today's Hourly Forecast</h4>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {hourlyData.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center bg-gray-700 rounded-lg px-2 py-3 min-w-[70px]">
                <span className="text-xs text-gray-300">{hour.time}</span>
                <img src={hour.icon} alt={hour.text} className="w-8 h-8 my-1" />
                <span className="text-white font-medium">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="my-6 rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="350"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=-82.32%2C28.53%2C-82.30%2C28.55&layer=mapnik&marker=28.54%2C-82.31"
          style={{ border: 0 }}
          allowFullScreen
          title="Trail Location Map"
        ></iframe>
        <div className="text-xs text-gray-400 text-center mt-1">
          <a href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`} target="_blank" rel="noopener noreferrer">
            View Larger Map
          </a>
        </div>
      </div>
    </div>
  );
} 