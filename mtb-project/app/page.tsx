'use client'

import Image from "next/image";
import { BackgroundCarousel } from "./components/BackgroundCarousel";
import Link from "next/link";
// import RadialMenu, { RadialMenuItem } from "@/app/components/RadialMenu";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
import  MultiTrailMap from "./components/MultiTrailMap";
import { useState } from "react";
import TrailFeatures from "./components/TrailFeatures";

// Featured trails data
const featuredTrails = [
  {
    id: 1,
    name: "Croom",
    slug: "croom",
    description: "Explore Florida&apos;s premier mountain biking destination with 25+ miles of diverse terrain.",
    difficulty: "Advanced",
    length: "25+ miles",
    image: "/trail-1.jpg"
  },
  {
    id: 2,
    name: "Slickrock Trail",
    slug: "slickrock-trail",
    description: "Experience the world-famous trail across Navajo sandstone with excellent traction.",
    difficulty: "Advanced",
    length: "11.3 miles",
    image: "/trail-2.jpg"
  },
  {
    id: 3,
    name: "Whole Enchilada",
    slug: "whole-enchilada",
    description: "Epic trail that descends 7,000 feet through diverse ecosystems to the Colorado River.",
    difficulty: "Expert",
    length: "33.0 miles",
    image: "/trail-3.jpg"
  }
];

const trails = [
  { id: "croom", name: "Croom", lat: 28.6, lon: -82.2 },
  { id: "carter-road", name: "Carter Road", lat: 27.9, lon: -82.0 },
  { id: "alafia", name: "Alafia", lat: 28.0, lon: -82.1 },
  { id: "santos-vortex", name: "Santos/Vortex", lat: 29.102, lon: -82.137 },
  { id: "49th-ave", name: "49th Ave Trailhead", lat: 29.0214, lon: -82.1811 },
];

// Trail features data
const trailFeatures = [
  {
    image: '/rocks.jpg',
    title: 'Diverse Terrain',
    description: 'Central Florida boasts a variety of landscapes, from the flat plains and rolling hills of North Central Florida to the unique terrain of old phosphate mines like Alafia River State Park.',
    type: 'Natural Features'
  },
  {
    image: '/trail10.jpg',
    title: 'Thriving Trail Systems',
    description: 'Several regions offer well-maintained and diverse trail systems, including the renowned Santos Trailhead near Ocala and the Alafia River State Park.',
    type: 'Trail Network'
  },
  {
    image: '/trail-1.jpg',
    title: 'Challenging and Scenic Trails',
    description: 'Trails range from beginner-friendly singletracks to more advanced, technical routes, catering to riders of all skill levels.',
    type: 'Trail Variety'
  },
  {
    image: '/trail3.jpg',
    title: 'Unique Experience',
    description: 'Unlike areas with dramatic elevation changes, Central Florida\'s mountain biking is characterized by its unique blend of natural beauty and the creative use of terrain, including the remnants of phosphate mining.',
    type: 'Local Character'
  }
];

// Trail tips data
const trailTips = [
  {
    title: 'Weather & Conditions',
    icon: '🌧️',
    tips: [
      'Trails can be extremely slick after rain - wait 24-48 hours after heavy rainfall',
      'Summer months (June-September) bring frequent afternoon thunderstorms - plan rides for early morning',
      'Best riding conditions are typically October through April',
      'Check trail conditions on local Facebook groups before heading out'
    ]
  },
  {
    title: 'Essential Gear',
    icon: '🛠️',
    tips: [
      'Bug spray is a must - mosquitoes and no-see-ums are prevalent year-round',
      'Carry plenty of water - Florida heat and humidity can be intense',
      'Consider a hydration pack with at least 2L capacity',
      'Basic repair kit including spare tube, pump, and chain tool'
    ]
  },
  {
    title: 'Trail Etiquette',
    icon: '🤝',
    tips: [
      'Yield to hikers and equestrians - announce your presence when approaching',
      'Stay on marked trails to protect sensitive ecosystems',
      'Pack out all trash, including energy bar wrappers',
      'Be mindful of wildlife - especially in areas with alligators'
    ]
  },
  {
    title: 'Safety Tips',
    icon: '⚠️',
    tips: [
      'Ride with a buddy when possible, especially on remote trails',
      'Carry a basic first aid kit and know basic trailside repairs',
      'Be aware of hunting seasons in wildlife management areas',
      'Check for trail closures during prescribed burns'
    ]
  },
  {
    title: 'Best Times to Ride',
    icon: '⏰',
    tips: [
      'Early morning rides (6-9am) offer the best conditions in summer',
      'Weekday rides typically mean less crowded trails',
      'Avoid peak heat hours (11am-3pm) during summer months',
      'Consider night rides during summer - many trails are open after dark'
    ]
  },
  {
    title: 'Local Knowledge',
    icon: '💡',
    tips: [
      'Join local MTB Facebook groups for real-time trail conditions',
      'Trail difficulty ratings can be misleading - check recent reviews',
      'Some trails require permits or have entry fees - check before you go',
      'Many trails have specific parking areas - arrive early on weekends'
    ]
  }
];

