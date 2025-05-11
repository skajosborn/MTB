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
    slug: 'whole-enchilada',
    name: 'The Whole Enchilada',
    difficulty: 'Expert',
    location: 'Moab, Utah',
    image: '/enchilada.jpg',
    description: 'An epic trail that begins in the high alpine terrain of the La Sal Mountains and descends over 7,000 feet.'
  },
  {
    slug: 'mckenzie-river-trail',
    name: 'McKenzie River Trail',
    difficulty: 'Intermediate',
    location: 'Eugene, OR',
    image: '/trail4.jpg',
    description: 'A 26-mile singletrack trail following the McKenzie River through ancient forest and lava flows.'
  },
  {
    slug: 'porcupine-rim',
    name: 'Porcupine Rim',
    difficulty: 'Advanced',
    location: 'Moab, Utah',
    image: '/good3.jpg',
    description: 'A challenging trail with technical terrain and breathtaking views of Castle Valley.'
  },
  {
    slug: 'the-flume-trail',
    name: 'The Flume Trail',
    difficulty: 'Intermediate',
    location: 'Lake Tahoe, NV',
    image: '/good2.jpg',
    description: 'Famous for its stunning views of Lake Tahoe and narrow singletrack along a mountain ledge.'
  },
  {
    slug: '18-road',
    name: '18 Road',
    difficulty: 'Beginner',
    location: 'Fruita, CO',
    image: '/good9.jpg',
    description: 'A network of flowing singletrack trails perfect for riders of all skill levels.'
  },
  {
    slug: 'captain-ahab',
    name: 'Captain Ahab',
    difficulty: 'Expert',
    location: 'Moab, Utah',
    image: '/bike.jpg',
    description: 'Technical descending with ledges, drops, and challenging rock features.'
  },
  {
    slug: 'doctor-park',
    name: 'Doctor Park',
    difficulty: 'Advanced',
    location: 'Crested Butte, CO',
    image: '/magestic.jpg',
    description: 'A classic Colorado trail with fast, flowing singletrack through aspen groves and dense forest.'
  }
];

export default function TrailsDirectory() {
  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mountain Bike Trails Directory</h1>
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