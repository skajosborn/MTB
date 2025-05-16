"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import WeatherForecast from '../../components/WeatherForecast';
// import { WEATHER_API_KEY, TRAIL_LOCATIONS } from '../../config';

export default function BalmBoyetteTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Header Section */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bikebg.png"
            alt="Balm Boyette Trails landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Balm Boyette Trails</h1>
          <div className="inline-block bg-red-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Expert Difficulty
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Experience Florida&apos;s most technical singletrack with challenging terrain and expert-level features
          </p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Location</div>
            <div className="font-medium">Balm Boyette Scrub Preserve, FL</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Length</div>
            <div className="font-medium">25+ miles</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Elevation Gain</div>
            <div className="font-medium">400+ feet</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Managed By</div>
            <div className="font-medium">SWAMP Mountain Bike Club</div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 mt-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">About Balm Boyette</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-4">
                  Balm Boyette Scrub Nature Preserve offers some of Florida&apos;s most challenging mountain biking experiences. Located on former phosphate mining land, the preserve features unique topography with steep climbs, technical descents, and expert-level features.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The trail system spans over 25 miles of diverse singletrack, with the majority of trails catering to advanced and expert riders. The preserve&apos;s varied terrain includes challenging rock gardens, steep drops, and technical features that make it a destination for skilled mountain bikers.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  While primarily known for its expert-level riding, Balm Boyette also offers some intermediate trails for progressing riders. The unique landscape, created by historical phosphate mining, provides an exceptional riding environment unlike anywhere else in Florida.
                </p>
              </div>
              
              {/* Trail Maintenance & Community */}
              <div className="mt-20">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">Trail Maintenance & Community</h3>
                </div>
                <div className="rounded-lg shadow-lg">
                  <p className="text-gray-300">The <a href="https://www.swampmtbclub.com/trails" className="text-green-500 hover:text-green-300 font-bold">SWAMP</a> Mountain Bike Club actively maintains these challenging trails, ensuring they remain safe while preserving their technical nature. Regular trail work days help maintain and improve the trail system.</p>
                </div>
                <div className="relative h-148 mt-6 rounded-lg overflow-hidden">
                  <Image
                    src="/balmboyettemap.jpg"
                    alt="Trail maintenance at Balm Boyette"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div>
              {/* Trail Details Card */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-18 mt-">
                <div className="bg-gray-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Trail Details</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-300">Location</h4>
                      <p className="text-gray-400">Balm Boyette Scrub Preserve, Lithia, Florida</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Length</h4>
                      <p className="text-gray-400">25+ miles of trails</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Elevation Gain</h4>
                      <p className="text-gray-400">400+ feet</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Difficulty</h4>
                      <p className="text-gray-400">Intermediate to Expert</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                      <p className="text-gray-400">October through April (cooler months)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Parking</h4>
                      <p className="text-gray-400">Main trailhead parking lot off Boyette Road</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weather Forecast */}
              {/* <WeatherForecast 
                location="Balm Boyette"
                latitude={27.7647}
                longitude={-82.2702}
                apiKey={WEATHER_API_KEY}
              /> */}
            </div>
          </div>
        )}
        
        {/* Trails Tab */}
        {activeTab === 'trails' && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-5">
                <span className="text-white text-xl font-bold">🔴</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Trail System</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Ridgeline Trail</h3>
                  <p className="text-gray-300">Expert-level trail featuring steep drops, technical rock gardens, and challenging climbs.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~3 miles</span>
                    <span>Technical: Very High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Pit Run</h3>
                  <p className="text-gray-300">Advanced trail utilizing old mining pits with steep descents and technical features.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~2.5 miles</span>
                    <span>Technical: High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Intermediate Loop</h3>
                  <p className="text-gray-300">More approachable trail with moderate technical features, perfect for progression.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~4 miles</span>
                    <span>Technical: Moderate</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Trail System Tips</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Full suspension bikes strongly recommended for all trails</li>
                <li>Always ride with a partner due to the technical nature of trails</li>
                <li>Carry plenty of water and basic repair tools</li>
                <li>Check trail conditions before riding, especially after rain</li>
                <li>Consider starting with the Intermediate Loop if it&apos;s your first visit</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Access & Amenities Tab */}
        {activeTab === 'amenities' && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-5">
                <span className="text-white text-xl font-bold">📍</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Trail Access & Amenities</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Primary Trailhead</h3>
                    <p className="text-gray-300 mb-4">Main parking area located off Boyette Road. Limited facilities available at trailhead.</p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Trail Markings</h3>
                    <p className="text-gray-300 mb-4">Trails are marked with colored blazes indicating difficulty levels and routes.</p>
                    
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center bg-blue-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-blue-300">Blue - Intermediate</span>
                      </div>
                      <div className="flex items-center bg-red-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-300">Red - Expert Only</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Important Notes</h3>
                    <p className="text-gray-300 mb-4">Limited cell service in some areas. Sign in at the trailhead register before riding.</p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Hours & Fees</h3>
                    <p className="text-gray-300">Open dawn to dusk. No entrance fee required.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Available Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🅿️</span>
                      </div>
                      <span className="text-gray-300">Parking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>📝</span>
                      </div>
                      <span className="text-gray-300">Trail Register</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🗺️</span>
                      </div>
                      <span className="text-gray-300">Trail Maps</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>⚠️</span>
                      </div>
                      <span className="text-gray-300">Safety Signs</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">What to Bring</h4>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Plenty of water (no water sources on trail)</li>
                      <li>Basic bike repair kit</li>
                      <li>First aid supplies</li>
                      <li>Mobile phone (limited service)</li>
                      <li>Snacks and energy food</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="max-w-4xl mx-auto text-center py-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Balm Boyette?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join the community and experience some of Florida&apos;s most technical trails.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.swampclub.org/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              SWAMP Club Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
