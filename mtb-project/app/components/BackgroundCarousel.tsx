"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/magestic.jpg',
  '/good2.jpg',
  '/trail4.jpg',
  '/bike.jpg',
  '/bridge4.jpg',
  '/bridge20.jpg',
  '/rocks.jpg',
  '/trail7.jpg'
];

export function BackgroundCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Prepare next image
      const next = (currentImageIndex + 1) % images.length;
      setNextImageIndex(next);
      setIsTransitioning(true);
      
      // After a short delay, complete the transition
      setTimeout(() => {
        setCurrentImageIndex(next);
        setIsTransitioning(false);
      }, 2000); // Match this with the CSS transition duration
      
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentImageIndex]);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Current Image */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 2s ease-in-out",
          zIndex: 1
        }}
      >
        <Image
          src={images[currentImageIndex]}
          alt={`Background ${currentImageIndex + 1}`}
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      
      {/* Next Image (Always Underneath) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0
        }}
      >
        <Image
          src={images[nextImageIndex]}
          alt={`Background ${nextImageIndex + 1}`}
          fill
          className="object-cover brightness-50"
        />
      </div>
    </div>
  );
} 