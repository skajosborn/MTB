"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
import 'mapbox-gl/dist/mapbox-gl.css';

const TRAIL_COORDS = {
  latitude: 28.542212,
  longitude: -82.301273,
  location: "Withlacoochee State Forest, FL"
};

const trailData = {
  name: "Croom",
  lon: -82.301273,  // longitude
  lat: 28.542212    // latitude
};

const photos: TrailPhoto[] = [
  { src: '/feature1.jpg', alt: 'Trail through pine forest' },
  { src: '/bridge2.jpg', alt: 'Technical rock garden section' },
  { src: '/good.jpg', alt: 'Scenic overlook of trails' },
  { src: '/good2.jpg', alt: 'Scenic overlook of trails' },
  { src: '/good3.jpg', alt: 'Scenic overlook of trails' },
  { src: '/lake1.jpg', alt: 'Scenic overlook of trails' },
  { src: '/hill4.jpg', alt: 'Scenic overlook of trails' },
  { src: '/rocks2.jpg', alt: 'Scenic overlook of trails' },
  { src: '/river.jpg', alt: 'Scenic overlook of trails' },
  { src: '/feature3.jpg', alt: 'Scenic overlook of trails' },
  { src: '/rocks.jpg', alt: 'Scenic overlook of trails' },
  { src: '/longbridge.jpg', alt: 'Scenic overlook of trails' },
  { src: '/feature4.jpg', alt: 'Scenic overlook of trails' },
];

export default function CroomTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems: RadialMenuItem[] = [
    { id: 'bike', label: 'Bike', icon: '/icons/bike.png' },
    { id: 'motorbike', label: 'Motorized', icon: '/icons/motor2.jpg', color: 'red' },
    { id: 'nohelmet', label: 'Nohelmet', icon: '/icons/nohelm2.png', color: 'red' },
    { id: 'dog', label: 'Dog', icon: '/icons/dog.png', color: 'red' },
    { id: 'map', label: 'Map', icon: '/icons/map.png' },
    { id: 'parking', label: 'Parking', icon: '/icons/parking2.png' },
    { id: 'water', label: 'Water', icon: '/icons/water.png' },
    { id: 'restroom', label: 'Restroom', icon: '/icons/restroom.png' },
    { id: 'picnic', label: 'Picnic', icon: '/icons/picnic.png' },
  ];

  const handleMenuOpen = () => {
    const rect = menuButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY,
      });
      setMenuOpen(true);
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setMenuPosition(null);
  };

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
            Explore Florida&apos;s premier mountain biking destination with over 50 miles of diverse terrain
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-4 pt-4 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
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
            <div
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
            >
              <div className="text-sm text-gray-400 pb-2">Access</div>
              <button ref={menuButtonRef} className="pb-2 cursor-pointer">Amenities & Restrictions</button>
              {menuOpen && menuPosition && (
                <RadialMenu
                  isOpen={menuOpen}
                  onClose={handleMenuClose}
                  menuItems={menuItems}
                  position={menuPosition}
                  overlay={false}
                />
              )}
            </div>
            <div>
              <div className="text-sm text-gray-400">Managed By</div>
              <div className="font-medium">SWAMP Mountain Bike Club</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30 w-full border-b border-gray-700">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="flex items-center py-4">
            <div className="flex flex-grow space-x-8 text-gray-300 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('beginner')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'beginner'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Beginner Trails
              </button>
              <button 
                onClick={() => setActiveTab('intermediate')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'intermediate'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Intermediate Trails
              </button>
              <button 
                onClick={() => setActiveTab('advanced')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'advanced'
                    ? 'bg-gray-800 text-white border-b-2 border-orange-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Advanced Trails
              </button>
              <button 
                onClick={() => setActiveTab('amenities')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'amenities'
                    ? 'bg-gray-800 text-white border-b-2 border-gray-300 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Access & Amenities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 mt-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT COLUMN: About, Map, Gallery */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">About Croom</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-4">
                  Nesetled in the heart of the Withlacoochee State Forest, Croom's mountain biking network delivers one of Florida's most rugged and exhilerating off-road experiences. With more than 50 miles of singletrack, this trail system offers an intense cardio workout wrapped in scenic wilderness-perfect for riders chasing adventure and variety. </p>
                  <p> Croom offers over 50 miles of diverse singletrack trails and is famous for its suprisingly steep climbs and extended trail runs-rare finds in Florida. Many trails wind through abandoned phosphate quarries, turning the landscape into a natural playground of punchy ascents, sharp drops, and rocky features that demand attention and reward skill. </p>
                  <p>While intermediate riders will find plenty of challenges to improve their game, the trail system offers something for every level-from beginner-friendly flow trails to advanced technical routes packed with obstacles.</p>
                <p className="text-gray-300 text-lg mb-4">
                  With color-coded trail markings and strategically placed bailout points, riders can easily navigate the extensive network while enjoying the natural beauty of central Florida.
                </p>
              </div>

              {/* Trail Map (Mapbox with 2D/3D toggle) */}
              <div className="bg-gray-700 rounded-lg p-6 mb-6 shadow-lg mt-10">
                <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
                  <TrailMap lat={trailData.lat} lon={trailData.lon} name={trailData.name} />
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="mt-10">
                <TrailPhotoGallery photos={photos} />
              </div>
            </div>

            {/* RIGHT COLUMN: Weather, Trail Details, Trail Maintenance */}
            <div>
              {/* Weather Forecast */}
              <div className="mb-6">
                <WeatherForecast 
                  location={TRAIL_COORDS.location}
                  latitude={TRAIL_COORDS.latitude}
                  longitude={TRAIL_COORDS.longitude}
                  apiKey={process.env.NEXT_PUBLIC_WEATHER_API_KEY || ''}
                />
              </div>
              {/* Trail Details Card */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
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
              {/* Trail Maintenance & Community */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Trail Maintenance & Community</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-300">The <a href="https://www.swampmtbclub.com/trails" className="text-green-500 hover:text-green-300 font-bold">SWAMP</a> Mountain Bike Club actively maintains the trail system, ensuring trails are safe and enjoyable. They also host events and group rides, fostering a vibrant mountain biking community.</p>
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
                <li>Start with the South Blue Trail if you&apos;re completely new to mountain biking</li>
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

      {/* Maps & Directions Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
            <span className="text-white text-xl">🗺️</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Maps & Directions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Trail Location</h3>
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
          
          {/* Directions */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Driving Directions</h3>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-300">From Tampa:</h4>
                  <p className="text-gray-400">Take I-75 North to exit 301 (SR-50). Head east on SR-50 for approximately 12 miles. Turn north onto Croom Rital Road, then left onto Croom Road (Forest Road 6). The main trailhead is Tucker Hill Day Use Area.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300">From Orlando:</h4>
                  <p className="text-gray-400">Take I-4 West to exit 58 (CR-54/Polk City). Continue west to US-98, then head north to SR-50. Turn left (west) on SR-50, then north on Croom Rital Road, and left on Croom Road (Forest Road 6).</p>
                </div>
                <div className="pt-3 flex justify-center">
                  <a href="https://maps.google.com/?q=Croom+Mountain+Bike+Trails+Brooksville+Florida" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Get Directions in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="max-w-4xl mx-auto text-center py-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Croom?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Grab your bike and helmet and experience some of Florida&apos;s best trails.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.swampmtbclub.com/trails" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              SWAMP Club Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
