"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Combine trail data into one list
const trails = [
  { name: "Croom", difficulty: "Advanced" },
  { name: "Balm Boyette", difficulty: "Expert" },
  { name: "Santos & Vortex", difficulty: "Intermediate" },
  { name: "Mount Dora", difficulty: "Advanced" },
  { name: "Alafia", difficulty: "Intermediate" },
  { name: "Carter Road", difficulty: "Intermediate" },
  { name: "49th Ave Trailhead", difficulty: "Advanced" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [trailsMenuOpen, setTrailsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center justify-center sm:hidden">
              {/* Mobile menu button*/}
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                <svg className={`${mobileMenuOpen ? "hidden" : "block"} size-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/* Icon when menu is open. */}
                <svg className={`${mobileMenuOpen ? "block" : "hidden"} size-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <Image
                    src="/bikeicon.png"
                    alt="Bike Icon"
                    width={48}
                    height={48}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 h-full items-center">
                  <Link href="/" className="rounded-md bg-gray-900 px-3 py-2 text-base font-bold text-gradient from-gray-300 via-green-700 to-gray-500" aria-current="page">
                    CENFLO MTB CONNECTION
                  </Link>
                  
                  {/* Trails Menu Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={handleTrailsMenuEnter}
                    onMouseLeave={handleTrailsMenuLeave}
                    ref={trailsMenuRef}
                  >
                    <Link
                      href="/trails"
                      className="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center cursor-pointer"
                      aria-expanded={trailsMenuOpen}
                      onClick={() => setTrailsMenuOpen(false)}
                      tabIndex={0}
                      onMouseDown={e => e.stopPropagation()}
                    >
                      MTB Trails
                      <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </Link>
                    
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
                            <Link 
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
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/trails/buy-sell-trade" className="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Buy/Sell/Trade</Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="size-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-8">
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
                    <Image 
                      className="size-12 rounded-full" 
                      width={52} 
                      height={52} 
                      src="/usergreen.png" 
                      alt="User profile" 
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</Link>
                    <Link href="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {mobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link href="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">
                Home
              </Link>
              <Link href="/trails" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Trails Directory
              </Link>
              <Link href="/trails/buy-sell-trade" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                Buy/Sell/Trade
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
