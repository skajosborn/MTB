// Configuration file for API keys and other constants

// Weather API configuration
export const WEATHER_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';

// Log API key status (hiding the actual key)
if (typeof window !== 'undefined') {
  if (process.env.GOOGLE_API_KEY) {
    console.log('Using GOOGLE_API_KEY for weather data');
  } else if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    console.log('Using NEXT_PUBLIC_GOOGLE_API_KEY for weather data');  
  } else {
    console.warn('No weather API key found in environment variables');
  }
}

// Trail locations for weather data
export const TRAIL_LOCATIONS = {
  croom: {
    name: 'Brooksville, FL',
    latitude: 28.5422,
    longitude: -82.3013
  },
  carterRoad: {
    name: 'Inverness, FL',
    latitude: 28.8336,
    longitude: -82.3418
  }
}; 