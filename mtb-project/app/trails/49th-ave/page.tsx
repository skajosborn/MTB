"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';

export default function FortyNinthAveTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/woodedtrail.jpg"
          alt="49th Ave Trailhead"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              49th Ave Trailhead
            </h1>
            <p className="text-xl text-white max-w-2xl">
              Gateway to the southern Santos trail system and high-intensity technical riding
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30 border-b border-gray-800 shadow-xl">
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
            <button 
              onClick={() => setActiveTab('map')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'map' ? 'border-blue-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Interactive Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">About 49th Ave</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The 49th Avenue Trailhead serves as the primary gateway to the southern portion of the Santos trail system. While the main Santos trailhead is known for its skills parks and the Vortex pit, 49th Ave offers direct access to miles of high-quality singletrack through lush Florida forests.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Riders starting here can quickly reach some of the system's most popular technical trails, including the high-intensity sections that Santos is famous for. The area is characterized by rolling terrain, limestone outcrops, and tight, twisty trails that reward technical proficiency and fitness.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-2xl">
                  <Image src="/trail10.jpg" alt="Santos Woods" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-2xl">
                  <Image src="/rocks2.jpg" alt="Technical Section" fill className="object-cover" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-8">
              <WeatherForecast
                location="Ocala, FL"
                latitude={29.0214}
                longitude={-82.1811}
                apiKey={process.env.NEXT_PUBLIC_WEATHER_API_KEY || ''}
              />
              
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 sticky top-40">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">📊</span> Trail Quick Facts
                </h3>
                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Location</h4>
                    <p className="text-white text-lg">Ocala, Florida</p>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Access To</h4>
                    <p className="text-white text-lg">80+ Miles of Santos Trails</p>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Difficulty</h4>
                    <p className="text-white text-lg">Intermediate to Expert</p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Highlights</h4>
                    <p className="text-white text-lg italic">Technical rock gardens, flowy singletrack, epic distance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trails' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h3 className="text-3xl font-bold text-white mb-8">Trail Network Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-400">Southern Sector</h4>
                  <p>Direct access to the less crowded, deep-woods trails of Santos. Perfect for longer rides and endurance training.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-blue-400">Technical Features</h4>
                  <p>Quick access to limestone ridges and technical rock features that define Ocala mountain biking.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h3 className="text-3xl font-bold text-white mb-8">Trailhead Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-3 text-2xl">🚗</span> Parking & Access
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Large parking area</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Free entry (No park fees)</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Open dawn to dusk</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-3 text-2xl">🛠️</span> On-Site Amenities
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Porta Potties</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Potable water stations</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Bike wash station</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Shaded picnic pavilions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-3xl p-4 shadow-2xl border border-gray-700 overflow-hidden">
              <TrailMap 
                lat={29.0214} 
                lon={-82.1811} 
                name="49th Ave Trailhead" 
              />
            </div>
            <p className="mt-6 text-center text-gray-400 italic">
              Pro tip: Use the 3D Satellite view to see the technical limestone outcrops.
            </p>
          </div>
        )}
      </div>

      {/* Video Highlights Section */}
      <section className="py-16 bg-gray-800/30 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-12 flex items-center justify-center">
            <span className="mr-4">🎥</span> Video Highlights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
              <iframe 
                src="https://www.youtube.com/embed/_WIq3rC3PUI?si=OboJBPATfa0FLNeE" 
                title="YouTube video player" 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            <div className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
              <iframe 
                src="https://www.youtube.com/embed/yDm1Gh35oZs?si=gpO2meVWBw-xFRDO" 
                title="YouTube video player" 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            <div className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
              <iframe 
                src="https://www.youtube.com/embed/enY-zV-TQu0?si=ih7e5H8VaSSY9_GI" 
                title="YouTube video player" 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            <div className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
              <iframe 
                src="https://www.youtube.com/embed/u4ezUtaURV0?si=g-mjen-uLi89d44b" 
                title="YouTube video player" 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-20 border-t border-gray-800">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore 49th Ave?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">49th Ave is just one of the many trailheads giving you access to the world-class Santos system.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-900/20">
              Back to Trails
            </Link>
            <Link href="/trails/santos-vortex" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 border border-gray-700">
              View Santos/Vortex
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
