"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
import TrailDifficulty from '@/app/components/TrailDifficulty';
import TrailMap from '@/app/components/TrailMap';
import 'mapbox-gl/dist/mapbox-gl.css';
import TrailFeatures from '@/app/components/TrailFeatures';
// import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
// import TrailFeatures from '@/app/components/TrailFeatures';

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

const trailDifficulties: { name: string; length: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }[] = [
  { name: 'Marshmallow', length: '0.6km', level: 'Beginner' },
  { name: 'Pine Tree West', length: '2.6km', level: 'Beginner' },
  { name: 'Bryar Patch', length: '0.6km', level: 'Intermediate' },
  { name: 'Twister', length: '3.9km', level: 'Intermediate' },
  { name: 'Cow Bone', length: '1.7km', level: 'Intermediate' },
  { name: 'Bunny', length: '2.1km', level: 'Intermediate' },
  { name: 'Kennz Kornerz', length: '0.2km', level: 'Intermediate' },
  { name: 'Sinkhole', length: '1.4km', level: 'Intermediate' },
  { name: 'Vortex', length: '3.4km', level: 'Advanced' },
  { name: 'John Brown', length: '0.8km', level: 'Advanced' },
];

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
            Florida&apos;s largest and most popular MTB destination, with world-class features and trail variety.
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
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-gray-300 text-lg mb-4">
                  Santos is the heart of Florida mountain biking, offering everything from beginner-friendly flow trails to expert-level technical features. The Vortex area is a must-ride for advanced riders, while the 49th Ave Trailhead provides easy access to the southern trails and less crowded routes. Maintained by OMBA, this system is a true MTB destination.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The trail system is known for its variety: fast singletrack, technical rock gardens, wooden features, and a vibrant community. Whether you&apos;re looking for a family ride or a pro-level challenge, Santos delivers.
                </p>
              </div>
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
              {/* Trail Features Section */}
              <TrailFeatures features={features} />
              {/* Interactive Mapbox Map */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Interactive Trail Map</h3>
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                  <TrailMap lat={29.102} lon={-82.137} name="Santos Trailhead" />
                </div>
              </div>
              {/* Static Trail Map Image */}
              <h3 className="text-2xl font-bold text-white mt-8 mb-6">Santos Trail Map</h3>
              <div className="relative h-96 max-w-contain mx-auto mb-8">
                <Image
                  src="/images/santos/santosmap.png"
                  alt="Santos Trail Map"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              {/* Photo Gallery Section */}
              <TrailPhotoGallery photos={photos} />
            </div>
            {/* RIGHT COLUMN: Weather & Difficulty */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <WeatherForecast
                location="Santos Trailhead"
                latitude={29.102}
                longitude={-82.137}
                apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
                days={7}
              />
              <div className="bg-gray-800 rounded-lg overflow-visible shadow-lg">
                <div className="bg-gray-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Trail Difficulty Breakdown</h3>
                </div>
                <div className="p-6">
                  <TrailDifficulty trails={trailDifficulties} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <section className="py-16 w-full bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Trail Features</h2>
            <TrailFeatures features={features} />
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
            {/* Interactive Mapbox Map */}
            <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center mb-10">
              <TrailMap lat={29.102} lon={-82.137} name="Santos Trailhead" />
            </div>
            {/* Static Trail Map Image */}
            <div className="relative w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
              <Image
                src="/images/santos/santosmap.png"
                alt="Santos Trail Map"
                fill
                className="object-contain p-4"
                priority
              />
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
