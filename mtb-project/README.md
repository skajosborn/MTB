# MTB Project - Central Florida Mountain Biking Trails

A website showcasing mountain biking trails in Central Florida.

## Features

- Comprehensive trail information
- Interactive trail maps
- Weather forecasts for trail locations
- Photo galleries
- Mobile-responsive design

## Setup Instructions

### Prerequisites

- Node.js (version 18+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Configuration

#### Weather API Key

The weather forecast component uses the OpenWeatherMap API. To enable weather data:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env.local` file in the project root with:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

3. Restart the development server

If no API key is provided, the weather component will display fallback data.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory
  - `components/` - Reusable UI components
  - `trails/` - Trail-specific pages
  - `config.ts` - Configuration settings

## Adding New Trails

To add a new trail:

1. Create a new directory in `app/trails/[trail-name]`
2. Create a `page.tsx` file based on existing trail pages
3. Add the trail's weather location in `app/config.ts`
4. Add the trail to the navigation menu

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
