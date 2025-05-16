"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// import Link from 'next/link';
// import WeatherDisplay from '@/app/components/WeatherDisplay';
// import LeafletMap from '@/app/components/LeafletMap';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';
import TrailDifficulty from '@/app/components/TrailDifficulty';
import 'mapbox-gl/dist/mapbox-gl.css';
// import dynamic from 'next/dynamic';
import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';

// const amenities = [
//   { icon: '🅿️', label: 'Free Parking', color: 'text-white' },
//   { icon: '🚻', label: 'Restrooms', color: 'text-white' },
//   { icon: '🪑', label: 'Picnic Tables', color: 'text-white' },
//   { icon: '🚰', label: 'Water Available', color: 'text-white' },
//   { icon: '💰', label: 'Free Entry', color: 'text-white' },
// ];

// const restrictions = [
//   { icon: '🐕', label: 'No Dogs', color: 'text-white' },
//   { icon: '🌙', label: 'No Night Riding', color: 'text-white' },
//   { icon: '🚫', label: 'No Motorized Vehicles', color: 'text-white' },
// ];

const TRAIL_COORDS = {
  latitude: 28.745284,
  longitude: -82.435531,
  location: "Citrus Wildlife Management Area, FL"
};

const trailData = {
  name: "Carter Road",
  lon: -82.435531,  // longitude
  lat: 28.745284    // latitude
};

const CampingTentIcon = (
  <svg viewBox="0 0 512 512" fill="currentColor">
    <path d="M361.155 91.245l-18 .193.42 38.98c-45.773 13.285-108.533 19.738-166.474 23.573 35.097 96.284 99.357 173.77 157.845 257.13 20.718-19.655 51.11-31.983 83.46-36.01-20.8-18.109-36.634-27.966-58.833-70.438 31.27 37.085 52.579 48.467 77.623 62.006 3.263-13.094 8.938-24.638 18.721-32.674 8.667-7.12 20.026-10.654 33.53-10.344-46.874-59.763-101.67-117.054-127.83-189.435l-.462-42.98zM163.25 102.92l-17.998.244s.25 18.34.56 36.97c.156 9.316.325 18.703.489 25.929.06 2.636.117 4.58.174 6.542-34.378 83.733-69.154 160.993-123.92 233.442 33.635-1.387 66.326-1.203 98.552-.041 22.263-62.617 23.346-134.855 35.627-202.006 11.417 68.562 10.566 139.445 33.483 205.83 42.962 3.082 85.69 7.198 129.35 10.926-55.67-79.151-118.213-155.037-155.118-249.365-.05-1.782-.1-3.396-.152-5.737-.162-7.156-.333-16.523-.488-25.82-.31-18.594-.559-36.914-.559-36.914z"/>
  </svg>
);

const RestroomIcon = (
  <svg viewBox="0 0 24 24" width={48} height={48} fill="black">
    {/* Woman */}
    <circle cx="7" cy="7" r="2"/>
    <rect x="6" y="9" width="2" height="5" rx="1"/>
    <rect x="5" y="14" width="4" height="6" rx="2"/>
    {/* Man */}
    <circle cx="17" cy="7" r="2"/>
    <rect x="16" y="9" width="2" height="7" rx="1"/>
    <rect x="15" y="16" width="4" height="4" rx="2"/>
  </svg>
);

