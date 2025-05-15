'use client';

type Trail = {
  name: string;
  length: string;
};

type DifficultyLevel = {
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  trails: Trail[];
  explanation: string;
};

const difficultyLevels: DifficultyLevel[] = [
  {
    title: 'Beginner',
    description: 'Perfect for new riders',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    trails: [
      { name: 'Pine Needle Loop', length: '1.2 miles' },
      { name: 'Cypress Trail', length: '0.8 miles' },
      { name: 'Nature Walk', length: '1.5 miles' },
      { name: 'Boardwalk Trail', length: '0.5 miles' },
    ],
    explanation: 'Wide, well-maintained paths with minimal obstacles. Perfect for learning basic mountain biking skills.'
  },
  {
    title: 'Intermediate',
    description: 'For experienced riders',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    trails: [
      { name: 'Ridge Runner', length: '2.5 miles' },
      { name: 'Swamp Connect', length: '1.8 miles' },
      { name: 'Oak Hammock', length: '2.0 miles' },
      { name: 'Palmetto Pass', length: '1.7 miles' },
    ],
    explanation: 'Narrower paths with moderate obstacles, some technical features, and occasional steep sections.'
  },
  {
    title: 'Advanced',
    description: 'For expert riders',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    trails: [
      { name: 'Technical Loop', length: '3.0 miles' },
      { name: 'Rock Garden', length: '1.2 miles' },
      { name: 'Root Run', length: '2.2 miles' },
      { name: 'Challenge Trail', length: '2.8 miles' },
    ],
    explanation: 'Challenging trails with technical features, steep grades, and complex obstacles requiring advanced skills.'
  },
];

export default function TrailDifficulty() {
  return (
    <div className="flex space-x-2">
      {difficultyLevels.map((level, index) => (
        <div key={index} className="relative group">
          <div className={`${level.color} rounded px-3 py-2 cursor-pointer transition-all duration-300 ${level.hoverColor}`}>
            <span className="text-white font-medium">{level.title}</span>
          </div>
          <div className="absolute z-50 hidden group-hover:block w-64 bg-gray-800 rounded-lg mt-2 p-4 shadow-lg right-0">
            <h5 className="text-white font-semibold mb-3">Available Trails:</h5>
            <ul className="space-y-3 text-gray-300">
              {level.trails.map((trail, trailIndex) => (
                <li key={trailIndex} className="flex items-center">
                  <span className={`w-2 h-2 ${level.color} rounded-full mr-2`}></span>
                  {trail.name} ({trail.length})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
} 