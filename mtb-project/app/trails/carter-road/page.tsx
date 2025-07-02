"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
import 'mapbox-gl/dist/mapbox-gl.css';
// import TrailFeatures from '@/app/components/TrailFeatures';
// import TrailDifficulty from '@/app/components/TrailDifficulty';
import TrailAmenities from '@/app/components/TrailAmenities';

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

const photos: TrailPhoto[] = [
  { src: '/bridge1.jpg', alt: 'Wooden Boardwalk' },
  { src: '/bridge20.jpg', alt: 'Swampland Section' },
  { src: '/woodedtrail.jpg', alt: 'Pine Forest Segment' },
  { src: '/rocks.jpg', alt: 'Rocky Technical Section' },
  { src: '/gator.jpg', alt: 'Wildlife Viewing Area' },
  { src: '/lake.jpg', alt: 'Open Prairie Crossing' },
];

const amenities = [
  { icon: '🚻', label: 'Basic Restrooms' },
  { icon: '🅿️', label: 'Free Parking' },
  { icon: '📋', label: 'Information Board' },
  { icon: '🚩', label: 'Trail Maps' },
  { icon: '🪑', label: 'Picnic Tables' },
  { icon: '📱', label: 'Limited Cell Service' },
];

type DifficultyLevelType = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const trailDifficulties: { name: string; length: string; level: DifficultyLevelType }[] = [
  { name: 'Black Forest', length: '0.35', level: 'Beginner' },
  { name: 'Dog Park', length: '0.67', level: 'Beginner' },
  { name: 'Ivy', length: '0.4', level: 'Beginner' },
  { name: 'Modello Highway', length: '1.88', level: 'Beginner' },
  { name: 'Spector Sector', length: '0.96', level: 'Beginner' },
  { name: 'Sprinkler Hill', length: '0.43', level: 'Beginner' },
  { name: 'The Field', length: '0.51', level: 'Beginner' },
  { name: 'Technical Loop', length: '3.0', level: 'Advanced' },
  { name: 'Rock Garden', length: '1.2', level: 'Advanced' },
  { name: 'Root Run', length: '2.2', level: 'Advanced' },
  { name: 'Challenge Trail', length: '2.8', level: 'Advanced' },
  { name: 'Baby Beast', length: '0.1', level: 'Intermediate' },
  { name: 'Cruddy Buddy', length: '0.46', level: 'Intermediate' },
  { name: 'Horseshoe', length: '0.27', level: 'Intermediate' },
  { name: 'Little Blue', length: '0.31', level: 'Intermediate' },
  { name: 'Little Humber', length: '0.13', level: 'Intermediate' },
  { name: 'Lord of the Flies', length: '0.54', level: 'Intermediate' },
  { name: 'Poison Ivy', length: '0.11', level: 'Intermediate' },
  { name: 'Roller Coaster', length: '1.88', level: 'Intermediate' },
  { name: 'Rope Swing', length: '0.22', level: 'Intermediate' },
  { name: 'Snake Ridge', length: '0.52', level: 'Intermediate' },
  { name: '1st Finger', length: '0.25', level: 'Advanced' },
  { name: '2nd Finger', length: '0.30', level: 'Advanced' },
  { name: '3rd Finger', length: '0.32', level: 'Advanced' },
  { name: 'Big Mamas House', length: '0.47', level: 'Advanced' },
  { name: 'Big Red', length: '0.42', level: 'Advanced' },
  { name: 'Puff N Stuff', length: '0.21', level: 'Advanced' },
  { name: 'Sneaky Snake', length: '0.16', level: 'Advanced' },
  { name: 'The Beast', length: '0.42', level: 'Advanced' },
  { name: 'The Moe', length: '0.25', level: 'Advanced' },
  { name: 'Your Mom', length: '0.45', level: 'Expert' },
];

const ridingTips: { category: string; description?: string; tips: string[] }[] = [
  {
    category: 'Best Practices',
    tips: [
      'Always check trail conditions before riding, especially after rain',
      'Bring plenty of water, as Florida humidity can lead to rapid dehydration',
      'Wear insect repellent during warmer months',
      'Use wider tires (2.2"+) for better stability on boardwalks',
      'Be cautious on boardwalks when wet, as they can become slippery',
      'Respect wildlife and maintain a safe distance if encountered',
    ],
  },
  {
    category: 'Weather Considerations',
    description: 'Carter Road Trail can be affected significantly by weather conditions:',
    tips: [
      'During rainy season (June-September), parts of the trail may be underwater',
      'Summer months bring high temperatures and humidity - ride early morning or evening',
      'Winter and spring offer the best riding conditions with moderate temperatures',
      'After heavy rain, boardwalks can take 1-2 days to dry completely',
      'Trail conditions are typically posted on the Florida Trail Association website',
    ],
  },
  {
    category: 'Technical Sections',
    description: 'Tips for handling the more challenging parts of the trail:',
    tips: [
      'Maintain momentum through sandy sections to avoid getting bogged down',
      'For rocky areas, stand up slightly on your pedals to let the bike move beneath you',
      'When crossing narrow boardwalks, look ahead rather than down at your front wheel',
      'Use a slightly lower tire pressure than usual to improve traction',
      'First-timers should ride conservatively until familiar with trail features',
    ],
  },
  {
    category: 'Recommended Gear',
    tips: [
      'Hardtail or short-travel full suspension bike works well',
      'Wider tires (2.2-2.6") provide stability on various surfaces',
      'Hydration pack with at least 2 liters of water',
      'Basic tool kit including spare tube and patch kit',
      'Sunscreen and insect repellent',
      'Moisture-wicking clothing',
      'Camera for wildlife photography opportunities',
    ],
  },
];

