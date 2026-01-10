'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

type Props = {
  lat: number;
  lon: number;
  name: string;
};

export default function TrailMap({ lat, lon, name }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/outdoors-v12');
  const [is3D, setIs3D] = useState(false);
  const [loadingDirections, setLoadingDirections] = useState(false);

  const getDirections = useCallback(async () => {
    if (!mapRef.current) return;
    
    setLoadingDirections(true);
    
    // Get user location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLon = position.coords.longitude;
      const userLat = position.coords.latitude;

      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${userLon},${userLat};${lon},${lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: 'GET' }
        );
        const json = await query.json();
        
        if (json.routes && json.routes[0]) {
          const data = json.routes[0];
          const route = data.geometry.coordinates;
          const geojson: GeoJSON.Feature = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          };

          // If the route source already exists, update it
          if (mapRef.current?.getSource('route')) {
            (mapRef.current.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
          } else {
            mapRef.current?.addSource('route', {
              type: 'geojson',
              data: geojson,
            });

            mapRef.current?.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3b82f6',
                'line-width': 5,
                'line-opacity': 0.75,
              },
            });
          }

          // Fit map to route
          const bounds = new mapboxgl.LngLatBounds();
          route.forEach((coord: [number, number]) => bounds.extend(coord));
          mapRef.current?.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      } finally {
        setLoadingDirections(false);
      }
    }, (error) => {
      console.error('Error getting location:', error);
      setLoadingDirections(false);
      alert('Please enable location services to get directions.');
    });
  }, [lat, lon]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token is missing.');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [lon, lat],
      zoom: 13,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? -17.6 : 0,
      antialias: true,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add terrain source
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      // Add sky layer
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

      if (is3D) {
        map.setTerrain({ 
          source: 'mapbox-dem',
          exaggeration: 1.5
        });
        
        map.addLayer({
          id: 'hillshading',
          source: 'mapbox-dem',
          type: 'hillshade',
          paint: {
            'hillshade-illumination-anchor': 'viewport',
            'hillshade-exaggeration': 0.5,
          },
        });
      }

      // Add marker
      new mapboxgl.Marker({ color: '#16a34a' })
        .setLngLat([lon, lat])
        .setPopup(new mapboxgl.Popup().setText(name))
        .addTo(map);
    });

    return () => map.remove();
  }, [lat, lon, name, mapStyle, is3D]);

  const toggle2D = () => {
    setMapStyle('mapbox://styles/mapbox/outdoors-v12');
    setIs3D(false);
  };

  const toggle3D = () => {
    setMapStyle('mapbox://styles/mapbox/satellite-v9');
    setIs3D(true);
  };

  return (
    <div className="space-y-4">
      {!MAPBOX_TOKEN ? (
        <div className="w-full h-[400px] bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700">
          <div className="text-center p-6">
            <p className="text-gray-400 mb-2 font-medium">Map unavailable</p>
            <p className="text-sm text-gray-500">Please set your Mapbox token in .env.local</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${!is3D ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={toggle2D}
            >
              2D Outdoors
            </button>
            <button
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${is3D ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={toggle3D}
            >
              3D Satellite
            </button>
            <button
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center gap-2 ${loadingDirections ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={getDirections}
              disabled={loadingDirections}
            >
              {loadingDirections ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </>
              )}
            </button>
          </div>
          <div 
            ref={mapContainerRef} 
            className="w-full h-[400px] md:h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50" 
          />
        </>
      )}
    </div>
  );
}