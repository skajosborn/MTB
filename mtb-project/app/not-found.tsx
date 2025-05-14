"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl px-4">
        Oops! The trail you&apos;re looking for seems to have wandered off the map.
      </p>
      <Link 
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
      >
        Back to Home Trail
      </Link>
    </div>
  );
} 