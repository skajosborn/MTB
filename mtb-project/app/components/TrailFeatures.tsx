import Image from 'next/image';

export type TrailFeature = {
  image: string;
  title: string;
  description: string;
  type: string;
};

type TrailFeaturesProps = {
  features: TrailFeature[];
};

export default function TrailFeatures({ features }: TrailFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105">
          <div className="relative h-56">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <span>Feature Type: {feature.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
