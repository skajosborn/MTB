"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Trail data - this could be moved to a shared data file later
const trails = [
  { name: "Croom", slug: "croom", difficulty: "Advanced" },
  { name: "Carter Road", slug: "carter-road", difficulty: "Intermediate" },
  { name: "Slickrock Trail", slug: "slickrock-trail", difficulty: "Advanced" },
  { name: "Whole Enchilada", slug: "whole-enchilada", difficulty: "Expert" },
  { name: "McKenzie River Trail", slug: "mckenzie-river-trail", difficulty: "Intermediate" },
  { name: "Porcupine Rim", slug: "porcupine-rim", difficulty: "Advanced" },
  { name: "The Flume Trail", slug: "the-flume-trail", difficulty: "Intermediate" },
  { name: "18 Road", slug: "18-road", difficulty: "Beginner" },
  { name: "Captain Ahab", slug: "captain-ahab", difficulty: "Expert" },
  { name: "Doctor Park", slug: "doctor-park", difficulty: "Advanced" },
  { name: "Alafia", slug: "alafia", difficulty: "Intermediate" },
  { name: "49th Ave Trailhead", slug: "49th-ave", difficulty: "Advanced" },
];

interface TrailSidebarProps {
  currentTrail?: string;
}

export default function TrailSidebar({ currentTrail }: TrailSidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Group trails by difficulty
  const beginnerTrails = trails.filter(trail => trail.difficulty === "Beginner");
  const intermediateTrails = trails.filter(trail => trail.difficulty === "Intermediate");
  const advancedTrails = trails.filter(trail => trail.difficulty === "Advanced");
  const expertTrails = trails.filter(trail => trail.difficulty === "Expert");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="md:hidden fixed z-30 bottom-6 right-6">
        <button
          onClick={toggleMenu}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Toggle trail navigation"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <aside 
        className={`
          text-white z-20 transition-all duration-300 ease-in-out
          md:w-1/4 md:static md:block md:h-screen md:sticky md:top-20 md:overflow-y-auto
          fixed inset-y-0 left-0 w-4/5 h-full overflow-y-auto
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-black/20
        `}
      >
        {/* Content div */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 md:mb-4">
            <h2 className="text-xl font-bold">All Trails</h2>
            <button 
              onClick={toggleMenu} 
              className="md:hidden text-white"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="border-b border-gray-700 mb-6"></div>
          
          {/* Beginner Trails */}
          <div className="mb-6">
            <h3 className="font-bold text-green-400 mb-2 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Beginner Trails
            </h3>
            <ul className="space-y-2 pl-5">
              {beginnerTrails.length > 0 ? (
                beginnerTrails.map(trail => (
                  <li key={trail.slug}>
                    <Link 
                      href={`/trails/${trail.slug}`} 
                      className={`block py-1 ${
                        currentTrail === trail.name 
                          ? "font-semibold text-green-300" 
                          : "text-gray-300 hover:text-green-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {trail.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 italic">No beginner trails available</li>
              )}
            </ul>
          </div>
          
          {/* Intermediate Trails */}
          <div className="mb-6">
            <h3 className="font-bold text-blue-400 mb-2 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Intermediate Trails
            </h3>
            <ul className="space-y-2 pl-5">
              {intermediateTrails.length > 0 ? (
                intermediateTrails.map(trail => (
                  <li key={trail.slug}>
                    <Link 
                      href={`/trails/${trail.slug}`} 
                      className={`block py-1 ${
                        currentTrail === trail.name 
                          ? "font-semibold text-blue-300" 
                          : "text-gray-300 hover:text-blue-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {trail.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 italic">No intermediate trails available</li>
              )}
            </ul>
          </div>
          
          {/* Advanced Trails */}
          <div className="mb-6">
            <h3 className="font-bold text-orange-400 mb-2 flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Advanced Trails
            </h3>
            <ul className="space-y-2 pl-5">
              {advancedTrails.length > 0 ? (
                advancedTrails.map(trail => (
                  <li key={trail.slug}>
                    <Link 
                      href={`/trails/${trail.slug}`} 
                      className={`block py-1 ${
                        currentTrail === trail.name 
                          ? "font-semibold text-orange-300" 
                          : "text-gray-300 hover:text-orange-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {trail.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 italic">No advanced trails available</li>
              )}
            </ul>
          </div>
          
          {/* Expert Trails */}
          <div className="mb-6">
            <h3 className="font-bold text-red-400 mb-2 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Expert Trails
            </h3>
            <ul className="space-y-2 pl-5">
              {expertTrails.length > 0 ? (
                expertTrails.map(trail => (
                  <li key={trail.slug}>
                    <Link 
                      href={`/trails/${trail.slug}`} 
                      className={`block py-1 ${
                        currentTrail === trail.name 
                          ? "font-semibold text-red-300" 
                          : "text-gray-300 hover:text-red-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {trail.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 italic">No expert trails available</li>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
} 