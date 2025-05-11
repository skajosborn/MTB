"use client";

import Image from 'next/image';
import Link from 'next/link';
import TrailsNavigation from '../../components/TrailsNavigation';
import TrailSidebar from '../../components/TrailSidebar';

export default function CroomTrailPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Main Content with Sidebar */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Sidebar */}
        <TrailSidebar currentTrail="Croom" />

        {/* Main Content */}
        <div className="md:w-3/4 p-6">
          {/* Header and Video Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold text-white">Croom Trails</h1>
              <div className="bg-orange-500 px-4 py-1 rounded-full text-white font-semibold">
                Advanced Difficulty
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-6">Explore Florida's premier mountain biking destination</p>
            
            {/* Featured Video */}
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.youtube.com/embed/Scn0QcNs_mM?si=AqL_B7441WRrYDYF"
                width="100%"
                height="100%"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Trail Info Section */}
          <section className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-white">About Croom</h2>
                <p className="text-gray-300 mb-4">
                  The Croom Motorcycle Area offers an extensive network of mountain biking trails with a variety of terrain. 
                  From flowing singletrack to technical sections, these trails provide great riding experiences for 
                  mountain bikers in central Florida.
                </p>
                <p className="text-gray-300 mb-4">
                  Located in the Withlacoochee State Forest, Croom features over 25 miles of trails through pine forests 
                  and challenging sandy terrain. The area is known for its unique landscape featuring small hills and 
                  varied topography unusual for Florida.
                </p>
                <p className="text-gray-300 mb-6">
                  Riders of all skill levels can find appropriate trails, though advanced riders will particularly 
                  enjoy the technical sections and occasional obstacles.
                </p>
              </div>

              <div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 text-white">Trail Details</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-300">Location</h4>
                      <p className="text-gray-400">Brooksville, Florida</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Length</h4>
                      <p className="text-gray-400">25+ miles of trails</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Elevation Gain</h4>
                      <p className="text-gray-400">Approximately 600 feet</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Difficulty</h4>
                      <p className="text-gray-400">Advanced (with some intermediate sections)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Best Time to Visit</h4>
                      <p className="text-gray-400">October through April (cooler months)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300">Parking</h4>
                      <p className="text-gray-400">Available at the trailhead with day-use fee</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3 text-white">Trail Location</h3>
                  <div className="h-56 rounded-lg overflow-hidden shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14048.609155217813!2d-82.30127323022462!3d28.542212200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e840c22da7b915%3A0xb79b2387345f868a!2sCroom%20Motorcycle%20Area!5e0!3m2!1sen!2sus!4v1717528158099!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Image Gallery */}
          <section className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Croom Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* You would need to add actual images to your public folder */}
              <div className="rounded-lg overflow-hidden shadow-sm border border-gray-700">
                <Image 
                  src="/images/croom/croom2.jpg" 
                  alt="Croom trail view" 
                  width={400} 
                  height={300}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Placeholder images - replace with actual Croom images */}
              <div className="rounded-lg overflow-hidden shadow-sm border border-gray-700">
                <Image 
                  src="/good2.jpg" 
                  alt="Croom trail view" 
                  width={400} 
                  height={300}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm border border-gray-700">
                <Image 
                  src="/good3.jpg" 
                  alt="Croom trail view" 
                  width={400} 
                  height={300}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-green-600 text-white rounded-lg shadow-md p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Ride Croom?</h2>
            <p className="text-lg mb-6">Grab your bike and helmet and experience some of Florida's best trails.</p>
            <Link href="/trails" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-full transition-colors">
              Explore More Trails
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
