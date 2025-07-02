"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import WeatherForecast from '@/app/components/WeatherForecast';
import TrailMap from '@/app/components/TrailMap';
import TrailDifficulty from '@/app/components/TrailDifficulty';
import 'mapbox-gl/dist/mapbox-gl.css';
import RadialMenu, { RadialMenuItem } from '@/app/components/RadialMenu';
import TrailPhotoGallery, { TrailPhoto } from '@/app/components/TrailPhotoGallery';
import TrailFeatures from '@/app/components/TrailFeatures';
import TrailAmenities from '@/app/components/TrailAmenities';

const TRAIL_COORDS = {
  latitude: 27.7647,
  longitude: -82.2702,
  location: "Balm Boyette Scrub Preserve, FL"
};

const trailData = {
  name: "Balm Boyette",
  lon: -82.2702,  // longitude
  lat: 27.7647    // latitude
};

const features = [
  {
    image: '/rocks.jpg',
    title: 'Technical Rock Gardens',
    description: 'Challenging rock garden sections that test bike handling skills and provide expert-level technical riding opportunities.',
    type: 'Technical Challenge',
  },
  {
    image: '/hill3.jpg',
    title: 'Steep Climbs & Descents',
    description: 'Intense elevation changes with steep climbs and technical descents, rare for Florida terrain.',
    type: 'Elevation',
  },
  {
    image: '/feature2.jpg',
    title: 'Mining Pit Features',
    description: 'Unique trails utilizing old phosphate mining pits with steep drops and technical features.',
    type: 'Unique Terrain',
  },
  {
    image: '/trail10.jpg',
    title: 'Expert Singletrack',
    description: 'Narrow, technical singletrack with tight corners, root sections, and challenging obstacles.',
    type: 'Trail Type',
  },
  {
    image: '/doublefeature.jpg',
    title: 'Advanced Features',
    description: 'Purpose-built features including drops, jumps, and technical obstacles for experienced riders.',
    type: 'Built Features',
  },
  {
    image: '/trail3.jpg',
    title: 'Scenic Overlooks',
    description: 'Beautiful viewpoints offering panoramic views of the preserve and surrounding landscape.',
    type: 'Scenic Feature',
  },
];

const ridingTips = [
  {
    category: 'Expert Riding',
    tips: [
      'Full suspension bike strongly recommended for all trails',
      'Always ride with a partner due to the technical nature',
      'Carry comprehensive repair kit and first aid supplies',
      'Check trail conditions before riding, especially after rain',
      'Start with intermediate trails if it\'s your first visit',
      'Be prepared for significant elevation changes',
    ],
  },
  {
    category: 'Technical Sections',
    description: 'Tips for handling the most challenging parts:',
    tips: [
      'Maintain momentum through rock gardens to avoid getting stuck',
      'For steep descents, keep weight back and use both brakes',
      'When climbing steep sections, stay seated and maintain cadence',
      'Use a lower tire pressure for better traction on technical features',
      'Practice technical skills on easier sections before attempting expert trails',
    ],
  },
  {
    category: 'Weather Considerations',
    description: 'Balm Boyette can be affected by weather conditions:',
    tips: [
      'Trails can be extremely slick after rain - wait 24-48 hours',
      'Summer months bring high heat and humidity - ride early morning',
      'Best riding conditions are October through April',
      'Check trail conditions on SWAMP Facebook group before visiting',
      'Some trails may close during hunting seasons',
    ],
  },
  {
    category: 'Recommended Gear',
    tips: [
      'Full suspension mountain bike with 140mm+ travel',
      'Aggressive tires (2.4"+) for technical terrain',
      'Hydration pack with at least 3 liters of water',
      'Comprehensive tool kit including chain tool and spare parts',
      'First aid kit and emergency contact information',
      'Protective gear including knee and elbow pads',
      'GPS device or phone with offline maps',
    ],
  },
];

const amenities = [
  { icon: '🅿️', label: 'Free Parking' },
  { icon: '📋', label: 'Trail Register' },
  { icon: '🗺️', label: 'Trail Maps' },
  { icon: '⚠️', label: 'Safety Signs' },
  { icon: '📱', label: 'Limited Cell Service' },
  { icon: '🚻', label: 'No Restrooms' },
];

