"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import WeatherForecast from '@/app/components/WeatherForecast';

export default function SantosVortexTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/magestic.jpg"
          alt="Santos & Vortex Trail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Santos & Vortex
            </h1>
            <p className="text-xl text-white max-w-2xl">
              Florida&apos;s premier mountain biking destination with world-class features
            </p>
          </div>
        </div>
      </div>

      {/* Weather Section */}
      <div className="bg-gray-800 py-8">
        {/* <div className="container mx-auto px-4">
          <WeatherForecast
            location="Santos"
            latitude={29.0658}
            longitude={-82.0347}
            apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
          />
        </div> */}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-6 text-gray-300 no-scrollbar">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-green-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('trails')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'trails' ? 'border-green-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Trail System
            </button>
            <button 
              onClick={() => setActiveTab('amenities')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'amenities' ? 'border-gray-300 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Access & Amenities
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-4">
                  The Santos Trail System, including the famous Vortex area, is one of Florida&apos;s most renowned mountain biking destinations. This IMBA Epic trail system offers over 80 miles of diverse riding opportunities across various skill levels.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The Vortex area is particularly notable for its advanced features, including elevated wooden structures, technical rock gardens, and challenging drops. The trail system is maintained by the Ocala Mountain Bike Association (OMBA) and continues to evolve with new features and improvements.
                </p>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Trail Quick Facts</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-300">Location</h4>
                    <p className="text-gray-400">Ocala, Florida</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Trail Length</h4>
                    <p className="text-gray-400">80+ miles of trails</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Difficulty</h4>
                    <p className="text-gray-400">Beginner to Expert</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                    <p className="text-gray-400">Year-round, early morning recommended</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trails' && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Trail System Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Main Santos Trails</h4>
                  <p className="text-gray-300">Miles of flowing singletrack suitable for all skill levels.</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Vortex Area</h4>
                  <p className="text-gray-300">Advanced features including wooden structures, drops, and technical challenges.</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Skills Area</h4>
                  <p className="text-gray-300">Progressive features for practicing and building confidence.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Access & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Parking & Access</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>Free parking at multiple trailheads</li>
                    <li>Open daily from sunrise to sunset</li>
                    <li>Multiple access points</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Available Facilities</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>Clean restrooms</li>
                    <li>Water stations</li>
                    <li>Bike wash station</li>
                    <li>Camping facilities</li>
                    <li>Bike shop nearby</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="container mx-auto text-center py-12 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Santos?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join our community and discover more great trails in Central Florida.</p>
          <Link href="/trails" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block">
            Explore More Trails
          </Link>
        </div>
      </div>
    </main>
  );
}
