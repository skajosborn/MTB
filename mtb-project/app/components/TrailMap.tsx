'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Props = {
    lat: number;
    lon: number;
    name: string;
  };
  
  export default function TrailMap({ lat, lon, name }: Props) {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/outdoors-v12');
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: mapStyle,
      center: [lon, lat],
      zoom: 13,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? -17.6 : 0,
      antialias: true,
    });

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
      new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .setPopup(new mapboxgl.Popup().setText(name))
        .addTo(map);

      // Add directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling',
      });
      map.addControl(directions, 'top-left');
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
    <div>
      <div className="flex justify-center gap-4 mb-2">
        <button
          className={`px-4 py-2 text-white rounded transition-colors ${!is3D ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={toggle2D}
        >
          2D Map
        </button>
        <button
          className={`px-4 py-2 text-white rounded transition-colors ${is3D ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={toggle3D}
        >
          3D Satellite
        </button>
      </div>
      <div ref={mapContainerRef} className="w-full h-[500px] rounded-lg" />
    </div>
  );
}