type DifficultyLevelType = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const trailDifficulties: { name: string; length: string; level: DifficultyLevelType }[] = [
  { name: 'East Meadow', length: '0.86', level: 'Beginner' },
  { name: 'Inception', length: '0.7', level: 'Beginner' },
  { name: 'Northeast', length: '2.0', level: 'Beginner' },
  { name: 'Northwest', length: '1.0', level: 'Beginner' },
  { name: 'Pandemonium 1', length: '0.32', level: 'Beginner' },
  { name: 'Randys Trail', length: '0.22', level: 'Beginner' },
  { name: 'Sasquatch', length: '0.95', level: 'Beginner' },
  { name: 'Southeast', length: '1.0', level: 'Beginner' },
  { name: 'Southwest', length: '0.63', level: 'Beginner' },
  { name: 'Vista Ridge', length: '0.15', level: 'Beginner' },
  { name: 'Woods Trail', length: '1.0', level: 'Beginner' },

  { name: 'Canyon', length: '0.37', level: 'Intermediate' },
  { name: 'Chaos', length: '0.07', level: 'Intermediate' },
  { name: 'Gator Pit', length: '0.27', level: 'Intermediate' },
  { name: 'Golf Cart', length: '1.0', level: 'Intermediate' },
  { name: 'Lower West Meadow', length: '0.20', level: 'Intermediate' },
  { name: 'Nemesis', length: '0.27', level: 'Intermediate' },
  { name: 'Pandemonium 2', length: '0.19', level: 'Intermediate' },
  { name: 'Serpentine', length: '0.20', level: 'Intermediate' },
  { name: 'Sidewinder', length: '0.27', level: 'Intermediate' },
  { name: 'Spiderberm', length: '0.19', level: 'Intermediate' },
  { name: 'Swamp Thing', length: '0.24', level: 'Intermediate' },
  { name: 'The Spur', length: '0.85', level: 'Intermediate' },
  { name: 'Upper Loch Ness', length: '1.0', level: 'Intermediate' },
  { name: 'Upper West Meadow', length: '0.50', level: 'Intermediate' },
  { name: 'Expert Ridge', length: '0.17', level: 'Intermediate' },
  { name: 'Mining Pit Trail', length: '0.27', level: 'Intermediate' },
  { name: 'Advanced Loop', length: '0.24', level: 'Intermediate' },
  { name: 'Technical Descent', length: '1.5', level: 'Intermediate' },
  { name: 'Intermediate Ridge', length: '2.2', level: 'Intermediate' },
  { name: 'Expert Challenge', length: '3.2', level: 'Intermediate' },

  { name: 'Ridgeline', length: '2.0', level: 'Advanced' },
  { name: 'Laurens Overlook', length: '0.03', level: 'Advanced' },
  { name: 'Pandemonium 3', length: '0.16', level: 'Advanced' },
  { name: 'OMG', length: '0.07', level: 'Advanced' },
  { name: 'Max G', length: '0.05', level: 'Advanced' },
  { name: 'Plunge', length: '0.06', level: 'Advanced' },
  { name: 'Garrys Loop', length: '0.23', level: 'Advanced' },
  { name: 'South Abyss', length: '0.57', level: 'Advanced' },
  { name: 'North Abyss', length: '0.74', level: 'Advanced' },
  { name: 'Baby Nessie', length: '0.7', level: 'Advanced' },
];

const photos: TrailPhoto[] = [
  { src: '/rocks.jpg', alt: 'Technical Rock Gardens' },
  { src: '/hill3.jpg', alt: 'Steep Climbs' },
  { src: '/feature2.jpg', alt: 'Mining Pit Features' },
  { src: '/trail10.jpg', alt: 'Expert Singletrack' },
  { src: '/doublefeature.jpg', alt: 'Advanced Features' },
  { src: '/trail3.jpg', alt: 'Scenic Overlooks' },
  { src: '/feature1.jpg', alt: 'Trail through preserve' },
  { src: '/rocks2.jpg', alt: 'Technical sections' },
  { src: '/hill4.jpg', alt: 'Elevation changes' },
];

