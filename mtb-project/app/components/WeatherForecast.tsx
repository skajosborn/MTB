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
    const today = new Date();
    
    if (date.getDate() === today.getDate()) {
      return 'Today';
    }
    
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Add timeout variable outside try/catch so it's accessible everywhere
      let timeoutId: NodeJS.Timeout | undefined;

      try {
        setLoading(true);
        
        // Skip API call if key is placeholder or not provided
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
          console.log('No valid API key provided, using fallback data');
          throw new Error('API key not configured');
        }
        
        console.log('Using API key (truncated):', apiKey.substring(0, 5) + '...');
        
        // Determine if we're using a Google API key or OpenWeatherMap key
        let apiUrl;
        if (apiKey.startsWith('AIza')) {
          // This appears to be a Google API key, which won't work with weather APIs
          console.log('Google API key detected - using fallback weather data');
          
          // Use fallback data instead of making an API call that will fail
          throw new Error('Google API keys are not compatible with weather APIs. Please obtain a dedicated weather API key.');
          
        } else {
          // Assume OpenWeatherMap API key
          console.log('Using OpenWeatherMap API');
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
          
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
          
          // Process OpenWeatherMap data format (original code)
          const processedData: WeatherDay[] = [];
          const dateProcessed = new Set<string>();
          
          data.list.forEach((item: any) => {
            const date = item.dt_txt.split(' ')[0];
            
            // Only process each date once (for the highest temp of the day)
            if (!dateProcessed.has(date)) {
              dateProcessed.add(date);
              
              // Find high/low for this day
              const dayForecasts = data.list.filter((forecast: any) => 
                forecast.dt_txt.startsWith(date)
              );
              
              const high = Math.max(...dayForecasts.map((forecast: any) => 
                Math.round(forecast.main.temp_max)
              ));
              
              const low = Math.min(...dayForecasts.map((forecast: any) => 
                Math.round(forecast.main.temp_min)
              ));
              
              // Use noon forecast for the icon if available, otherwise use first forecast of the day
              const noonForecast = dayForecasts.find((forecast: any) => 
                forecast.dt_txt.includes('12:00:00')
              ) || dayForecasts[0];
              
              processedData.push({
                day: getDayName(date),
                icon: getWeatherIcon(noonForecast.weather[0].icon),
                high,
                low
              });
              
              // Stop after 5 days
              if (processedData.length >= 5) {
                return;
              }
            }
          });
          
          setWeatherData(processedData);
        }
        
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
            
            if (apiKey.startsWith('AIza')) {
              // Show a more helpful error for Google API keys
              console.log('Need to get a dedicated OpenWeatherMap API key');
              errorMessage = 'Google API key detected';
            }
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
                    <div className="text-yellow-300 mr-3">{day.icon}</div>
                    <span className="text-white">{day.day}</span>
                  </div>
                  <div className="text-white">{day.high}° / {day.low}°</div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-xs text-gray-400 mt-3 text-center">
            {error ? (
              error === 'Google API key detected' ? (
                <>
                  Google API key detected. Get a free <a 
                    href="https://openweathermap.org/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    OpenWeatherMap key
                  </a> for live data.
                </>
              ) : 'Using fallback data'
            ) : 'Weather data from OpenWeatherMap'}
          </div>
        </div>
      </div>
    </div>
  );
} 