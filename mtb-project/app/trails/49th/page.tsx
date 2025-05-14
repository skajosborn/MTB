"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import WeatherForecast from '@/app/components/WeatherForecast';

export default function AlafiaTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/bikebg.png"
          alt="Alafia River State Park Trail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Alafia River State Park
            </h1>
            <p className="text-xl text-white max-w-2xl">
              World-class mountain biking on Florida&apos;s most challenging terrain
            </p>
          </div>
        </div>
      </div>

      {/* Weather Section */}
      <div className="bg-gray-800 py-8">
        {/* <div className="container mx-auto px-4">
          <WeatherForecast
            location="Alafia River State Park"
            latitude={27.7647}
            longitude={-82.0702}
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
                  Alafia River State Park is renowned for offering some of Florida&apos;s most challenging mountain biking experiences. Built on former phosphate mining land, the park features unique topography with significant elevation changes, creating an exceptional riding environment.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The trail system includes over 20 miles of off-road bicycle trails, ranging from beginner-friendly paths to highly technical single-track that will challenge even the most experienced riders. The park&apos;s varied terrain includes steep climbs, fast descents, wooden features, and technical rock gardens.
                </p>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Trail Quick Facts</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-300">Location</h4>
                    <p className="text-gray-400">Lithia, Florida</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Trail Length</h4>
                    <p className="text-gray-400">20+ miles of trails</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Difficulty</h4>
                    <p className="text-gray-400">Beginner to Expert</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                    <p className="text-gray-400">October through April</p>
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
                  <h4 className="text-lg font-semibold text-white mb-2">Green Trails</h4>
                  <p className="text-gray-300">Beginner-friendly trails with smooth surfaces and gentle grades.</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Blue Trails</h4>
                  <p className="text-gray-300">Intermediate trails with moderate technical features and elevation changes.</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Black Diamond Trails</h4>
                  <p className="text-gray-300">Expert-level trails with challenging features, steep grades, and technical obstacles.</p>
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
                    <li>Park entrance fee required</li>
                    <li>Open daily from 8 AM until sunset</li>
                    <li>Large parking area at main trailhead</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Available Facilities</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>Clean restrooms</li>
                    <li>Water stations</li>
                    <li>Bike wash station</li>
                    <li>Picnic pavilions</li>
                    <li>Camping facilities</li>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Alafia?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join our community and discover more great trails in Central Florida.</p>
          <Link href="/trails" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block">
            Explore More Trails
          </Link>
        </div>
      </div>
    </main>
  );
}
