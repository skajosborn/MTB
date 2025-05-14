'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Props = {
    lat: number;
    lon: number;
    name: string;
  };
  
  export default function TrailMap({ lat, lon, name }: Props) {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/outdoors-v12');

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: mapStyle,
      center: [lat, lon], // Example coords for Balm Boyette
      zoom: 13,
      pitch: mapStyle.includes('3d') ? 60 : 0,
      bearing: -17.6,
      antialias: true,
    });

    map.on('load', () => {
      // DEM source for 3D terrain
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      if (mapStyle.includes('3d')) {
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        map.addLayer({
          id: 'hillshade',
          type: 'hillshade',
          source: 'mapbox-dem',
          layout: {},
          paint: {},
        });
      }

      new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .setPopup(new mapboxgl.Popup().setText(name))
      .addTo(map);
    });

    return () => map.remove();
  }, [mapStyle]);

  return (
    <div>
      <div className="flex justify-center gap-4 mb-2">
        <button onClick={() => setMapStyle('mapbox://styles/mapbox/outdoors-v12')}>2D Map</button>
        <button onClick={() => setMapStyle('mapbox://styles/mapbox/satellite-streets-v12-3d')}>3D Map</button>
      </div>
      <div ref={mapContainerRef} className="w-full h-[500px]" />
    </div>
  );
}