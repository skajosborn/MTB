// Simple script to test if the API key is accessible

require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

console.log('----------------------------------------');
console.log('Environment Variable Test');
console.log('----------------------------------------');

// Check for Google API Key
const googleKey = process.env.GOOGLE_API_KEY;
if (googleKey) {
  console.log('GOOGLE_API_KEY found!');
  console.log('First 5 chars of key:', googleKey.substring(0, 5) + '...');
} else {
  console.log('GOOGLE_API_KEY not found!');
}

// Check for Next.js public variable
const nextPublicKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (nextPublicKey) {
  console.log('NEXT_PUBLIC_GOOGLE_API_KEY found!');
  console.log('First 5 chars of key:', nextPublicKey.substring(0, 5) + '...');
} else {
  console.log('NEXT_PUBLIC_GOOGLE_API_KEY not found!');
}

// Check for OpenWeatherMap key
const weatherKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
if (weatherKey) {
  console.log('NEXT_PUBLIC_WEATHER_API_KEY found!');
  console.log('First 5 chars of key:', weatherKey.substring(0, 5) + '...');
} else {
  console.log('NEXT_PUBLIC_WEATHER_API_KEY not found!');
}

console.log('----------------------------------------');
console.log('Next.js can access environment variables in .env and .env.local');
console.log('Browser can ONLY access variables starting with NEXT_PUBLIC_');
console.log('----------------------------------------'); 