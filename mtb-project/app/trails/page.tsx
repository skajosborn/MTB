import Image from 'next/image';
import Link from 'next/link';

// Define trail data
const trails = [
  {
    slug: 'croom',
    name: 'Croom',
    difficulty: 'Advanced',
    location: 'Brooksville, Florida',
    image: '/images/croom/croom2.jpg',
    description: 'An extensive network of mountain biking trails with a variety of terrain from flowing singletrack to technical sections.'
  },
  {
    slug: 'balm-boyette',
    name: 'Balm Boyette',
    difficulty: 'Expert',
    location: 'Lithia, Florida',
    image: '/good4.jpg',
    description: 'Technical trails with challenging features and elevation changes in the Balm Boyette Scrub Nature Preserve.'
  },
  {
    slug: 'santos-vortex',
    name: 'Santos/Vortex',
    difficulty: 'Intermediate',
    location: 'Ocala, Florida',
    image: '/images/santos/santos1.jpg',
    description: "Florida's largest and most popular MTB destination, featuring 80+ miles of singletrack with trails for all skill levels."
  },
  {
    slug: 'mount-dora',
    name: 'Mount Dora',
    difficulty: 'Advanced',
    location: 'Mount Dora, Florida',
    image: '/good3.jpg',
    description: 'Urban trail system with technical features and elevation changes in the heart of Mount Dora.'
  },
  {
    slug: 'alafia',
    name: 'Alafia',
    difficulty: 'Intermediate',
    location: 'Lithia, Florida',
    image: '/good2.jpg',
    description: '20+ miles of purpose-built trails with progressive difficulty levels in Alafia River State Park.'
  },
  {
    slug: 'loyce-harpe',
    name: 'Loyce E. Harpe',
    difficulty: 'Beginner',
    location: 'Mulberry, Florida',
    image: '/good9.jpg',
    description: 'A network of flowing singletrack trails perfect for riders of all skill levels in the Loyce E. Harpe Park.'
  },
  {
    slug: 'carter-road',
    name: 'Carter Road',
    difficulty: 'Intermediate',
    location: 'Citrus Wildlife Management Area, Florida',
    image: '/bike.jpg',
    description: 'A unique riding experience through Florida swamplands with wooden boardwalks and diverse ecosystems.'
  },
  {
    slug: '49th-ave',
    name: '49th Ave Trailhead',
    difficulty: 'Advanced',
    location: 'Ocala, Florida',
    image: '/magestic.jpg',
    description: 'Southern access point to the Santos trail system with direct entry to the southern trails and less crowded sections.'
  }
];

export default function TrailsDirectory() {
  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">Mountain Bike Trails Directory</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the most exciting mountain bike trails from around the world. 
            Click on any trail to view detailed information, maps, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trails.map((trail) => (
            <Link 
              href={`/trails/${trail.slug}`} 
              key={trail.slug}
              className="block transition-transform duration-300 hover:scale-105 focus:outline-none"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <div className="relative h-56">
                  <Image
                    src={trail.image}
                    alt={trail.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-xl font-bold text-white">{trail.name}</h2>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`
                          text-xs px-2 py-1 rounded-full mr-2 text-white
                          ${trail.difficulty === 'Beginner' ? 'bg-green-600' :
                            trail.difficulty === 'Intermediate' ? 'bg-blue-600' :
                            trail.difficulty === 'Advanced' ? 'bg-orange-600' :
                            'bg-red-600'}
                        `}
                      >
                        {trail.difficulty}
                      </span>
                      <span className="text-sm text-white">{trail.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-gray-600">{trail.description}</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Trail Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 