// Rules and guidelines data
const rulesAndGuidelines = [
  {
    title: 'Trail Access & Permits',
    icon: '🎫',
    rules: [
      'Most state parks require a daily entrance fee or annual pass',
      'Some trails in wildlife management areas require a hunting/fishing license or management area permit',
      'Respect trail hours - most trails are open from sunrise to sunset unless otherwise posted',
      'Check for trail closures during hunting seasons or prescribed burns'
    ]
  },
  {
    title: 'Trail Use Rules',
    icon: '🚵',
    rules: [
      'Stay on designated trails - no cutting switchbacks or creating new trails',
      'Ride in control and at safe speeds, especially around corners and other users',
      'Yield to hikers, equestrians, and uphill riders',
      'Announce your presence when approaching other trail users from behind'
    ]
  },
  {
    title: 'Environmental Protection',
    icon: '🌿',
    rules: [
      'Do not ride on wet or muddy trails - wait for them to dry',
      'Pack out all trash, including energy bar wrappers and water bottles',
      'Do not disturb wildlife or plant life',
      'Stay out of sensitive areas and respect trail markers'
    ]
  },
  {
    title: 'Group Riding Guidelines',
    icon: '👥',
    rules: [
      'Keep group sizes manageable (recommended max 6-8 riders)',
      'Wait at trail intersections for all group members',
      'Communicate trail conditions and obstacles to other riders',
      'Respect other trail users by not blocking the trail when stopped'
    ]
  },
  {
    title: 'Trail Maintenance',
    icon: '🛠️',
    rules: [
      'Report trail damage or hazards to local trail organizations',
      'Participate in trail work days when possible',
      'Do not modify trail features or create new obstacles',
      'Respect trail work and maintenance closures'
    ]
  },
  {
    title: 'Emergency & Safety',
    icon: '🚨',
    rules: [
      'Carry a basic first aid kit and know how to use it',
      'Have emergency contact information readily available',
      'Know the location of the nearest emergency services',
      'Report any accidents or incidents to trail management'
    ]
  },
  {
    title: 'Trail Etiquette',
    icon: '🤝',
    rules: [
      'Be friendly and courteous to all trail users',
      'Keep noise levels down, especially in residential areas',
      'Respect private property and stay on public trails',
      'Follow posted signs and trail markers'
    ]
  },
  {
    title: 'Equipment & Preparation',
    icon: '🚲',
    rules: [
      'Ensure your bike is in good working condition before each ride',
      'Wear appropriate safety gear (helmet, gloves, eye protection)',
      'Carry necessary tools and supplies for basic repairs',
      'Check weather conditions and trail status before riding'
    ]
  }
];