export default function CarterRoadTrailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hasMounted, setHasMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems: RadialMenuItem[] = [
    { id: 'bike', label: 'Bike', icon: '/icons/bike.png' },
    { id: 'motorbike', label: 'Motorized', icon: '/icons/motor2.jpg', color: 'red' },
    { id: 'nohelmet', label: 'Nohelmet', icon: '/icons/nohelm2.png', color: 'red' },
    { id: 'dog', label: 'Dog', icon: '/icons/dog.png', color: 'red' },
    // { id: 'weapon', label: 'Weapon...', icon: '🎯' },
    // { id: 'more', label: 'More...', icon: '⋯' },
    // { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'map', label: 'Map', icon: '/icons/map.png' },
    { id: 'parking', label: 'Parking', icon: '/icons/parking2.png' },
    { id: 'water', label: 'Water', icon: '/icons/water.png' },
    { id: 'restroom', label: 'Restroom', icon: '/icons/restroom.png' },
    { id: 'picnic', label: 'Picnic', icon: '/icons/picnic.png' },
  ];

  useEffect(() => { setHasMounted(true); }, []);

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

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${trailData.lat},${trailData.lon}`,
      '_blank'
    );
  };

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-gray-900 pt-8">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Carter Road</h1>
            <p className="text-xl md:text-2xl text-gray-200">Experience Florida&apos;s Natural Beauty</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-4 pt-4 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
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
              <div className="font-medium">Florida Trail Association</div>
            </div>
          </div>
        </div>
      </div> 

    

      {/* Navigation Tabs */}
      <div className="bg-gray-900 sticky top-20 z-30 w-full border-b border-gray-700" style={{ overflow: 'visible' }}>
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
                Trail Features
              </button>
              <button 
                onClick={() => setActiveTab('intermediate')}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'intermediate'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Riding Tips
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
      <div className="w-full">
        
        <div className="max-w-[90%] mx-auto px-4 md:px-8 py-10">
          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3">
                {/* About Section */}
                <h2 className="text-3xl font-bold text-white mt-10 mb-10">About Carter Road</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg mb-4">
                    Carter Road (Loyce E. Harpe Park) is located in the Citrus Wildlife Management Area, offering a unique riding experience through the beautiful Florida swamplands. The trail provides a distinctive blend of scenic wetlands, pine forests, and occasional technical sections.
                  </p>
                  <p className="text-gray-300 text-lg mb-4">
                    Known for its natural beauty, this singletrack trail winds through diverse ecosystems with wooden boardwalks crossing over wetland areas. Riders can expect to see abundant wildlife including birds, turtles, and occasionally alligators from a safe distance.
                  </p>
                  <p className="text-gray-300 text-lg mb-4">
                    The trail system ranges from easy to intermediate difficulty, making it accessible to a wide range of riders. Some sections can become challenging after heavy rainfall, so checking trail conditions before visiting is recommended.
                  </p>
                </div>

                {/* Video Section */}
                <div className="bg-gray-700 px-8 mt-20 rounded-lg">
                  <div className="bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-105 mt-20 mb-20">
                    <div className="aspect-video w-full">
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
              
                <h2 className="text-3xl font-bold text-white mt-10 mb-10">Location</h2>
                <div className="text-xl">Address: <strong className="font-bold text-blue-300">Loyce E. Harpe Park</strong> 500 W Carter Road, Mulberry, FL 33860</div>
                <div className="text-xl pt-4">Driving directions:</div>

                {/* Trail Map (Mapbox with 2D/3D toggle) */}
                <div className="bg-gray-700 rounded-lg p-6 shadow-lg mt-20">
                  <TrailMap lat={trailData.lat} lon={trailData.lon} name={trailData.name} />
                </div>
              </div>

              {/* Right Column - Weather and Trail Details */}
              <div className="lg:col-span-1 pt-8 pl-10">
                {/* Weather Section */}
                <WeatherForecast 
                  location={TRAIL_COORDS.location}
                  latitude={TRAIL_COORDS.latitude}
                  longitude={TRAIL_COORDS.longitude}
                  apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
                />

                {/* Trail Difficulty Section */}
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-18">
                  <div className="bg-gray-700 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Trail Difficulty Breakdown</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Beginner Trails */}
                      <div>
                        <div className="bg-green-600 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-green-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-white">Beginner Trails</h4>
                            <span className="text-white text-sm bg-green-700 px-3 py-1 rounded-full">6 Trails</span>
                          </div>
                        </div>
                        <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Pine Needle Loop (1.2 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Cypress Trail (0.8 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Nature Walk (1.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Boardwalk Trail (0.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Fence Line (1.0 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Exit Trail (0.7 mi)
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Intermediate Trails */}
                      <div>
                        <div className="bg-blue-600 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-blue-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-white">Intermediate Trails</h4>
                            <span className="text-white text-sm bg-blue-700 px-3 py-1 rounded-full">8 Trails</span>
                          </div>
                        </div>
                        <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Ridge Runner (2.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Swamp Connect (1.8 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Oak Hammock (2.0 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Palmetto Pass (1.7 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Horseshoe (1.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Snake Ridge (1.3 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Pump Track (0.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Flip N Steep (1.2 mi)
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Advanced Trails */}
                      <div>
                        <div className="bg-red-600 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-red-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-white">Advanced Trails</h4>
                            <span className="text-white text-sm bg-red-700 px-3 py-1 rounded-full">6 Trails</span>
                          </div>
                        </div>
                        <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Technical Loop (3.0 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Rock Garden (1.2 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Root Run (2.2 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Beast Mode (2.5 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Dragon's Revenge (1.8 mi)
                            </li>
                            <li className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Challenge Trail (2.8 mi)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
              
              {/* Trail Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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
                
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <div className="relative h-56">
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

          {activeTab === 'difficulty' && (
            <TrailDifficulty />
          )}
        </div>
      </div>

      {/* Weather and Map Section */}
      <section className="bg-gray-800 py-12">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weather Section */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              {/* <h3 className="text-xl font-bold mb-4 text-white">Weather Information</h3> */}
              {/* Current Weather */}
              {/* <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Current Conditions</h4>
                <WeatherDisplay location={TRAIL_COORDS.location} />
              </div> */}
              {/* 5-Day Forecast */}
              <h3 className="text-xl font-bold mb-4 text-white">Trail Map</h3>
              <div className="relative h-138">
                    <Image
                      src="/balmboyettemap.jpg" 
                      alt="Open Prairie Crossing"
                      fill
                      className="object-cover"
                    />
                  </div>
            </div>

            {/* Trail Map Section */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              {/* <h3 className="text-xl font-bold mb-4 text-white">Trail Location</h3>
              <LeafletMap
                latitude={TRAIL_COORDS.latitude}
                longitude={TRAIL_COORDS.longitude}
                location={TRAIL_COORDS.location}
              /> */}
              {/* Trail Info */}
              <div className="mt-4 bg-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Trail Information</h4>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-medium">Location:</span> {TRAIL_COORDS.location}</p>
                  <p><span className="font-medium">Coordinates:</span> {TRAIL_COORDS.latitude.toFixed(6)}, {TRAIL_COORDS.longitude.toFixed(6)}</p>
                  <p><span className="font-medium">Parking:</span> Available at main trailhead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 