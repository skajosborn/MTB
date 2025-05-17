'use client';

type Trail = {
  name: string;
  length: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
};

type TrailDifficultyProps = {
  trails: Trail[];
};

const DIFFICULTY_META = {
  Beginner: {
    description: 'Perfect for new riders',
    color: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-500',
    explanation: 'Wide, well-maintained paths with minimal obstacles. Perfect for learning basic mountain biking skills.',
  },
  Intermediate: {
    description: 'For experienced riders',
    color: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-500',
    explanation: 'Narrower paths with moderate obstacles, some technical features, and occasional steep sections.',
  },
  Advanced: {
    description: 'For advanced riders',
    color: 'bg-red-600',
    text: 'text-red-600',
    border: 'border-red-500',
    explanation: 'Challenging trails with technical features, steep grades, and complex obstacles requiring advanced skills.',
  },
  Expert: {
    description: 'For expert riders',
    color: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    explanation: 'Highly technical trail, steep grades, complex and intricate obstacles requiring expert skills, steep jumps.'
  }
};

function groupByDifficulty(trails: Trail[]) {
  const levels: Array<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'> = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  return levels.map(level => ({
    title: level,
    description: DIFFICULTY_META[level].description,
    color: DIFFICULTY_META[level].color,
    text: DIFFICULTY_META[level].text,
    border: DIFFICULTY_META[level].border,
    explanation: DIFFICULTY_META[level].explanation,
    trails: trails.filter(t => t.level === level),
  }));
}

export default function TrailDifficulty({ trails }: TrailDifficultyProps) {
  if (!trails || trails.length === 0) return null;
  const levels = groupByDifficulty(trails);
  return (
    <div className="flex flex-col space-y-6">
      {levels.map((level, index) => (
        <div key={index} className={`rounded-lg p-4 border-l-8 ${level.border} bg-gray-700 shadow-md`}>
          <div className="flex flex-col mb-2">
            <span className={`px-3 py-1 rounded text-white font-semibold text-lg ${level.color} mr-3 inline-block w-fit`}>{level.title}</span>
            <span className="text-gray-200 text-base mt-2">{level.description}</span>
          </div>
          <div className="text-gray-400 text-sm mb-2">{level.explanation}</div>
          <ul className="list-disc pl-6 text-gray-100">
            {level.trails.map((trail, trailIndex) => (
              <li key={trailIndex} className="mb-1">
                <span className="font-medium text-white">{trail.name}</span> <span className="text-gray-400">({trail.length})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
} 