"use client";

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  location: string;
}

export default function GoogleMap({ latitude, longitude, location }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const initMap = () => {
      if (!mapRef.current) return;

      try {
        if (typeof window.google === 'undefined') {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(initMap, 1000);
            return;
          }
          setError('Google Maps failed to load');
          setIsLoading(false);
          return;
        }

        // Clean up previous instance if it exists
        if (mapInstanceRef.current) {
          return;
        }

        const position = { lat: latitude, lng: longitude };
        
        const map = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 14,
          mapTypeId: 'terrain',
          mapTypeControlOptions: {
            mapTypeIds: ['terrain', 'satellite']
          }
        });

        mapInstanceRef.current = map;

        new window.google.maps.Marker({
          map,
          position,
          title: location,
        });

        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, location]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="rounded-lg overflow-hidden shadow-lg">
        <div className="h-[350px] bg-gray-800 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p>Google Maps API key is missing</p>
            <p className="text-sm mt-2">Please check your API key configuration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div 
        ref={mapRef} 
        style={{ height: '350px', width: '100%' }}
        className="relative bg-gray-800"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p>{error}</p>
              <p className="text-sm mt-2">Please check your API key configuration</p>
              <p className="text-xs mt-1">Make sure the Maps JavaScript API is enabled in Google Cloud Console</p>
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-400 text-center mt-1 bg-gray-800 py-1">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          View Larger Map
        </a>
      </div>
    </div>
  );
} 