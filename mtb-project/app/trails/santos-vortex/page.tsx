"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
// import TrailMap from '@/app/components/TrailMap';
// import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import TrailFeatures from '@/app/components/TrailFeatures';

const TRAIL_COORDS = {
  latitude: 29.102, // Santos main trailhead
  longitude: -82.137,
  location: "Ocala, FL"
};

const trailData = {
  name: "Santos/Vortex",
  lon: -82.137,
  lat: 29.102
};

const features = [
  {
    image: '/images/santos/santosmap.png',
    title: 'Santos Trail System',
    description: 'Over 80 miles of singletrack, flow trails, and cross-country loops for all skill levels. Maintained by OMBA and renowned for its variety and quality.',
    type: 'Trail Network',
  },
  {
    image: '/images/santos/santosmap2.png',
    title: 'The Vortex',
    description: 'A dedicated skills and advanced area with jumps, drops, wooden features, and technical rock gardens. The go-to spot for progression and challenge.',
    type: 'Skills & Advanced',
  },
  {
    image: '/images/santos/santosmap3.png',
    title: '49th Ave Trailhead',
    description: 'Southern access point with parking, restrooms, and direct entry to the southern trails. Great for accessing less crowded sections and longer rides.',
    type: 'Access Point',
  },
];

const photos: TrailPhoto[] = [
  { src: '/images/santos/santos1.jpg', alt: 'Santos singletrack' },
  { src: '/images/santos/vortex1.jpg', alt: 'Vortex skills area' },
  { src: '/images/santos/49th1.jpg', alt: '49th Ave Trailhead' },
  { src: '/images/santos/santos2.jpg', alt: 'Santos forest trail' },
  { src: '/images/santos/vortex2.jpg', alt: 'Vortex drop' },
  { src: '/images/santos/49th2.jpg', alt: '49th Ave parking' },
];