// Access and amenities data
const accessAndAmenities = [
  {
    title: 'Parking & Access',
    icon: '🅿️',
    features: [
      'Most trailheads have dedicated parking areas with clear signage',
      'Weekend mornings (8-11am) are typically the busiest times',
      'Some locations require a state park pass or daily entrance fee',
      'Arrive early on weekends to secure parking, especially at popular trails'
    ]
  },
  {
    title: 'Trailhead Facilities',
    icon: '🏠',
    features: [
      'Most major trailheads have restroom facilities',
      'Bike wash stations are common at popular trail systems',
      'Information kiosks with trail maps and current conditions',
      'Some locations offer bike repair stations with basic tools'
    ]
  },
  {
    title: 'On-Trail Amenities',
    icon: '🚰',
    features: [
      'Water fountains at main trailheads (bring your own water for longer rides)',
      'Benches and rest areas at scenic viewpoints',
      'Trail markers and difficulty indicators throughout the system',
      'Emergency contact information posted at trailheads'
    ]
  },
  {
    title: 'Nearby Services',
    icon: '🏪',
    features: [
      'Bike shops typically within 15-30 minutes of major trail systems',
      'Gas stations and convenience stores near most trailheads',
      'Restaurants and cafes in nearby towns',
      'Some locations have camping facilities nearby'
    ]
  },
  {
    title: 'Trail System Features',
    icon: '🗺️',
    features: [
      'Color-coded trail difficulty markers (green, blue, black)',
      'Bailout points and shortcut options on longer trails',
      'Trail maps available online and at trailheads',
      'Multiple entry/exit points at larger trail systems'
    ]
  },
  {
    title: 'Seasonal Considerations',
    icon: '🌤️',
    features: [
      'Trail conditions vary significantly with rainfall',
      'Summer months may have limited water availability',
      'Some trails close during hunting seasons',
      'Prescribed burns may affect trail access (check before visiting)'
    ]
  }
];

// Trail maps data
const trailMaps = [
  {
    name: 'Croom',
    image: '/images/croom/trailmap.png',
    description: 'Over 25 miles of diverse singletrack in the Withlacoochee State Forest',
    location: 'Brooksville, FL',
    difficulty: 'Beginner to Advanced',
    link: 'https://www.alltrails.com/parks/us/florida/withlacoochee-state-forest/croom'
  },
  {
    name: 'Alafia River State Park',
    image: '/images/alafia/AlafiaMap-10.jpeg',
    description: '20+ miles of purpose-built trails with progressive difficulty levels',
    location: 'Lithia, FL',
    difficulty: 'Beginner to Expert',
    link: 'https://www.alltrails.com/parks/us/florida/alafia-river-state-park'
  },
  {
    name: 'Santos/Vortex',
    image: '/images/santos/santosmap.png',
    description: "Florida's largest and most popular MTB destination, featuring 80+ miles of singletrack. The Santos Trailhead offers access to a wide range of trails for all skill levels. The Vortex area is famous for its technical features, jumps, and skills park. The 49th Ave Trailhead provides additional parking and direct access to the southern trail system.",
    location: 'Ocala, FL',
    difficulty: 'Beginner to Expert',
    link: 'https://www.alltrails.com/parks/us/florida/santos-trailhead'
  },
  {
    name: 'Carter Road',
    image: '/images/carter-road/cartermap.jpg',
    description: 'Scenic trails through pine forests and wetlands',
    location: 'Lakeland, FL',
    difficulty: 'Beginner to Intermediate',
    link: 'https://www.alltrails.com/trail/us/florida/carter-road-trail'
  },
  {
    name: 'Balm Boyette',
    image: '/images/balm-boyette/balmboyettemap.jpg',
    description: 'Technical trails with challenging features and elevation changes',
    location: 'Lithia, FL',
    difficulty: 'Intermediate to Expert',
    link: 'https://www.alltrails.com/trail/us/florida/balm-boyette-scrub-nature-preserve'
  },
  {
    name: 'Mount Dora',
    image: '/images/mount-dora/mtdoratrailmap.png',
    description: 'Urban trail system with technical features and elevation',
    location: 'Mount Dora, FL',
    difficulty: 'Beginner to Advanced',
    link: 'https://www.alltrails.com/trail/us/florida/mount-dora-trail'
  }
];

