import React from 'react';

export type TrailAmenity = {
  icon: React.ReactNode | string; // Can be an emoji, SVG, or image path
  label: string;
  description?: string;
};

type TrailAmenitiesProps = {
  amenities: TrailAmenity[];
  title?: string;
};

export default function TrailAmenities({ amenities, title = "Available Amenities" }: TrailAmenitiesProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity, idx) => (
          <div key={idx} className="flex items-center bg-gray-800 rounded-lg p-4 shadow">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4 text-2xl">
              {typeof amenity.icon === 'string' && amenity.icon.startsWith('/') ? (
                <img src={amenity.icon} alt={amenity.label} className="w-6 h-6" />
              ) : (
                amenity.icon
              )}
            </div>
            <div>
              <div className="text-white font-medium">{amenity.label}</div>
              {amenity.description && <div className="text-gray-400 text-sm">{amenity.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}