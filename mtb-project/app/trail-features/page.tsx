import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Diverse Terrain',
    video: 'https://www.youtube.com/embed/CHlEgfr0A_4?si=OOKrT_48moozOh4N',
    alt: 'Diverse Terrain',
    desc: `Central Florida boasts a variety of landscapes, from the flat plains and rolling hills of North Central Florida to the unique terrain of old phosphate mines like Alafia River State Park.`
  },
  {
    title: 'Thriving Trail Systems',
    img: '/features/systems.jpg',
    alt: 'Thriving Trail Systems',
    desc: `Several regions offer well-maintained and diverse trail systems, including the renowned Santos Trailhead near Ocala and the Alafia River State Park.`
  },
  {
    title: 'Challenging and Scenic Trails',
    img: '/features/challenging.jpg',
    alt: 'Challenging and Scenic Trails',
    desc: `Trails range from beginner-friendly singletracks to more advanced, technical routes, catering to riders of all skill levels.`
  },
  {
    title: 'Unique Experience',
    img: '/features/unique.jpg',
    alt: 'Unique Experience',
    desc: `Unlike areas with dramatic elevation changes, Central Florida's mountain biking is characterized by its unique blend of natural beauty and the creative use of terrain, including the remnants of phosphate mining.`
  },
];

export default function TrailFeaturesPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Trail Features of Central Florida</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <div className="relative w-full h-48 mb-6 rounded overflow-hidden">
                {feature.video ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={feature.video}
                    title={feature.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                ) : feature.img ? (
                  <Image
                    src={feature.img}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-lg text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 