export default function BalmBoyetteTrailPage() {
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
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Hero Header Section */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center py-16 px-4">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Balm Boyette Trails</h1>
          <div className="inline-block bg-red-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Expert Difficulty
          </div>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto px-4">
            Experience Florida&apos;s most technical singletrack with challenging terrain and expert-level features
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Balm Boyette Scrub Preserve</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Length</div>
              <div className="font-medium">25+ miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Gain</div>
              <div className="font-medium">400+ feet</div>
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
              <div className="font-medium">SWAMP MTB Club</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-gray-900 w-full border-b border-gray-700">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="flex items-center py-2">
            <div className="flex flex-grow space-x-2 md:space-x-8 text-gray-300 overflow-x-auto no-scrollbar">
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
                onClick={() => setActiveTab('features')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'features' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Features
              </button>
              <button 
                onClick={() => setActiveTab('tips')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'tips' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Riding Tips
              </button>
              <button 
                onClick={() => setActiveTab('amenities')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'amenities' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 mt-6 md:mt-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">About Balm Boyette</h2>
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-gray-300 text-base md:text-lg mb-4">
                  Balm Boyette Scrub Nature Preserve offers some of Florida&apos;s most challenging mountain biking experiences. Located on former phosphate mining land, the preserve features unique topography with steep climbs, technical descents, and expert-level features.
                </p>
                <p className="text-gray-300 text-base md:text-lg mb-4">
                  The trail system spans over 25 miles of diverse singletrack, with the majority of trails catering to advanced and expert riders. The preserve&apos;s varied terrain includes challenging rock gardens, steep drops, and technical features that make it a destination for skilled mountain bikers.
                </p>
                <p className="text-gray-300 text-base md:text-lg mb-4">
                  While primarily known for its expert-level riding, Balm Boyette also offers some intermediate trails for progressing riders. The unique landscape, created by historical phosphate mining, provides an exceptional riding environment unlike anywhere else in Florida.
                </p>
              </div>

              {/* Video Section */}
              <div className="bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-105 mb-8">
                <iframe 
                  width="100%" 
                  height="400" 
                  src="https://www.youtube.com/embed/ulaQAEc1HZc?si=IYKYi-mgK3p2GWk6" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>

              {/* Trail Features Section */}
              <TrailFeatures features={features} />

              {/* Map Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Trail Map</h3>
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                  <TrailMap 
                    lat={TRAIL_COORDS.latitude}
                    lon={TRAIL_COORDS.longitude}
                    name={trailData.name}
                  />
                </div>
              </div>

              {/* Photo Gallery Section */}
              <TrailPhotoGallery photos={photos} />

              {/* Trail Maintenance & Community */}
              <div className="mt-12 md:mt-20">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Trail Maintenance & Community</h3>
                </div>
                <div className="rounded-lg shadow-lg">
                  <p className="text-gray-300 text-base md:text-lg">The <a href="https://www.swampmtbclub.com/trails" className="text-green-500 hover:text-green-300 font-bold">SWAMP</a> Mountain Bike Club actively maintains these challenging trails, ensuring they remain safe while preserving their technical nature. Regular trail work days help maintain and improve the trail system.</p>
                </div>
                <div className="relative h-32 md:h-48 mt-6 rounded-lg overflow-hidden">
                  <Image
                    src="/images/balm-boyette/balmboyettemap.jpg"
                    alt="Trail maintenance at Balm Boyette"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <WeatherForecast 
                location={TRAIL_COORDS.location}
                latitude={TRAIL_COORDS.latitude}
                longitude={TRAIL_COORDS.longitude}
                apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
              />
              <div className="bg-gray-800 rounded-lg overflow-visible shadow-lg mt-8">
                <div className="bg-gray-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Trail Difficulty Breakdown</h3>
                </div>
                <div className="p-6">
                  <TrailDifficulty trails={trailDifficulties} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Trail Features Tab */}
        {activeTab === 'features' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Trail Features</h2>
            <TrailFeatures features={features} />
          </div>
        )}

        {/* Riding Tips Tab */}
        {activeTab === 'tips' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Riding Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {ridingTips.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                  {category.description && (
                    <p className="text-gray-300 mb-4">{category.description}</p>
                  )}
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="text-gray-300 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Access & Amenities Tab */}
        {activeTab === 'amenities' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Access & Amenities</h2>
            <TrailAmenities amenities={amenities} />
            
            <div className="mt-8 md:mt-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Photo Gallery</h3>
              <TrailPhotoGallery photos={photos} />
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800">
        <div className="max-w-4xl mx-auto text-center py-6 md:py-8 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Ride Balm Boyette?</h2>
          <p className="text-lg md:text-xl text-white opacity-90 mb-6 md:mb-8">Join the community and experience some of Florida&apos;s most technical trails.</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.swampmtbclub.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              SWAMP Club Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
