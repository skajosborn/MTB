"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WeatherDisplay from '@/app/components/WeatherDisplay';
import LeafletMap from '@/app/components/LeafletMap';
import WeatherForecast from '@/app/components/WeatherForecast';

const TRAIL_COORDS = {
  latitude: 28.745284,
  longitude: -82.435531,
  location: "Citrus Wildlife Management Area, FL"
};

export default function CarterRoadTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/bikebg.png"
            alt="Carter Road Trail"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Carter Road Trail</h1>
            <p className="text-xl md:text-2xl text-gray-200">Experience Florida&apos;s Natural Beauty</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white py-4 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Citrus Wildlife Mgmt Area, FL</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Length</div>
              <div className="font-medium">10+ miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Gain</div>
              <div className="font-medium">Minimal</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Managed By</div>
              <div className="font-medium">Florida Trail Association</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30 w-full">
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
              Trail Features
            </button>
            <button 
              onClick={() => setActiveTab('intermediate')}
              className={`whitespace-nowrap px-1 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'intermediate' ? 'border-blue-500 text-white' : 'border-transparent hover:text-white'
              }`}
            >
              Riding Tips
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
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="flex flex-col">
              {/* Two-column layout for About section and Trail Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
                <div className="lg:col-span-2">
                  {/* About Section */}
                  <h2 className="text-3xl font-bold text-white mb-6">About Carter Road</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg mb-4">
                      Carter Road Trail is located in the Citrus Wildlife Management Area, offering a unique riding experience through the beautiful Florida swamplands. The trail provides a distinctive blend of scenic wetlands, pine forests, and occasional technical sections.
                    </p>
                    <p className="text-gray-300 text-lg mb-4">
                      Known for its natural beauty, this singletrack trail winds through diverse ecosystems with wooden boardwalks crossing over wetland areas. Riders can expect to see abundant wildlife including birds, turtles, and occasionally alligators from a safe distance.
                    </p>
                    <p className="text-gray-300 text-lg mb-4">
                      The trail system ranges from easy to intermediate difficulty, making it accessible to a wide range of riders. Some sections can become challenging after heavy rainfall, so checking trail conditions before visiting is recommended.
                    </p>
                  </div>
                
                  {/* Trail Maintenance & Community */}
                  <div className="mt-10">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-lg">🛠️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Trail Maintenance & Community</h3>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                      <p className="text-gray-300">Carter Road Trail is maintained by dedicated volunteers from the Florida Trail Association. Regular maintenance ensures bridges and boardwalks remain safe for passage, and the trail stays clear of debris. Community trail days are held periodically and welcome riders of all experience levels to contribute.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* Trail Details Card */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-gray-700 px-6 py-4">
                      <h3 className="text-xl font-bold text-white">Trail Details</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-300">Location</h4>
                          <p className="text-gray-400">Citrus Wildlife Management Area, Inverness, Florida</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">Length</h4>
                          <p className="text-gray-400">10+ miles of trails</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">Elevation Gain</h4>
                          <p className="text-gray-400">Minimal, mostly flat terrain</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">Difficulty</h4>
                          <p className="text-gray-400">Easy to Intermediate</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                          <p className="text-gray-400">October through May (dry season)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">Parking</h4>
                          <p className="text-gray-400">Available at trailhead, free of charge</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Full-width Video Section */}
              <div className="w-full mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-lg">🎬</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Trail Video</h3>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                      src="https://www.youtube.com/embed/2wKBkxN0PDo?si=lkNnd3q7t4JsOK8u"
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
              
              {/* Photo Gallery Section */}
              <div className="w-full mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-lg">📸</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/bridge1.jpg" 
                      alt="Wooden Boardwalk"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/bridge20.jpg" 
                      alt="Swampland Section"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/woodedtrail.jpg"
                      alt="Pine Forest Trail"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/gator.jpg"
                      alt="Wildlife on Trail"
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'beginner' && (
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-5">
                  <span className="text-white text-xl font-bold">🌿</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Trail Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/bridge1.jpg" 
                      alt="Wooden Boardwalk"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Wooden Boardwalks</h3>
                    <p className="text-gray-300">Elevated wooden structures that cross over wetland areas, offering unique views of the surrounding landscape and wildlife.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Infrastructure</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/bridge20.jpg" 
                      alt="Swampland Section"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Swampland Sections</h3>
                    <p className="text-gray-300">Beautiful sections that wind through cypress swamps, providing a striking backdrop for riders with reflective water surfaces.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Natural Terrain</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/woodedtrail.jpg" 
                      alt="Pine Forest Segment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Pine Forest Segments</h3>
                    <p className="text-gray-300">Fast-flowing segments through pine forests with a bed of pine needles creating a smooth, cushioned riding surface.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Natural Terrain</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/rocks.jpg" 
                      alt="Rocky Technical Section"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Rocky Technical Sections</h3>
                    <p className="text-gray-300">Several short but challenging sections with limestone outcroppings that provide technical riding opportunities.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Technical Challenge</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/gator.jpg" 
                      alt="Wildlife Viewing Area"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Wildlife Viewing Areas</h3>
                    <p className="text-gray-300">Designated spots along the trail that offer excellent opportunities to observe native Florida wildlife in their natural habitat.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Points of Interest</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src="/lake.jpg" 
                      alt="Open Prairie Crossing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Open Prairie Crossings</h3>
                    <p className="text-gray-300">Occasional sections that cross open prairies, offering a change of scenery and expansive views of the Florida landscape.</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span>Feature Type: Natural Terrain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'intermediate' && (
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-5">
                  <span className="text-white text-xl font-bold">💡</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Riding Tips</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Best Practices</h3>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Always check trail conditions before riding, especially after rain</li>
                      <li>Bring plenty of water, as Florida humidity can lead to rapid dehydration</li>
                      <li>Wear insect repellent during warmer months</li>
                      <li>Use wider tires (2.2&quot;+) for better stability on boardwalks</li>
                      <li>Be cautious on boardwalks when wet, as they can become slippery</li>
                      <li>Respect wildlife and maintain a safe distance if encountered</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Weather Considerations</h3>
                    <p className="text-gray-300 mb-4">Carter Road Trail can be affected significantly by weather conditions:</p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>During rainy season (June-September), parts of the trail may be underwater</li>
                      <li>Summer months bring high temperatures and humidity - ride early morning or evening</li>
                      <li>Winter and spring offer the best riding conditions with moderate temperatures</li>
                      <li>After heavy rain, boardwalks can take 1-2 days to dry completely</li>
                      <li>Trail conditions are typically posted on the Florida Trail Association website</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Technical Sections</h3>
                    <p className="text-gray-300 mb-4">Tips for handling the more challenging parts of the trail:</p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Maintain momentum through sandy sections to avoid getting bogged down</li>
                      <li>For rocky areas, stand up slightly on your pedals to let the bike move beneath you</li>
                      <li>When crossing narrow boardwalks, look ahead rather than down at your front wheel</li>
                      <li>Use a slightly lower tire pressure than usual to improve traction</li>
                      <li>First-timers should ride conservatively until familiar with trail features</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Recommended Gear</h3>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Hardtail or short-travel full suspension bike works well</li>
                      <li>Wider tires (2.2-2.6&quot;) provide stability on various surfaces</li>
                      <li>Hydration pack with at least 2 liters of water</li>
                      <li>Basic tool kit including spare tube and patch kit</li>
                      <li>Sunscreen and insect repellent</li>
                      <li>Moisture-wicking clothing</li>
                      <li>Camera for wildlife photography opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
                      <h3 className="text-xl font-semibold text-white mb-4">Trailhead Access</h3>
                      <p className="text-gray-300 mb-4">The main trailhead is located off of S. Carter Road in the Citrus Wildlife Management Area. There is ample parking available and no entry fee is required.</p>
                      
                      <h3 className="text-xl font-semibold text-white mb-4 mt-6">Trail Markings</h3>
                      <p className="text-gray-300 mb-4">The trail is marked with blue blazes throughout the route. Major intersections have signage indicating direction and distance.</p>
                      
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center bg-blue-900 bg-opacity-40 rounded-full px-4 py-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-blue-300">Blue Blazes - Main Trail</span>
                        </div>
                        <div className="flex items-center bg-yellow-900 bg-opacity-40 rounded-full px-4 py-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-yellow-300">Yellow Blazes - Side Loops</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-6">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Operating Hours</h3>
                      <p className="text-gray-300 mb-4">The trail is open from sunrise to sunset, 365 days a year. Night riding is not permitted in the Wildlife Management Area.</p>
                      
                      <h3 className="text-xl font-semibold text-white mb-4 mt-6">Fees</h3>
                      <p className="text-gray-300">There is no fee to access the trail. Donations to the Florida Trail Association are appreciated to help with trail maintenance.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Available Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>🚻</span>
                        </div>
                        <span className="text-gray-300">Basic Restrooms</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>🅿️</span>
                        </div>
                        <span className="text-gray-300">Free Parking</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>📋</span>
                        </div>
                        <span className="text-gray-300">Information Board</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>🚩</span>
                        </div>
                        <span className="text-gray-300">Trail Maps</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>🪑</span>
                        </div>
                        <span className="text-gray-300">Picnic Tables</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span>📱</span>
                        </div>
                        <span className="text-gray-300">Limited Cell Service</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Nearby Services</h3>
                      <p className="text-gray-300 mb-4">The closest amenities are located in Inverness, approximately 15 minutes by car:</p>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>Gas stations</li>
                        <li>Restaurants and grocery stores</li>
                        <li>Bike shops for repairs and supplies</li>
                        <li>Medical facilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weather and Map Section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weather Section */}
            <WeatherDisplay location={TRAIL_COORDS.location} />

            {/* Trail Map Section */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-white">Trail Location</h3>
              <LeafletMap
                latitude={TRAIL_COORDS.latitude}
                longitude={TRAIL_COORDS.longitude}
                location={TRAIL_COORDS.location}
              />
              {/* Trail Info */}
              <div className="mt-4 bg-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Trail Information</h4>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-medium">Location:</span> {TRAIL_COORDS.location}</p>
                  <p><span className="font-medium">Coordinates:</span> {TRAIL_COORDS.latitude.toFixed(6)}, {TRAIL_COORDS.longitude.toFixed(6)}</p>
                  <p><span className="font-medium">Parking:</span> Available at main trailhead</p>
                    Get Directions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 