// Trail Difficulty Tabs Component
function TrailDifficultyTabs() {
  const trailTabs = [
    { label: 'Beginner', key: 'beginner' },
    { label: 'Intermediate', key: 'intermediate' },
    { label: 'Advanced', key: 'advanced' },
  ];
  const trailsByDifficulty = {
    beginner: [
      { name: 'Marshmallow', distance: '0.6km', location: 'Silver Springs Shores, FL' },
      { name: 'Pine Tree West', distance: '2.6km', location: 'Silver Springs Shores, FL' },
    ],
    intermediate: [
      { name: 'Bryar Patch', distance: '0.6km', location: 'Belleview, FL' },
      { name: 'Twister', distance: '3.9km', location: 'Belleview, FL' },
      { name: 'Cow Bone', distance: '1.7km', location: 'Silver Springs Shores, FL' },
      { name: 'Bunny', distance: '2.1km', location: 'Belleview, FL' },
      { name: 'Kennz Kornerz', distance: '0.2km', location: 'Belleview, FL' },
      { name: 'Sinkhole', distance: '1.4km', location: 'Silver Springs Shores, FL' },
    ],
    advanced: [
      { name: 'Vortex', distance: '3.4km', location: 'Belleview, FL' },
      { name: 'John Brown', distance: '0.8km', location: 'Belleview, FL' },
    ],
  };
  type TabKey = 'beginner' | 'intermediate' | 'advanced';
  const [activeTab, setActiveTab] = useState<TabKey>('beginner');
  return (
    <div className="my-10">
      <div className="flex space-x-4 mb-6">
        {trailTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-green-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        <ul className="space-y-3">
          {trailsByDifficulty[activeTab].map((trail: { name: string; distance: string; location: string }, idx: number) => (
            <li key={idx} className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-bold text-white">{trail.name}</span>
              <span className="text-gray-400 ml-2">{trail.distance}</span>
              <span className="text-gray-400 ml-2">{trail.location}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SantosVortexTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen pt-15">
      {/* Hero Header Section */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/magestic.jpg"
            alt="Santos & Vortex landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Santos & Vortex</h1>
          <div className="inline-block bg-green-600 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Beginner to Expert
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Florida's largest and most popular MTB destination, with world-class features and trail variety.
          </p>
        </div>
      </div>

      {/* Weather Section */}
      {/* <div className="bg-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <WeatherForecast
            location="Santos Trailhead"
            latitude={29.102}
            longitude={-82.137}
            apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
          />
        </div>
      </div> */}

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Ocala, FL</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Length</div>
              <div className="font-medium">80+ miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Gain</div>
              <div className="font-medium">Varies</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Access</div>
              <div className="font-medium">Multiple Trailheads</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Managed By</div>
              <div className="font-medium">OMBA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 w-full border-b border-gray-700">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="flex items-center py-2">
            <div className="flex flex-grow space-x-8 text-gray-300 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'features'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Features
              </button>
              <button 
                onClick={() => setActiveTab('beginner')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'beginner'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Beginner
              </button>
              <button 
                onClick={() => setActiveTab('intermediate')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'intermediate'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setActiveTab('advanced')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'advanced'
                    ? 'bg-gray-800 text-white border-b-2 border-orange-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Advanced
              </button>
              <button 
                onClick={() => setActiveTab('amenities')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'amenities'
                    ? 'bg-gray-800 text-white border-b-2 border-gray-300 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Access & Amenities
              </button>
              <button 
                onClick={() => setActiveTab('map')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'map'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 py-12 pt-20 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Overview Text */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <h1 className="text-4xl font-bold mb-8">The Rundown</h1>
              <div className="relative w-full aspect-video mb-8">
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/F-r-0GN2Pzc?si=6EaKplOdBzJ3m_iU" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-4">
                  Santos is the heart of Florida mountain biking, offering everything from beginner-friendly flow trails to expert-level technical features. The Vortex area is a must-ride for advanced riders, while the 49th Ave Trailhead provides easy access to the southern trails and less crowded routes. Maintained by OMBA, this system is a true MTB destination.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The trail system is known for its variety: fast singletrack, technical rock gardens, wooden features, and a vibrant community. Whether you're looking for a family ride or a pro-level challenge, Santos delivers.
                </p>
              </div>
            </div>
            {/* RIGHT COLUMN: Weather */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <WeatherForecast
                location="Santos Trailhead"
                latitude={29.102}
                longitude={-82.137}
                apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
                days={7}
              />
            </div>
          </div>
          {/* Photo Gallery */}
          <div className="mt-10">
            <TrailPhotoGallery photos={photos} />
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <section className="py-16 w-full bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Trail Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-40 mb-4">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-2">{feature.description}</p>
                  <span className="text-green-400 text-sm">{feature.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'beginner' && (
        <section className="py-16 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Beginner Trails</h2>
            <ul className="space-y-3">
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Marshmallow</span>
                <span className="text-gray-400 ml-2">0.6km</span>
                <span className="text-gray-400 ml-2">Silver Springs Shores, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Pine Tree West</span>
                <span className="text-gray-400 ml-2">2.6km</span>
                <span className="text-gray-400 ml-2">Silver Springs Shores, FL</span>
              </li>
            </ul>
          </div>
        </section>
      )}
      {activeTab === 'intermediate' && (
        <section className="py-16 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Intermediate Trails</h2>
            <ul className="space-y-3">
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Bryar Patch</span>
                <span className="text-gray-400 ml-2">0.6km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Twister</span>
                <span className="text-gray-400 ml-2">3.9km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Cow Bone</span>
                <span className="text-gray-400 ml-2">1.7km</span>
                <span className="text-gray-400 ml-2">Silver Springs Shores, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Bunny</span>
                <span className="text-gray-400 ml-2">2.1km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Kennz Kornerz</span>
                <span className="text-gray-400 ml-2">0.2km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Sinkhole</span>
                <span className="text-gray-400 ml-2">1.4km</span>
                <span className="text-gray-400 ml-2">Silver Springs Shores, FL</span>
              </li>
            </ul>
          </div>
        </section>
      )}
      {activeTab === 'advanced' && (
        <section className="py-16 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Advanced Trails</h2>
            <ul className="space-y-3">
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">Vortex</span>
                <span className="text-gray-400 ml-2">3.4km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
              <li className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-white">John Brown</span>
                <span className="text-gray-400 ml-2">0.8km</span>
                <span className="text-gray-400 ml-2">Belleview, FL</span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {activeTab === 'amenities' && (
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Access & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Parking & Access</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Free parking at Santos, Vortex, and 49th Ave trailheads</li>
                  <li>Open daily from sunrise to sunset</li>
                  <li>Multiple access points for different trail experiences</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Available Facilities</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Restrooms at all major trailheads</li>
                  <li>Water stations</li>
                  <li>Bike wash station</li>
                  <li>Camping facilities nearby</li>
                  <li>Bike shop and rentals close to Santos trailhead</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'map' && (
        <section className="py-16 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Trail Map</h2>
            <div className="relative w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
              <Image
                src="/images/santos/santosmap.png"
                alt="Santos Trail Map"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="mt-6 text-center">
              <a
                href="/images/santos/santosmap.png"
                download
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors mt-4"
              >
                Download Map
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 w-full bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ride Santos?</h2>
          <p className="text-xl mb-8">Join our community of mountain bikers and discover new adventures every day.</p>
          <Link href="/trails" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors inline-block">
            Browse All Trails
          </Link>
        </div>
      </section>
    </main>
  );
}
