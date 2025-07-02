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
  latitude: 27.7647,
  longitude: -82.0702,
  location: "Alafia River State Park, FL"
};

const trailData = {
  name: "Alafia",
  lon: -82.0702,  // longitude
  lat: 27.7647    // latitude
};

const photos: TrailPhoto[] = [
  { src: '/trail-1.jpg', alt: 'Alafia trail through forest' },
  { src: '/trail-2.jpg', alt: 'Technical section with rocks' },
  { src: '/trail-3.jpg', alt: 'Scenic overlook of trails' },
  { src: '/trail4.jpg', alt: 'Trail through pine forest' },
  { src: '/trail7.jpg', alt: 'Technical rock garden' },
  { src: '/trail8.jpg', alt: 'Scenic trail section' },
];

const features: Features[] = [
  {
    image: '/trail-1.jpg',
    title: 'Phosphate Mining Terrain',
    description: 'Unique topography created from former phosphate mining operations, offering dramatic elevation changes rare in Florida.',
    type: 'Terrain',
  },
  {
    image: '/trail-2.jpg',
    title: 'Technical Rock Gardens',
    description: 'Challenging rock gardens and technical features that test bike handling skills and rider confidence.',
    type: 'Technical Challenge',
  },
  {
    image: '/trail-3.jpg',
    title: 'Steep Climbs & Descents',
    description: 'Significant elevation changes with steep climbs and fast descents that provide an exceptional riding experience.',
    type: 'Elevation',
  },
  {
    image: '/trail4.jpg',
    title: 'Wooden Features',
    description: 'Purpose-built wooden bridges, berms, and features that enhance the technical challenge and flow of the trails.',
    type: 'Infrastructure',
  },
  {
    image: '/trail7.jpg',
    title: 'Progressive Difficulty',
    description: 'Well-designed trail system with clear progression from beginner to expert levels for all skill development.',
    type: 'Trail Design',
  },
  {
    image: '/trail8.jpg',
    title: 'Scenic Views',
    description: 'Beautiful vistas and overlooks throughout the trail system showcasing the unique landscape.',
    type: 'Scenic',
  },
];

const ridingTips = [
  {
    category: 'Best Practices',
    tips: [
      'Always check trail conditions before riding, especially after rain',
      'Bring plenty of water and energy snacks for longer rides',
      'Wear appropriate safety gear including helmet, gloves, and eye protection',
      'Ride within your skill level and progress gradually',
      'Be aware of other trail users and yield appropriately',
      'Stay on marked trails to protect the environment',
    ],
  },
  {
    category: 'Weather Considerations',
    description: 'Alafia trails can be significantly affected by weather conditions:',
    tips: [
      'Summer months bring high temperatures and humidity - ride early morning or evening',
      'Afternoon thunderstorms are common in summer - check weather forecasts',
      'Winter and spring offer the best riding conditions with moderate temperatures',
      'Trails may be closed during heavy rain or maintenance',
      'Check the park website for current trail conditions',
    ],
  },
  {
    category: 'Technical Sections',
    description: 'Tips for handling the more challenging parts of the trail:',
    tips: [
      'Practice on easier trails before attempting advanced sections',
      'Maintain momentum through rocky sections and technical features',
      'Use proper body position for climbs and descents',
      'Look ahead and plan your line through technical sections',
      'Don\'t hesitate to walk difficult sections if needed',
    ],
  },
  {
    category: 'Recommended Gear',
    tips: [
      'Full suspension bike recommended for advanced trails',
      'Tires with good traction for loose and rocky surfaces',
      'Hydration pack with at least 2-3 liters of water',
      'Basic tool kit including spare tube, pump, and chain tool',
      'Sunscreen and insect repellent',
      'Comfortable, moisture-wicking clothing',
    ],
  },
];

const amenities = [
  { icon: '🚻', label: 'Clean Restrooms' },
  { icon: '🅿️', label: 'Parking Fee Required' },
  { icon: '🚰', label: 'Water Stations' },
  { icon: '🚿', label: 'Bike Wash Station' },
  { icon: '🪑', label: 'Picnic Pavilions' },
  { icon: '🏕️', label: 'Camping Facilities' },
];

type DifficultyLevelType = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const trailDifficulties: { name: string; length: string; level: DifficultyLevelType }[] = [
  { name: 'Green Loop', length: '2.1', level: 'Beginner' },
  { name: 'Family Trail', length: '1.5', level: 'Beginner' },
  { name: 'Easy Rider', length: '1.8', level: 'Beginner' },
  { name: 'Blue Loop', length: '3.2', level: 'Intermediate' },
  { name: 'Intermediate Trail', length: '2.8', level: 'Intermediate' },
  { name: 'Skills Trail', length: '1.5', level: 'Intermediate' },
  { name: 'Black Diamond Loop', length: '4.1', level: 'Advanced' },
  { name: 'Expert Section', length: '2.2', level: 'Expert' },
  { name: 'Double Black Diamond', length: '1.8', level: 'Expert' },
];

