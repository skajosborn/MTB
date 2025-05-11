import Image from "next/image";
import { BackgroundCarousel } from "./components/BackgroundCarousel";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <BackgroundCarousel />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Ride the Trails</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the best mountain biking experiences</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Explore Trails
          </button>
        </div>
      </section>

      {/* Featured Trails Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((trail) => (
              <div key={trail} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/trail-${trail}.jpg`}
                    alt={`Trail ${trail}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Trail Name {trail}</h3>
                  <p className="text-gray-600 mb-4">Experience the thrill of this amazing trail with stunning views and challenging terrain.</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Difficulty: Intermediate</span>
                    <span>Length: 5.2 miles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit the Trails?</h2>
          <p className="text-xl mb-8">Join our community of mountain bikers and discover new adventures every day.</p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
