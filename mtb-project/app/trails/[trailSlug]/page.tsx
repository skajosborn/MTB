"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Define a type for trail data
type TrailData = {
  name: string;
  difficulty: string;
  location: string;
  length: string;
  elevationGain: string;
  description: string;
  image: string;
  mapUrl: string;
  videoUrl?: string;
}

// Define a type for our trails dictionary
type TrailsDataType = {
  [key: string]: TrailData;
}

// Trail data (in a real app, this would come from an API or database)
const trailsData: TrailsDataType = {
  'croom': {
    name: 'Croom',
    difficulty: 'Advanced',
    location: 'Withlacoochee State Forest, Brooksville, Florida',
    length: '50+ miles',
    elevationGain: '600+ feet',
    description: 'Croom Mountain Bike Trail Park, nestled within Florida\'s Withlacoochee State Forest, offers over 50 miles of diverse singletrack trails. Managed by the SWAMP Mountain Bike Club, the park features a variety of terrains, including rolling hills, pine flatwoods, and challenging sections with steep climbs and technical features. The trail system is designed to cater to riders of all skill levels, from beginners to seasoned experts.',
    image: '/slickrock.jpg',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14048.609155217813!2d-82.30127323022462!3d28.542212200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e840c22da7b915%3A0xb79b2387345f868a!2sCroom%20Motorcycle%20Area!5e0!3m2!1sen!2sus!4v1717528158099!5m2!1sen!2sus',
    videoUrl: 'https://www.youtube.com/embed/Scn0QcNs_mM?si=AqL_B7441WRrYDYF'
  },
  'slickrock-trail': {
    name: 'Slickrock Trail',
    difficulty: 'Advanced',
    location: 'Moab, Utah',
    length: '11.3 miles',
    elevationGain: '1,800 feet',
    description: 'The Slickrock Trail is one of the most famous mountain bike rides in the world, consisting of a 10.5-mile loop across Navajo sandstone. The trail surface provides excellent traction even when wet.',
    image: '/slickrock.jpg',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199230.0768760121!2d-109.63969837500002!3d38.57379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8747e1e59ab82d8d%3A0xb2901a25a3dc570!2sSlickrock%20Bike%20Trail!5e0!3m2!1sen!2sus'
  },
  'whole-enchilada': {
    name: 'The Whole Enchilada',
    difficulty: 'Expert',
    location: 'Moab, Utah',
    length: '33.0 miles',
    elevationGain: '7,800 feet',
    description: 'The Whole Enchilada is an epic trail that begins in the high alpine terrain of the La Sal Mountains and descends over 7,000 feet through diverse ecosystems to the Colorado River. It\'s considered one of the best long-distance mountain bike trails in the world.',
    image: '/enchilada.jpg',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25165.30154741546!2d-109.29870467910155!3d38.515626000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8747e1a8aaaaaaab%3A0x70c3ca371c35bac0!2sThe%20Whole%20Enchilada!5e0!3m2!1sen'
  },
  // Add more trail data as needed
};

// Default data for trails not in our database
const defaultTrailData: TrailData = {
  name: 'Trail Information',
  difficulty: 'Unknown',
  location: 'Location not specified',
  length: 'Not specified',
  elevationGain: 'Not specified',
  description: 'Detailed information about this trail is coming soon. Please check back later for updates on trail conditions, features, and recommendations.',
  image: '/trail-default.jpg',
  mapUrl: ''
};

