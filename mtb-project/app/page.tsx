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
  // ...add more trails
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

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-screen-2xl mx-auto  mt-15">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pt-20 min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          <BackgroundCarousel />
          <div className="relative z-10 text-center text-white px-2">
            <h1 className="text-5xl md:text-5xl font-bold mb-6">Central FLorida</h1>
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
              <Link href="/trail-features" passHref legacyBehavior>
                <button 
                  className={`whitespace-nowrap px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'overview' 
                      ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg' 
                      : 'hover:bg-gray-800/50 hover:text-white'
                  } cursor-pointer`}
                >
                  Trail Features
                </button>
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
                Access & Amenities
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
              these tips will help you make the most of your mountain biking experience in the region.
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
