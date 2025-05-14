"use client";

import Image from 'next/image';

export default function BuySellTradePage() {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-900">
      <div className="relative w-full max-w-2xl aspect-square">
        <Image
          src="/comingsoon.png"
          alt="Coming Soon"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 text-center">
        Buy/Sell/Trade Coming Soon
      </h1>
      <p className="text-xl text-gray-300 mt-4 text-center max-w-2xl px-4">
        We&apos;re working on building a marketplace for the Central Florida mountain biking community.
        Check back soon!
      </p>
    </div>
  );
} 