// Add rotation state for each map
const initialRotations: { [key: string]: number } = {
  '/images/croom/trailmap.png': 90,
  '/images/alafia/AlafiaMap-10.jpeg': 0,
  '/images/santos/santosmap.png': 270,
  '/images/carter-road/cartermap.jpg': 0,
  '/images/balm-boyette/balmboyettemap.jpg': 0,
  '/images/mount-dora/mountdoramap.png': 0,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMap, setSelectedMap] = useState<{ name: string; image: string } | null>(null);
  const [rotation, setRotation] = useState(0);

  const handleMapSelect = (map: { name: string; image: string }) => {
    setSelectedMap(map);
    setRotation(initialRotations[map.image] || 0);
  };

  const rotateMap = (direction: 'left' | 'right') => {
    setRotation(prev => (prev + (direction === 'left' ? -90 : 90)) % 360);
  };

  const downloadMap = async () => {
    if (!selectedMap) return;
    
    try {
      const response = await fetch(selectedMap.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedMap.name.toLowerCase().replace(/\s+/g, '-')}-trail-map${selectedMap.image.substring(selectedMap.image.lastIndexOf('.'))}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading map:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Map Modal */}
      {selectedMap && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMap(null)}
        >
          <div 
            className="relative max-w-7xl w-full max-h-[90vh] bg-gray-800 rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMap(null)}
              className="absolute top-4 right-4 text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex space-x-2 z-10">
              <button
                onClick={() => rotateMap('left')}
                className="text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700 transition-colors"
                title="Rotate left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button
                onClick={() => rotateMap('right')}
                className="text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700 transition-colors"
                title="Rotate right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={downloadMap}
                className="text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700 transition-colors"
                title="Download map"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>

            {/* Map Image */}
            <div className="relative w-full h-[80vh]">
              <div 
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <Image
                  src={selectedMap.image}
                  alt={`${selectedMap.name} trail map`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{selectedMap.name} Trail Map</h3>
              <span className="text-gray-300 text-sm">Click and drag to pan, use controls to rotate</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto  mt-15">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pt-20 min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          <BackgroundCarousel />
          <div className="relative z-10 text-center text-white px-2">
            <h1 className="text-5xl md:text-5xl font-bold mb-6">Central Florida</h1>
            <h1 className="text-5xl md:text-5xl font-bold mb-6">MTB Trails</h1>
            <p className="text-xl md:text-2xl mb-8">Discover the best mountain biking experiences</p>
            <Link 
              href="/trails"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors inline-block cursor-pointer"
            >
              Explore Trails
            </Link>
          </div>
        </section>

  {/* Stats Bar */}
  <div className="bg-gray-800 text-white pb-1 w-full">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <div>
              <div className="text-sm text-gray-400">Region</div>
              <div className="font-medium">Central Florida</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Trails</div>
              <div className="font-medium">10+</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Mileage</div>
              <div className="font-medium">100+ Miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Elevation Range</div>
              <div className="font-medium">0-600+ Feet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 w-full border-b border-gray-700">
        <div className="max-w-[90%] mx-auto px-4 md:px-8">
          <div className="flex items-center py-2">
            <div className="flex flex-grow space-x-8 text-gray-300 overflow-x-auto no-scrollbar">
              <Link 
                href="/trail-features"
                className={`inline-block whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Features
              </Link>
              <button 
                onClick={() => setActiveTab('beginner')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'beginner'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Tips
              </button>
              <button 
                onClick={() => setActiveTab('intermediate')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'intermediate'
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Rules & Guidelines
              </button>
              <button 
                onClick={() => setActiveTab('amenities')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'amenities'
                    ? 'bg-gray-800 text-white border-b-2 border-gray-300 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Access & Amenities
              </button>
              <button 
                onClick={() => setActiveTab('maps')}
                className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'maps'
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                Trail Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Intro Paragraph */}
          <div className="max-w-4xl mx-auto px-4 py-12 pt-20 mb-10 text-center">
            <h1 className="text-4xl font-bold mb-16">The Rundown</h1>
            <p className="text-gray-300 bg-gray-800 rounded-lg p-6 text-lg md:text-xl leading-relaxed">
              Welcome to Central Florida&apos;s premier mountain biking destination. From the rolling hills of Croom to the technical features of Alafia, our region offers diverse trails for every skill level. Whether you&apos;re seeking beginner-friendly flow trails or challenging technical routes, discover your next adventure in the heart of Florida&apos;s mountain biking scene.
            </p>
          </div>

          {/* Trail Features Section */}
          <section className="py-16 w-full bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-white text-center mb-12">Trail Features</h2>
              <TrailFeatures features={trailFeatures} />
            </div>
          </section>

          {/* Maps */}
          <section className="relative w-full mb-10 overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="w-full">
              <MultiTrailMap trails={trails} />
            </div>
          </section>
        </>
      )}

      {activeTab === 'beginner' && (
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Central Florida Trail Tips</h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Essential knowledge for riding Central Florida&apos;s trails. From weather conditions to local etiquette, 
              these tips will help you make the most of your mountain biking experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trailTips.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
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
        </section>
      )}

      {activeTab === 'intermediate' && (
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Trail Rules & Guidelines</h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Following these rules and guidelines helps maintain trail access, protects the environment, 
              and ensures a positive experience for all trail users. These guidelines are essential for 
              preserving our trails for future generations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rulesAndGuidelines.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIdx) => (
                      <li key={ruleIdx} className="text-gray-300 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gray-800/50 rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Remember</h3>
              <p className="text-gray-300 text-center">
                These rules and guidelines are in place to protect both riders and the trails. 
                By following them, you help maintain trail access and ensure a positive experience 
                for everyone. When in doubt, always err on the side of caution and respect for 
                the trail and other users.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'amenities' && (
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Trail Access & Amenities</h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Central Florida&apos;s trail systems offer a range of facilities and amenities to enhance your riding experience. 
              While specific features may vary by location, these are common across most trail systems in the region.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessAndAmenities.map((category, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="text-gray-300 flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gray-800/50 rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Before You Go</h3>
              <p className="text-gray-300 text-center">
                While these amenities are common across Central Florida trails, it&apos;s always best to check the specific 
                trail system&apos;s website or social media for current conditions and available facilities. Some amenities 
                may be seasonal or temporarily unavailable due to maintenance or weather conditions.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'maps' && (
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Central Florida Trail Maps</h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Explore the major mountain biking trail systems in Central Florida. Each trail system offers unique 
              features and challenges, from beginner-friendly loops to expert-level technical trails.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trailMaps.map((trail, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={trail.image}
                      alt={`${trail.name} trail map`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{trail.name}</h3>
                    <p className="text-gray-300 mb-4">{trail.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2">📍</span>
                        <span>{trail.location}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2">🚵</span>
                        <span>{trail.difficulty}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMapSelect({ name: trail.name, image: trail.image })}
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      View Full Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gray-800/50 rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4 text-center">About the Maps</h3>
              <p className="text-gray-300 text-center">
                Click on any trail map to view a larger version. These maps are regularly updated by local trail 
                organizations. For the most current trail conditions and detailed information, visit the specific 
                trail system&apos;s website or social media pages.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Video Section */}
      <section className="py-8 w-full mt-8 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Experience the Thrill</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video w-full mx-auto shadow-2xl overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ojMvLUjlmKQ?si=ci0GCMZqyme0Jbdz" 
                title="YouTube video player" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="relative aspect-video w-full mx-auto shadow-2xl rounded-lg overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/QLtqDpgK6dg?si=7VPkkd1RH6ifElsR" 
                title="YouTube video player" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trails Section */}
      <section className="py-20 w-full bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Featured Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTrails.map((trail) => (
              <div key={trail.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-60">
                  {trail.image && (
                    <Image
                      src={trail.image}
                      alt={trail.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 font-bold mb-2">{trail.name}</h3>
                  <p className="text-gray-600 mb-4">{trail.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${
                      trail.difficulty === 'Beginner' ? 'bg-green-600' :
                      trail.difficulty === 'Intermediate' ? 'bg-blue-600' :
                      trail.difficulty === 'Advanced' ? 'bg-orange-600' :
                      'bg-red-600'
                    }`}>
                      {trail.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">Length: {trail.length}</span>
                  </div>
                  <Link 
                    href={`/trails/${trail.slug}`}
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    View Trail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 w-full bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit the Trails?</h2>
          <p className="text-xl mb-8">Join our community of mountain bikers and discover new adventures every day.</p>
          <Link href="/trails" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors inline-block">
            Browse All Trails
          </Link>
        </div>
      </section>
    </div>
  </main>
);
}
