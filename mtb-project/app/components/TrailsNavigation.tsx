"use client";

import React from 'react';
import Link from 'next/link';

// Trail data
const trails = [
  { name: "Croom", slug: "croom", difficulty: "Advanced" },
  { name: "Slickrock Trail", slug: "slickrock-trail", difficulty: "Advanced" },
  { name: "Whole Enchilada", slug: "whole-enchilada", difficulty: "Expert" },
  { name: "McKenzie River Trail", slug: "mckenzie-river-trail", difficulty: "Intermediate" },
  { name: "Porcupine Rim", slug: "porcupine-rim", difficulty: "Advanced" },
  { name: "The Flume Trail", slug: "the-flume-trail", difficulty: "Intermediate" },
  { name: "18 Road", slug: "18-road", difficulty: "Beginner" },
  { name: "Captain Ahab", slug: "captain-ahab", difficulty: "Expert" },
  { name: "Doctor Park", slug: "doctor-park", difficulty: "Advanced" },
];

interface TrailsNavigationProps {
  currentTrail?: string;
}

export default function TrailsNavigation({ currentTrail }: TrailsNavigationProps) {
  // Group trails by difficulty
  const beginnerTrails = trails.filter(trail => trail.difficulty === "Beginner");
  const intermediateTrails = trails.filter(trail => trail.difficulty === "Intermediate");
  const advancedTrails = trails.filter(trail => trail.difficulty === "Advanced");
  const expertTrails = trails.filter(trail => trail.difficulty === "Expert");

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">All Mountain Bike Trails</h2>
        <p className="text-center text-gray-600 mb-8">
          Explore trails based on difficulty level. Currently viewing: 
          <span className="font-semibold ml-1">{currentTrail || "All Trails"}</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Beginner Trails */}
          <div className="border-t-4 border-green-500 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 py-2 px-4">
              <h3 className="text-lg font-bold text-white">Beginner Trails</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {beginnerTrails.length > 0 ? (
                  beginnerTrails.map(trail => (
                    <li key={trail.slug}>
                      <Link 
                        href={`/trails/${trail.slug}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          currentTrail === trail.name 
                            ? 'bg-green-100 font-semibold' 
                            : 'hover:bg-green-50'
                        }`}
                      >
                        {trail.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No beginner trails available</li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Intermediate Trails */}
          <div className="border-t-4 border-blue-500 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-500 py-2 px-4">
              <h3 className="text-lg font-bold text-white">Intermediate Trails</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {intermediateTrails.length > 0 ? (
                  intermediateTrails.map(trail => (
                    <li key={trail.slug}>
                      <Link 
                        href={`/trails/${trail.slug}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          currentTrail === trail.name 
                            ? 'bg-blue-100 font-semibold' 
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        {trail.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No intermediate trails available</li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Advanced Trails */}
          <div className="border-t-4 border-orange-500 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-orange-500 py-2 px-4">
              <h3 className="text-lg font-bold text-white">Advanced Trails</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {advancedTrails.length > 0 ? (
                  advancedTrails.map(trail => (
                    <li key={trail.slug}>
                      <Link 
                        href={`/trails/${trail.slug}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          currentTrail === trail.name 
                            ? 'bg-orange-100 font-semibold' 
                            : 'hover:bg-orange-50'
                        }`}
                      >
                        {trail.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No advanced trails available</li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Expert Trails */}
          <div className="border-t-4 border-red-500 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-red-500 py-2 px-4">
              <h3 className="text-lg font-bold text-white">Expert Trails</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {expertTrails.length > 0 ? (
                  expertTrails.map(trail => (
                    <li key={trail.slug}>
                      <Link 
                        href={`/trails/${trail.slug}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          currentTrail === trail.name 
                            ? 'bg-red-100 font-semibold' 
                            : 'hover:bg-red-50'
                        }`}
                      >
                        {trail.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No expert trails available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 