export default function AlafiaTrailPage() {
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
            alt="Alafia River State Park Trails landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Alafia River State Park</h1>
          <div className="inline-block bg-orange-500 px-4 py-1 rounded-full text-white font-semibold mb-4">
            Advanced Difficulty
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            World-class mountain biking on Florida&apos;s most challenging terrain
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="font-medium">Lithia, FL</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Length</div>
              <div className="font-medium">20+ miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Gain</div>
              <div className="font-medium">Significant</div>
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
              <div className="font-medium">Florida State Parks</div>
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
          <div className="max-w-7xl mx-auto px-4 py-12 pt-20 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT COLUMN: Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-white mb-6">About Alafia River State Park</h2>
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-gray-300 text-lg mb-4">
                    Alafia River State Park is renowned for offering some of Florida&apos;s most challenging mountain biking experiences. Built on former phosphate mining land, the park features unique topography with significant elevation changes, creating an exceptional riding environment.
                  </p>
                  <p className="text-gray-300 text-lg mb-4">
                    The trail system includes over 20 miles of off-road bicycle trails, ranging from beginner-friendly paths to highly technical single-track that will challenge even the most experienced riders. The park&apos;s varied terrain includes steep climbs, fast descents, wooden features, and technical rock gardens.
                  </p>
                  <p className="text-gray-300 text-lg mb-4">
                    The park&apos;s unique geology provides elevation changes and technical features rarely found in Florida, making it a premier destination for mountain bikers seeking challenging terrain. The trail system is well-maintained and offers clear progression paths for riders of all skill levels.
                  </p>
                </div>
                {/* Video Section */}
                <div className="bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-105 mb-8">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/QLtqDpgK6dg?si=7VPkkd1RH6ifElsR"
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
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 mt-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Interactive Trail Map</h3>
                  <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                    <TrailMap lat={trailData.lat} lon={trailData.lon} name={trailData.name} />
                  </div>
                </div>
                {/* Alafia Map Image */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-6">Alafia Trail Map</h3>
                <div className="relative h-96 max-w-contain mx-auto">
                  <Image
                    src="/images/alafia/AlafiaMap-10.jpeg"
                    alt="Alafia River State Park Trail Map"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                {/* Photo Gallery Section */}
                <TrailPhotoGallery photos={photos} />
              </div>
              {/* RIGHT COLUMN: Weather & Difficulty */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                <WeatherForecast
                  location={TRAIL_COORDS.location}
                  latitude={TRAIL_COORDS.latitude}
                  longitude={TRAIL_COORDS.longitude}
                  apiKey={process.env.NEXT_PUBLIC_WEATHERAPI_KEY || ''}
                />
                <div className="bg-gray-800 rounded-lg overflow-visible shadow-lg">
                  <div className="bg-gray-700 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Trail Difficulty Breakdown</h3>
                  </div>
                  <div className="p-6">
                    <TrailDifficulty trails={trailDifficulties} />
                  </div>
                </div>
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
                    <p className="text-gray-300 mb-4">The main trailhead is located at Alafia River State Park with a large parking area. A park entrance fee is required for access.</p>
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Trail Markings</h3>
                    <p className="text-gray-300 mb-4">Trails are clearly marked with color-coded difficulty indicators throughout the system.</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center bg-green-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-300">Green - Beginner</span>
                      </div>
                      <div className="flex items-center bg-blue-900 bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-blue-300">Blue - Intermediate</span>
                      </div>
                      <div className="flex items-center bg-black bg-opacity-40 rounded-full px-4 py-2">
                        <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
                        <span className="text-gray-300">Black - Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Operating Hours</h3>
                    <p className="text-gray-300 mb-4">The park is open daily from 8 AM until sunset. Night riding is not permitted.</p>
                    <h3 className="text-xl font-semibold text-white mb-4 mt-6">Fees</h3>
                    <p className="text-gray-300">A park entrance fee is required. Annual passes are available for frequent visitors.</p>
                  </div>
                </div>
              </div>
              <div>
                <TrailAmenities amenities={amenities} />
                <div className="mt-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Nearby Services</h3>
                    <p className="text-gray-300 mb-4">Lithia and surrounding areas offer excellent amenities:</p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>Restaurants and convenience stores</li>
                      <li>Bike shops for repairs and supplies</li>
                      <li>Gas stations</li>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride Alafia?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join our community and discover more great trails in Central Florida.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Explore More Trails
            </Link>
            <a href="https://www.floridastateparks.org/parks-and-trails/alafia-river-state-park" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-full transition-colors">
              Park Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