export default function CarterRoadTrailPage() {
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
    <main className="min-h-screen pt-15">
      {/* Hero Header Section */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bikebg.png"
            alt="Carter Road Trails landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Carter Road Trails</h1>
          <div className="inline-block bg-blue-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Intermediate Difficulty
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Experience Florida&apos;s natural beauty through scenic wetlands and pine forests
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Citrus Wildlife Mgmt Area</div>
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
                onClick={() => setActiveTab('beginner')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'beginner'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Beginner Trails
              </button>
              <button 
                onClick={() => setActiveTab('intermediate')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'intermediate'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Intermediate Trails
              </button>
              <button 
                onClick={() => setActiveTab('advanced')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'advanced'
                    ? 'bg-gray-800 text-white border-b-2 border-orange-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Advanced Trails
              </button>
              <button 
                onClick={() => setActiveTab('amenities')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'amenities'
                    ? 'bg-gray-800 text-white border-b-2 border-gray-300 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Things to Know
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 mt-10">
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* Experience Carter Road Video and Weather Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3">
                {/* About Section */}
                <h2 className="text-3xl font-bold text-white mb-6">About Carter Road</h2>
                <div className="prose prose-invert max-w-none mb-8">
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
                <div className="bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-105 mb-8">
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

                {/* Maps & Directions Section */}
                <h2 className="text-3xl font-bold text-white mb-6">Maps & Directions</h2>
                <div className="text-xl mb-4">Address: <strong className="font-bold text-blue-300">Loyce E. Harpe Park</strong> 500 W Carter Road, Mulberry, FL 33860</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Map */}
                  <div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14048.609155217813!2d-82.43553123022462!3d28.745284200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e840c22da7b915%3A0xb79b2387345f868a!2sCarter%20Road%20Trail!5e0!3m2!1sen!2sus!4v1717528158099!5m2!1sen!2sus"
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
                          <p className="text-gray-400">Take I-75 North to exit 301 (SR-50). Head east on SR-50 for approximately 12 miles. Turn north onto Carter Road. The main trailhead is Loyce E. Harpe Park.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300">From Orlando:</h4>
                          <p className="text-gray-400">Take I-4 West to exit 58 (CR-54/Polk City). Continue west to US-98, then head north to SR-50. Turn left (west) on SR-50, then north on Carter Road.</p>
                        </div>
                        <div className="pt-3 flex justify-center">
                          <a href="https://maps.google.com/?q=Carter+Road+Trail+Mulberry+Florida" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                            Get Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trail Map (Mapbox with 2D/3D toggle) */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                  <div className="w-full h-96 overflow-hidden rounded-lg">
                    <TrailMap lat={trailData.lat} lon={trailData.lon} name={trailData.name} />
                  </div>
                </div>

                {/* Photo Gallery Section */}
                <TrailPhotoGallery photos={photos} />

                {/* Carter Road Map Image */}
                <h3 className="text-3xl font-bold text-white mt-10 mb-6">Trail Map</h3>
                <div className="relative h-96 max-w-contain mx-auto">
                  <Image
                    src="/images/carter-road/cartermap.jpg"
                    alt="Carter Road Trail Map"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1">
                {/* Weather Section */}
                <WeatherForecast 
                  location={TRAIL_COORDS.location}
                  latitude={TRAIL_COORDS.latitude}
                  longitude={TRAIL_COORDS.longitude}
                  apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'beginner' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Beginner Trails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trailDifficulties.filter(trail => trail.level === 'Beginner').map((trail, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">{trail.name}</h3>
                  <p className="text-gray-300 mb-4">Length: {trail.length} miles</p>
                  <div className="inline-block bg-green-600 px-3 py-1 rounded-full text-white text-sm">
                    Beginner
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'intermediate' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Intermediate Trails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trailDifficulties.filter(trail => trail.level === 'Intermediate').map((trail, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">{trail.name}</h3>
                  <p className="text-gray-300 mb-4">Length: {trail.length} miles</p>
                  <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-white text-sm">
                    Intermediate
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Advanced Trails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trailDifficulties.filter(trail => trail.level === 'Advanced').map((trail, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">{trail.name}</h3>
                  <p className="text-gray-300 mb-4">Length: {trail.length} miles</p>
                  <div className="inline-block bg-orange-600 px-3 py-1 rounded-full text-white text-sm">
                    Advanced
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Expert Trails</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trailDifficulties.filter(trail => trail.level === 'Expert').map((trail, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-2">{trail.name}</h3>
                    <p className="text-gray-300 mb-4">Length: {trail.length} miles</p>
                    <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-white text-sm">
                      Expert
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Trail Access & Amenities</h2>
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
              <div>
                <TrailAmenities amenities={amenities} />
                <div className="mt-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
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

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-white mb-8">Riding Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ridingTips.map((section: { category: string; description?: string; tips: string[] }, idx: number) => (
                  <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{section.category}</h3>
                      {section.description && <p className="text-gray-300 mb-4">{section.description}</p>}
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        {section.tips.map((tip: string, tipIdx: number) => (
                          <li key={tipIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="max-w-4xl mx-auto text-center py-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Carter Road?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Grab your bike and helmet and experience some of Florida&apos;s best trails.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.swfwmd.state.fl.us/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              Park Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}