"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
import 'mapbox-gl/dist/mapbox-gl.css';
import TrailFeatures from '@/app/components/TrailFeatures';
import TrailDifficulty from '@/app/components/TrailDifficulty';
import TrailAmenities from '@/app/components/TrailAmenities';

type Features = {
  image: string;
  title: string;
  description: string;
  type: string;
};

const TRAIL_COORDS = {
  latitude: 28.8025,
  longitude: -81.6445,
  location: "Mount Dora, FL"
};

const trailData = {
  name: "Mount Dora",
  lon: -81.6445,  // longitude
  lat: 28.8025    // latitude
};

const photos: TrailPhoto[] = [
  { src: '/trail-1.jpg', alt: 'Mount Dora trail through forest' },
  { src: '/trail-2.jpg', alt: 'Technical section with rocks' },
  { src: '/trail-3.jpg', alt: 'Scenic overlook of trails' },
  { src: '/trail4.jpg', alt: 'Trail through pine forest' },
  { src: '/trail7.jpg', alt: 'Technical rock garden' },
  { src: '/trail8.jpg', alt: 'Scenic trail section' },
];

const features: Features[] = [
  {
    image: '/trail-1.jpg',
    title: 'Urban Trail System',
    description: 'Conveniently located in the heart of Mount Dora, offering easy access to mountain biking without leaving the city.',
    type: 'Location',
  },
  {
    image: '/trail-2.jpg',
    title: 'Elevation Changes',
    description: 'Surprising elevation changes for Florida, providing challenging climbs and exciting descents.',
    type: 'Terrain',
  },
  {
    image: '/trail-3.jpg',
    title: 'Technical Features',
    description: 'Purpose-built technical features including berms, drops, and rock gardens for skill development.',
    type: 'Technical Challenge',
  },
  {
    image: '/trail4.jpg',
    title: 'Natural Terrain',
    description: 'Trails that make excellent use of the natural landscape with minimal environmental impact.',
    type: 'Natural Features',
  },
  {
    image: '/trail7.jpg',
    title: 'Skills Area',
    description: 'Dedicated area for practicing technical skills and progression for riders of all levels.',
    type: 'Learning',
  },
  {
    image: '/trail8.jpg',
    title: 'Scenic Views',
    description: 'Beautiful views of the surrounding landscape and city from elevated trail sections.',
    type: 'Scenic',
  },
];

const ridingTips = [
  {
    category: 'Best Practices',
    tips: [
      'Check trail conditions before riding, especially after rain',
      'Bring plenty of water, as Florida heat can be intense',
      'Wear appropriate safety gear including helmet and gloves',
      'Be aware of other trail users and yield appropriately',
      'Stay on marked trails to protect the environment',
      'Ride within your skill level and progress gradually',
    ],
  },
  {
    category: 'Weather Considerations',
    description: 'Mount Dora trails can be affected by weather conditions:',
    tips: [
      'Summer months bring high temperatures - ride early morning or evening',
      'Afternoon thunderstorms are common in summer - check weather forecasts',
      'Winter and spring offer the best riding conditions',
      'Trails may be closed during heavy rain or maintenance',
      'Check local trail conditions before visiting',
    ],
  },
  {
    category: 'Technical Sections',
    description: 'Tips for handling the more challenging parts of the trail:',
    tips: [
      'Practice on the skills area before attempting technical features',
      'Maintain momentum through rocky sections',
      'Use proper body position for climbs and descents',
      'Look ahead and plan your line through technical sections',
      'Don\'t hesitate to walk difficult sections if needed',
    ],
  },
  {
    category: 'Recommended Gear',
    tips: [
      'Hardtail or full suspension bike works well',
      'Tires with good traction for loose surfaces',
      'Hydration pack with at least 2 liters of water',
      'Basic tool kit including spare tube and pump',
      'Sunscreen and insect repellent',
      'Comfortable, moisture-wicking clothing',
    ],
  },
];

const amenities = [
  { icon: '🚻', label: 'Restrooms' },
  { icon: '🅿️', label: 'Free Parking' },
  { icon: '🚰', label: 'Water Fountains' },
  { icon: '🪑', label: 'Picnic Areas' },
  { icon: '🛠️', label: 'Bike Repair Station' },
  { icon: '📱', label: 'Good Cell Service' },
];

