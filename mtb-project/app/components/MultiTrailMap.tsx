import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Trail = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

type Props = {
  trails: Trail[];
};

export default function MultiTrailMap({ trails }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/outdoors-v12');
  const [is3D, setIs3D] = useState(false);

  // Calculate center as average of all trail coordinates
  const avgLat = trails.reduce((sum, t) => sum + t.lat, 0) / trails.length;
  const avgLon = trails.reduce((sum, t) => sum + t.lon, 0) / trails.length;

  // Initialize map only once
  useEffect(() => {
    if (mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: mapStyle,
      center: [avgLon, avgLat],
      zoom: 8,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? -17.6 : 0,
      antialias: true,
    });
    mapRef.current = map;

    map.on('load', () => {
      // Add terrain and sky layers for 3D
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
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
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
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
      // Add markers for all trails
      trails.forEach(trail => {
        new mapboxgl.Marker()
          .setLngLat([trail.lon, trail.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<a href="/trails/${trail.id}" style="color:#16a34a;font-weight:bold;">${trail.name}</a>`))
          .addTo(map);
      });
      // Add directions control (optional)
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken || '',
        unit: 'metric',
        profile: 'mapbox/cycling',
      });
      map.addControl(directions, 'top-left');
      // Fit bounds to all markers
      if (trails.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        trails.forEach(trail => bounds.extend([trail.lon, trail.lat]));
        map.fitBounds(bounds, { padding: 60 });
      }
    });
    return () => map.remove();
    // eslint-disable-next-line
  }, []); // Only run once on mount

  // Handle style/3D toggle (re-style and re-add layers/terrain)
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(mapStyle);
    mapRef.current.once('styledata', () => {
      // Re-add terrain and sky layers if 3D
      mapRef.current!.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      mapRef.current!.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });
      if (is3D) {
        mapRef.current!.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        mapRef.current!.addLayer({
          id: 'hillshading',
          source: 'mapbox-dem',
          type: 'hillshade',
          paint: {
            'hillshade-illumination-anchor': 'viewport',
            'hillshade-exaggeration': 0.5,
          },
        });
      }
      // Re-add markers
      trails.forEach(trail => {
        new mapboxgl.Marker()
          .setLngLat([trail.lon, trail.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<a href="/trails/${trail.id}" style="color:#16a34a;font-weight:bold;">${trail.name}</a>`))
          .addTo(mapRef.current!);
      });
      // Fit bounds again
      if (trails.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        trails.forEach(trail => bounds.extend([trail.lon, trail.lat]));
        mapRef.current!.fitBounds(bounds, { padding: 60 });
      }
    });
    // eslint-disable-next-line
  }, [mapStyle, is3D]);

  const toggle2D = () => {
    setMapStyle('mapbox://styles/mapbox/outdoors-v12');
    setIs3D(false);
  };
  const toggle3D = () => {
    setMapStyle('mapbox://styles/mapbox/satellite-v9');
    setIs3D(true);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 shadow-lg mt-20 max-w-4xl mx-auto">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 text-white rounded transition-colors ${!is3D ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'}`}
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
