'use client';

import { useState } from 'react';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  // location: string;
}

export default function GoogleMap({ latitude, longitude }: GoogleMapProps) {
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'BICYCLING'>('DRIVING');

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="flex gap-2 mb-2">
        {(['DRIVING', 'WALKING', 'BICYCLING'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setTravelMode(mode)}
            className={
              travelMode === mode
                ? 'bg-blue-700 text-white px-2 py-1 rounded'
                : 'bg-gray-300 px-2 py-1 rounded'
            }
          >
            {mode.charAt(0) + mode.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <iframe
        src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=My+Location&destination=${latitude},${longitude}&mode=${travelMode.toLowerCase()}`}
        width="100%"
        height="450"
        allowFullScreen
        loading="lazy"
        style={{ border: 0, marginBottom: '16px' }}
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Directions"
      ></iframe>

      <div className="text-xs text-gray-400 text-center mt-1 bg-gray-800 py-1">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=${travelMode.toLowerCase()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          View in Full Google Maps
        </a>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 text-white rounded bg-green-700 hover:bg-green-800"
          onClick={handleGetDirections}
        >
          Get Directions
        </button>
      </div>
    </div>
  );
}
