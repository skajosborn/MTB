'use client'

import Image from "next/image";
import { BackgroundCarousel } from "./components/BackgroundCarousel";
import Link from "next/link";
import RadialMenu, { RadialMenuItem } from "@/app/components/RadialMenu";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
  { id: "croom", label: "Croom" },
  { id: "carter-road", label: "Carter Road" },
  { id: "alafia", label: "Alafia" },
  // ...add more trails
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const menuItems: RadialMenuItem[] = trails.map(trail => ({
    id: trail.id,
    label: trail.label,
    onClick: () => router.push(`/trails/${trail.id}`),
  }));

  const handleMenuOpen = () => {
    const rect = menuButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.bottom + window.scrollY + 20, // 20px below the button
      });
      setMenuOpen(true);
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setMenuPosition(null);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto h-186 mt-24 mb-4 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
        <BackgroundCarousel />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Central FLorida</h1>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">MTB Trails</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the best mountain biking experiences</p>
          <Link 
            href="/trails"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block cursor-pointer"
          >
            Explore Trails
          </Link>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Experience the Thrill</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video w-full mx-auto shadow-2xl rounded-lg overflow-hidden">
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Featured Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTrails.map((trail) => (
              <div key={trail.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-60">
                  <Image
                    src={trail.image}
                    alt={trail.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
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
      <section className="py-20 px-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit the Trails?</h2>
          <p className="text-xl mb-8">Join our community of mountain bikers and discover new adventures every day.</p>
          <Link href="/trails" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors inline-block">
            Browse All Trails
          </Link>
        </div>
      </section>
    </main>
  );
}
