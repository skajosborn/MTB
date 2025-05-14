"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
  location: string;
}

export default function LeafletMap({ latitude, longitude, location }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current && !mapRef.current) {
      // Fix for the missing icon issue
      const icon = L.icon({
        iconUrl: '/marker-icon.png',
        iconRetinaUrl: '/marker-icon-2x.png',
        shadowUrl: '/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = icon;

      // Initialize map
      mapRef.current = L.map(containerRef.current).setView([latitude, longitude], 13);

      // Add OpenStreetMap tiles
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add ESRI Satellite tiles
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });

      // Add layer control
      const baseMaps = {
        "Map": osmLayer,
        "Satellite": satelliteLayer
      };

      L.control.layers(baseMaps).addTo(mapRef.current);

      // Add marker
      L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(location)
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, location]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div 
        ref={containerRef} 
        style={{ height: '350px', width: '100%' }}
        className="relative bg-gray-800"
      />
      <div className="text-xs text-gray-400 text-center mt-1 bg-gray-800 py-1">
        <a 
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
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