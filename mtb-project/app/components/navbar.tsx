"use client";

import React, { useState, useRef, useEffect } from 'react';

// Combine trail data into one list
const trails = [
  { name: "Slickrock Trail", difficulty: "Advanced" },
  { name: "Whole Enchilada", difficulty: "Expert" },
  { name: "McKenzie River Trail", difficulty: "Intermediate" },
  { name: "Porcupine Rim", difficulty: "Advanced" },
  { name: "The Flume Trail", difficulty: "Intermediate" },
  { name: "18 Road", difficulty: "Beginner" },
  { name: "Captain Ahab", difficulty: "Expert" },
  { name: "Doctor Park", difficulty: "Advanced" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [trailsMenuOpen, setTrailsMenuOpen] = useState(false);
  const trailsMenuRef = useRef<HTMLDivElement | null>(null);
  
  // Add a delay timer for the dropdown
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle mouse enter for the dropdown
  const handleTrailsMenuEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setTrailsMenuOpen(true);
  };

  // Handle mouse leave with delay
  const handleTrailsMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTrailsMenuOpen(false);
    }, 300); // 300ms delay before closing
  };

  // Click handler for the button
  const toggleTrailsMenu = () => {
    setTrailsMenuOpen(!trailsMenuOpen);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (trailsMenuRef.current && !trailsMenuRef.current.contains(event.target as Node)) {
        setTrailsMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trailsMenuRef]);

  return (
    <>
      <nav className="bg-black opacity-80 fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center justify-center sm:hidden">
              {/* Mobile menu button*/}
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/*
                  Icon when menu is closed.

                  Menu open: "hidden", Menu closed: "block"
                */}
                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/*
                  Icon when menu is open.

                  Menu open: "block", Menu closed: "hidden"
                */}
                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  src="/bikeicon.png"
                  alt="Bike Icon"
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 h-full items-center">
                  <a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-base font-bold text-white" aria-current="page">CENFLO MTB CONNECTION</a>
                  <a href="/trails" className="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Trails Directory</a>
                  
                  {/* Trails Menu Dropdown */}
                  <div 
                    className="relative" 
                    onMouseEnter={handleTrailsMenuEnter}
                    onMouseLeave={handleTrailsMenuLeave}
                    ref={trailsMenuRef}
                  >
                    <button 
                      className="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                      onClick={toggleTrailsMenu}
                      aria-expanded={trailsMenuOpen}
                    >
                      Mountain Bike Trails
                      <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute left-0 mt-2 w-64 bg-black bg-opacity-90 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${
                        trailsMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                      }`}
                      onMouseEnter={handleTrailsMenuEnter} 
                      onMouseLeave={handleTrailsMenuLeave}
                    >
                      <div className="py-2 px-3">
                        <div className="space-y-1">
                          {trails.map((trail) => (
                            <a 
                              key={trail.name}
                              href={`/trails/${trail.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className={`
                                block px-3 py-2 rounded text-white hover:bg-gray-700 transition-colors
                                ${trail.difficulty === 'Beginner' ? 'border-l-4 border-green-500' : 
                                  trail.difficulty === 'Intermediate' ? 'border-l-4 border-blue-500' : 
                                  trail.difficulty === 'Advanced' ? 'border-l-4 border-orange-500' : 
                                  'border-l-4 border-red-500'} 
                                cursor-pointer hover:translate-x-1 transition-transform duration-200
                              `}
                              onClick={() => setTrailsMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                <span className="hover:underline">{trail.name}</span>
                                <span className={`ml-auto text-xs px-2 py-1 rounded-full 
                                  ${trail.difficulty === 'Beginner' ? 'bg-green-700' : 
                                    trail.difficulty === 'Intermediate' ? 'bg-blue-700' : 
                                    trail.difficulty === 'Advanced' ? 'bg-orange-700' : 
                                    'bg-red-700'}`}>
                                  {trail.difficulty}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <a href="#" className="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button 
                    type="button" 
                    className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" 
                    id="user-menu-button" 
                    aria-expanded={isOpen} 
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div>

                {/*
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                */}
                {isOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    {/* Active: "bg-gray-100 outline-hidden", Not Active: "" */}
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
          </div>
        </div>
      </nav>
    </>
  );
}
