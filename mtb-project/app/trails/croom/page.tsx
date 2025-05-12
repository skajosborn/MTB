"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CroomTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Header Section */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bikebg.png"
            alt="Croom Trails landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Croom Trails</h1>
          <div className="inline-block bg-orange-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Advanced Difficulty
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Explore Florida's premier mountain biking destination with over 50 miles of diverse terrain
          </p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Location</div>
            <div className="font-medium">Withlacoochee State Forest, FL</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Length</div>
            <div className="font-medium">50+ miles</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Elevation Gain</div>
            <div className="font-medium">600+ feet</div>
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
              onClick={() => setActiveTab('beginner')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'beginner' ? 'border-green-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Beginner Trails
            </button>
            <button 
              onClick={() => setActiveTab('intermediate')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'intermediate' ? 'border-blue-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Intermediate Trails
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'advanced' ? 'border-orange-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Advanced Trails
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
              <h2 className="text-3xl font-bold text-white mb-6">About Croom</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-4">
                  Croom Mountain Bike Trail Park, nestled within Florida's Withlacoochee State Forest, offers over 50 miles of diverse singletrack trails. Managed by the SWAMP Mountain Bike Club, the park features a variety of terrains, including rolling hills, pine flatwoods, and challenging sections with steep climbs and technical features.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  The trail system is designed to cater to riders of all skill levels, from beginners to seasoned experts. Located in the Withlacoochee State Forest, Croom features unique landscape with small hills and varied topography unusual for Florida.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  With color-coded trail markings and strategically placed bailout points, riders can easily navigate the extensive network while enjoying the natural beauty of central Florida.
                </p>
              </div>
              
              {/* Trail Maintenance & Community */}
              <div className="mt-20">
                <div className="flex items-center mb-4">
                  {/* <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-lg">🛠️</span>
                  </div> */}
                  <h3 className="text-2xl font-bold text-white">Trail Maintenance & Community</h3>
                </div>
                <div className="rounded-lg shadow-lg">
                  <p className="text-gray-300">The <a href="https://www.swampmtbclub.com/trails" className="text-green-500 hover:text-green-300 font-bold">SWAMP</a> Mountain Bike Club actively maintains the trail system, ensuring trails are safe and enjoyable. They also host events and group rides, fostering a vibrant mountain biking community.</p>
                </div>
              </div>
               {/* Featured Video */}
            <div className="max-w-4xl mx-auto px-4 mt-20 mb-8 relative z-10">
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                <iframe
                    src="https://www.youtube.com/embed/Scn0QcNs_mM?si=AqL_B7441WRrYDYF"
                    width="100%"
                    height="100%"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
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
                      <p className="text-gray-400">Withlacoochee State Forest, Brooksville, Florida</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Length</h4>
                      <p className="text-gray-400">50+ miles of trails</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Elevation Gain</h4>
                      <p className="text-gray-400">600+ feet</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Difficulty</h4>
                      <p className="text-gray-400">Beginner to Advanced</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                      <p className="text-gray-400">October through April (cooler months)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Parking</h4>
                      <p className="text-gray-400">Tucker Hill Day Use Area, nominal fee required</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trail Location Map */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3 text-white">Trail Location</h3>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14048.609155217813!2d-82.30127323022462!3d28.542212200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e840c22da7b915%3A0xb79b2387345f868a!2sCroom%20Motorcycle%20Area!5e0!3m2!1sen!2sus!4v1717528158099!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Beginner Trails Tab */}
        {activeTab === 'beginner' && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-5">
                <span className="text-white text-xl font-bold">🟢</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Beginner-Friendly Trails</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">South Blue Trail</h3>
                  <p className="text-gray-300">An easy trail ideal for newcomers, featuring flat terrain and gentle curves.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~2 miles</span>
                    <span>Elevation: Minimal</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Northwest Blue Trail</h3>
                  <p className="text-gray-300">Another beginner-friendly option with minimal elevation changes and a smooth path.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~3 miles</span>
                    <span>Elevation: Minimal</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Southwest Blue Trail</h3>
                  <p className="text-gray-300">Offers a relaxed ride through scenic areas, perfect for those new to mountain biking.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~2.5 miles</span>
                    <span>Elevation: Minimal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Beginner Tips</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Start with the South Blue Trail if you're completely new to mountain biking</li>
                <li>Bring plenty of water, especially during warmer months</li>
                <li>Consider joining a guided beginner ride with the SWAMP Mountain Bike Club</li>
                <li>Check trail conditions before heading out, especially after rain</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Intermediate Trails Tab */}
        {activeTab === 'intermediate' && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-5">
                <span className="text-white text-xl font-bold">🟡</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Intermediate Trails</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Yellow Trail (12-mile loop)</h3>
                  <p className="text-gray-300">Starting at the Tucker Hill trailhead, this loop is well-marked and popular among riders seeking a moderate challenge.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: 12 miles</span>
                    <span>Elevation: Moderate</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Southeast Blue Trail</h3>
                  <p className="text-gray-300">Provides a mix of rolling terrain and mild technical sections, suitable for riders looking to advance their skills.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~5 miles</span>
                    <span>Elevation: Moderate</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Sugar Mountain Loop</h3>
                  <p className="text-gray-300">Features undulating paths and varied scenery, offering an engaging ride for intermediate bikers.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~7 miles</span>
                    <span>Elevation: Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Advanced Trails Tab */}
        {activeTab === 'advanced' && (
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-5">
                <span className="text-white text-xl font-bold">🔴</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Advanced Trails</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Drunken Monkey</h3>
                  <p className="text-gray-300">A short but demanding trail with technical features that test even experienced riders.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~1.5 miles</span>
                    <span>Technical: High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Southern Comfort</h3>
                  <p className="text-gray-300">Known for its challenging climbs and descents, this trail offers a rigorous workout.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~4 miles</span>
                    <span>Technical: High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Bootlegger Hill</h3>
                  <p className="text-gray-300">Features steep gradients and sharp turns, requiring advanced bike handling skills.</p>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <span className="mr-4">Length: ~3 miles</span>
                    <span>Technical: Very High</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Rider Tips</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Full suspension bikes recommended for these technical trails</li>
                <li>Consider riding with a partner on the most challenging sections</li>
                <li>Check your equipment thoroughly before attempting these trails</li>
                <li>Be aware that these trails can be significantly more difficult after rain</li>
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
                    <p className="text-gray-300 mb-4">Tucker Hill Day Use Area on Croom Road (Forest Road 6), equipped with restrooms, picnic areas, and a bike wash station.</p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Trail Markings</h3>
                    <p className="text-gray-300 mb-4">Color-coded signs (yellow, blue, red) indicate trail difficulty and loops.</p>
                    
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center bg-green-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-300">Blue Trails - Beginner</span>
                      </div>
                      <div className="flex items-center bg-blue-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-blue-300">Yellow Trails - Intermediate</span>
                      </div>
                      <div className="flex items-center bg-orange-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-orange-300">Red Trails - Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Bailout Points</h3>
                    <p className="text-gray-300 mb-4">Strategically placed along longer loops for riders needing shorter routes.</p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Fees</h3>
                    <p className="text-gray-300">A nominal parking fee is required; annual passes are available.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Facility Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🚻</span>
                      </div>
                      <span className="text-gray-300">Restrooms</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🚿</span>
                      </div>
                      <span className="text-gray-300">Bike Wash</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🅿️</span>
                      </div>
                      <span className="text-gray-300">Parking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>🍽️</span>
                      </div>
                      <span className="text-gray-300">Picnic Areas</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>💧</span>
                      </div>
                      <span className="text-gray-300">Water Fountains</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span>📱</span>
                      </div>
                      <span className="text-gray-300">Cell Service (Limited)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Photo Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/feature1.jpg"
              alt="Trail through pine forest" 
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/bridge2.jpg" 
            alt="Technical rock garden section"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/good.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/good2.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/good3.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/lake1.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/hill4.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/rocks2.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/river.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/feature3.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/rocks.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/longbridge.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/feature4.jpg"
            alt="Scenic overlook of trails"
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="max-w-4xl mx-auto text-center py-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Croom?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Grab your bike and helmet and experience some of Florida's best trails.</p>
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
