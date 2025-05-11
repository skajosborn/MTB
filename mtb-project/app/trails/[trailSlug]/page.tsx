"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Trail data (in a real app, this would come from an API or database)
const trailsData = {
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
const defaultTrailData = {
  name: 'Trail Information',
  difficulty: 'Unknown',
  location: 'Location not specified',
  length: 'Not specified',
  elevationGain: 'Not specified',
  description: 'Detailed information about this trail is coming soon. Please check back later for updates on trail conditions, features, and recommendations.',
  image: '/trail-default.jpg',
  mapUrl: ''
};

export default function TrailPage() {
  const params = useParams();
  const [trailData, setTrailData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get the trail slug from the URL
    const { trailSlug } = params;
    
    // Simulate loading delay
    setTimeout(() => {
      // Look up trail data, use default if not found
      const data = trailsData[trailSlug as string] || {
        ...defaultTrailData,
        name: (trailSlug as string).split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      };
      
      setTrailData(data);
      setLoading(false);
    }, 300);
  }, [params]);
  
  if (loading) {
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
            {trailData.image && (
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 