type DifficultyLevelType = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const trailDifficulties: { name: string; length: string; level: DifficultyLevelType }[] = [
  { name: 'Beginner Loop', length: '2.5', level: 'Beginner' },
  { name: 'Family Trail', length: '1.8', level: 'Beginner' },
  { name: 'Easy Rider', length: '1.2', level: 'Beginner' },
  { name: 'Intermediate Loop', length: '3.2', level: 'Intermediate' },
  { name: 'Technical Trail', length: '2.8', level: 'Intermediate' },
  { name: 'Skills Trail', length: '1.5', level: 'Intermediate' },
  { name: 'Advanced Loop', length: '4.1', level: 'Advanced' },
  { name: 'Expert Section', length: '0.8', level: 'Expert' },
];

export default function MountDoraTrailPage() {
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
            alt="Mount Dora Trails landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Mount Dora Trails</h1>
          <div className="inline-block bg-blue-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Intermediate Difficulty
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Urban trail system with surprising elevation changes and technical features
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Mount Dora, FL</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Length</div>
              <div className="font-medium">8+ miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Gain</div>
              <div className="font-medium">Moderate</div>
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
              <div className="font-medium">City of Mount Dora</div>
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
            {/* About Section */}
            <h2 className="text-3xl font-bold text-white mb-6">About Mount Dora</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-gray-300 text-lg mb-4">
                Mount Dora&apos;s trail system offers a unique urban mountain biking experience with surprisingly challenging terrain. Located in the heart of Mount Dora, these trails take advantage of the area&apos;s natural elevation changes to create an engaging riding experience.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                The trails feature a mix of natural and purpose-built features, including berms, drops, and technical sections that make excellent use of the available terrain. Despite being an urban trail system, riders can find plenty of challenges and opportunities to improve their skills.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                The trail system is designed to be accessible to riders of all skill levels, with clear progression paths from beginner to advanced sections. The skills area provides a safe environment for practicing technical maneuvers before taking them to the main trails.
              </p>
            </div>

            {/* Video Section */}
            <div className="bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-105 mb-8">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/ojMvLUjlmKQ?si=ci0GCMZqyme0Jbdz"
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

            {/* Trail Features Section */}
            <TrailFeatures features={features} />

            {/* Map Section */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
              <div className="w-full h-96 overflow-hidden rounded-lg">
                <TrailMap lat={trailData.lat} lon={trailData.lon} name={trailData.name} />
              </div>
            </div>

            {/* Photo Gallery Section */}
            <TrailPhotoGallery photos={photos} />

            {/* Mount Dora Map Image */}
            <h3 className="text-3xl font-bold text-white mt-10 mb-6">Trail Map</h3>
            <div className="relative h-96 max-w-contain mx-auto">
              <Image
                src="/images/mount-dora/mtdoratrailmap.png"
                alt="Mount Dora Trail Map"
                fill
                className="object-contain rounded-lg"
              />
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
                    <p className="text-gray-300 mb-4">The main trailhead is located in Mount Dora with free parking available. The trails are open daily from sunrise to sunset.</p>
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Trail Markings</h3>
                    <p className="text-gray-300 mb-4">Trails are clearly marked with difficulty indicators and directional signage throughout the system.</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center bg-green-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-300">Green - Beginner</span>
                      </div>
                      <div className="flex items-center bg-blue-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-blue-300">Blue - Intermediate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Operating Hours</h3>
                    <p className="text-gray-300 mb-4">The trails are open from sunrise to sunset, 365 days a year. Night riding is not permitted.</p>
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Fees</h3>
                    <p className="text-gray-300">There is no fee to access the trails. The trail system is maintained by the City of Mount Dora.</p>
                  </div>
                </div>
              </div>
              <div>
                <TrailAmenities amenities={amenities} />
                <div className="mt-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Nearby Services</h3>
                    <p className="text-gray-300 mb-4">Mount Dora offers excellent amenities within minutes of the trailhead:</p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Restaurants and cafes</li>
                      <li>Bike shops for repairs and supplies</li>
                      <li>Gas stations and convenience stores</li>
                      <li>Medical facilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-white mb-8">Riding Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ridingTips.map((section, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{section.category}</h3>
                      {section.description && <p className="text-gray-300 mb-4">{section.description}</p>}
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        {section.tips.map((tip, tipIdx) => (
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Mount Dora?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join our community and discover more great trails in Central Florida.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.cityofmountdora.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              City Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