// Render the Croom trail sections specifically
const renderCroomSections = (slug: string) => {
  if (slug !== 'croom') return null;
  
  return (
    <div className="mt-8 space-y-10">
      {/* Beginner Trails Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">🟢</span>
          </div>
          <h3 className="text-2xl font-bold">Beginner-Friendly Trails</h3>
        </div>
        <div className="space-y-3 ml-11">
          <div>
            <p className="font-semibold">South Blue Trail</p>
            <p className="text-gray-600">An easy trail ideal for newcomers, featuring flat terrain and gentle curves.</p>
          </div>
          <div>
            <p className="font-semibold">Northwest Blue Trail</p>
            <p className="text-gray-600">Another beginner-friendly option with minimal elevation changes and a smooth path.</p>
          </div>
          <div>
            <p className="font-semibold">Southwest Blue Trail</p>
            <p className="text-gray-600">Offers a relaxed ride through scenic areas, perfect for those new to mountain biking.</p>
          </div>
        </div>
      </div>

      {/* Intermediate Trails Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">🟡</span>
          </div>
          <h3 className="text-2xl font-bold">Intermediate Trails</h3>
        </div>
        <div className="space-y-3 ml-11">
          <div>
            <p className="font-semibold">Yellow Trail (12-mile loop)</p>
            <p className="text-gray-600">Starting at the Tucker Hill trailhead, this loop is well-marked and popular among riders seeking a moderate challenge.</p>
          </div>
          <div>
            <p className="font-semibold">Southeast Blue Trail</p>
            <p className="text-gray-600">Provides a mix of rolling terrain and mild technical sections, suitable for riders looking to advance their skills.</p>
          </div>
          <div>
            <p className="font-semibold">Sugar Mountain Loop</p>
            <p className="text-gray-600">Features undulating paths and varied scenery, offering an engaging ride for intermediate bikers.</p>
          </div>
        </div>
      </div>

      {/* Advanced Trails Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">🔴</span>
          </div>
          <h3 className="text-2xl font-bold">Advanced Trails</h3>
        </div>
        <div className="space-y-3 ml-11">
          <div>
            <p className="font-semibold">Drunken Monkey</p>
            <p className="text-gray-600">A short but demanding trail with technical features that test even experienced riders.</p>
          </div>
          <div>
            <p className="font-semibold">Southern Comfort</p>
            <p className="text-gray-600">Known for its challenging climbs and descents, this trail offers a rigorous workout.</p>
          </div>
          <div>
            <p className="font-semibold">Bootlegger Hill</p>
            <p className="text-gray-600">Features steep gradients and sharp turns, requiring advanced bike handling skills.</p>
          </div>
        </div>
      </div>

      {/* Trail Access & Amenities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">📍</span>
          </div>
          <h3 className="text-2xl font-bold">Trail Access & Amenities</h3>
        </div>
        <div className="space-y-3 ml-11">
          <div>
            <p className="font-semibold">Primary Trailhead</p>
            <p className="text-gray-600">Tucker Hill Day Use Area on Croom Road (Forest Road 6), equipped with restrooms, picnic areas, and a bike wash station.</p>
          </div>
          <div>
            <p className="font-semibold">Trail Markings</p>
            <p className="text-gray-600">Color-coded signs (yellow, blue, red) indicate trail difficulty and loops.</p>
          </div>
          <div>
            <p className="font-semibold">Bailout Points</p>
            <p className="text-gray-600">Strategically placed along longer loops for riders needing shorter routes.</p>
          </div>
          <div>
            <p className="font-semibold">Fees</p>
            <p className="text-gray-600">A nominal parking fee is required; annual passes are available.</p>
          </div>
        </div>
      </div>

      {/* Trail Maintenance & Community */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">🛠️</span>
          </div>
          <h3 className="text-2xl font-bold">Trail Maintenance & Community</h3>
        </div>
        <div className="ml-11">
          <p className="text-gray-600">The SWAMP Mountain Bike Club actively maintains the trail system, ensuring trails are safe and enjoyable. They also host events and group rides, fostering a vibrant mountain biking community.</p>
        </div>
      </div>
    </div>
  );
};

export default function TrailPage() {
  const params = useParams();
  const [trailData, setTrailData] = useState<TrailData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get the trail slug from the URL
    const { trailSlug } = params;
    const slug = trailSlug as string;
    
    // Simulate loading delay
    setTimeout(() => {
      // Look up trail data, use default if not found
      const data = slug in trailsData ? trailsData[slug] : {
        ...defaultTrailData,
        name: slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      };
      
      setTrailData(data);
      setLoading(false);
    }, 300);
  }, [params]);
  
  if (loading || !trailData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading trail information...</p>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-green-600 hover:text-green-800">
            ← Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96">
            {trailData?.image && (
              <Image 
                src={trailData.image}
                alt={trailData.name}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-white text-3xl md:text-4xl font-bold">{trailData.name}</h1>
                <div className="flex items-center mt-2">
                  <span 
                    className={`
                      inline-block px-3 py-1 rounded-full text-sm font-medium text-white
                      ${trailData.difficulty === 'Beginner' ? 'bg-green-600' :
                        trailData.difficulty === 'Intermediate' ? 'bg-blue-600' :
                        trailData.difficulty === 'Advanced' ? 'bg-orange-600' :
                        'bg-red-600'}
                    `}
                  >
                    {trailData.difficulty}
                  </span>
                  <span className="ml-3 text-white">{trailData.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trail Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {/* Left Column - Trail Stats */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Trail Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Length:</span>
                    <span className="font-medium">{trailData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elevation Gain:</span>
                    <span className="font-medium">{trailData.elevationGain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span 
                      className={`
                        px-2 py-0.5 rounded text-xs font-medium text-white
                        ${trailData.difficulty === 'Beginner' ? 'bg-green-600' :
                          trailData.difficulty === 'Intermediate' ? 'bg-blue-600' :
                          trailData.difficulty === 'Advanced' ? 'bg-orange-600' :
                          'bg-red-600'}
                      `}
                    >
                      {trailData.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Description and Map */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Trail Overview</h2>
              <p className="text-gray-700 mb-6">{trailData.description}</p>
              
              {/* YouTube Video (if available) */}
              {trailData.videoUrl && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Trail Video</h3>
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={trailData.videoUrl}
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
              )}
              
              {trailData.mapUrl && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Trail Location</h3>
                  <div className="h-96 rounded-lg overflow-hidden">
                    <iframe
                      src={trailData.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              )}
              
              {/* Render Croom-specific trail sections */}
              {renderCroomSections(params.trailSlug as string)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 