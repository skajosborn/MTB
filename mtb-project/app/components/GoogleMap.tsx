'use client';

import { useState } from 'react';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  location: string;
}

export default function GoogleMap({ latitude, longitude, location }: GoogleMapProps) {
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
        {['DRIVING', 'WALKING', 'BICYCLING'].map(mode => (
          <button
            key={mode}
            onClick={() => setTravelMode(mode as any)}
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


// "use client";

// import { useEffect, useRef, useState } from 'react';

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface GoogleMapProps {
//   latitude: number;
//   longitude: number;
//   location: string;
// }

// export default function GoogleMap({ latitude, longitude, location }: GoogleMapProps) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const mapInstanceRef = useRef<any>(null);
//   const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'BICYCLING'>('DRIVING');
//   const directionsRendererRef = useRef<any>(null);

//   useEffect(() => {
//     let attempts = 0;
//     const maxAttempts = 10;
    
//     const initMap = () => {
//       if (!mapRef.current) return;

//       try {
//         if (typeof window.google === 'undefined') {
//           if (attempts < maxAttempts) {
//             attempts++;
//             setTimeout(initMap, 1000);
//             return;
//           }
//           setError('Google Maps failed to load');
//           setIsLoading(false);
//           return;
//         }

//         // Clean up previous DirectionsRenderer
//         if (directionsRendererRef.current) {
//           directionsRendererRef.current.setMap(null);
//           directionsRendererRef.current = null;
//         }
//         // Clean up previous map instance
//         if (mapInstanceRef.current) {
//           mapInstanceRef.current = null;
//         }
//         // Clear the map container's inner HTML
//         if (mapRef.current) {
//           mapRef.current.innerHTML = '';
//         }

//         const position = { lat: latitude, lng: longitude };
        
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: position,
//           zoom: 14,
//           mapTypeId: 'terrain',
//           mapTypeControlOptions: {
//             mapTypeIds: ['terrain', 'satellite']
//           }
//         });

//         mapInstanceRef.current = map;

//         new window.google.maps.Marker({
//           map,
//           position,
//           title: location,
//         });

//         setIsLoading(false);
//         setError(null);

//         // Try to get user's location and show directions
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition((pos) => {
//             const userLat = pos.coords.latitude;
//             const userLng = pos.coords.longitude;

//             const directionsService = new window.google.maps.DirectionsService();
//             const directionsRenderer = new window.google.maps.DirectionsRenderer();
//             directionsRenderer.setMap(map);

//             directionsRendererRef.current = directionsRenderer;

//             directionsService.route(
//               {
//                 origin: { lat: userLat, lng: userLng },
//                 destination: { lat: latitude, lng: longitude },
//                 travelMode: window.google.maps.TravelMode[travelMode],
//               },
//               (result: any, status: any) => {
//                 if (status === 'OK' && result) {
//                   directionsRenderer.setDirections(result);
//                 } else {
//                   alert('Directions request failed: ' + status);
//                 }
//               }
//             );
//           });
//         }
//       } catch (err) {
//         console.error('Error initializing map:', err);
//         setError('Failed to initialize map');
//         setIsLoading(false);
//       }
//     };

//     initMap();

//     return () => {
//       if (directionsRendererRef.current) {
//         directionsRendererRef.current.setMap(null);
//         directionsRendererRef.current = null;
//       }
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current = null;
//       }
//       if (mapRef.current) {
//         mapRef.current.innerHTML = '';
//       }
//     };
//   }, [latitude, longitude, location, travelMode]);

//   const handleGetDirections = () => {
//     window.open('https://maps.app.goo.gl/2D3MFD2tb5gxtaqs8', '_blank');
//   };

//   if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
//     return (
//       <div className="rounded-lg overflow-hidden shadow-lg">
//         <div className="h-[350px] bg-gray-800 flex items-center justify-center text-gray-400">
//           <div className="text-center">
//             <p>Google Maps API key is missing</p>
//             <p className="text-sm mt-2">Please check your API key configuration</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg overflow-hidden shadow-lg">
//       <div className="flex gap-2 mb-2">
//         <button
//           onClick={() => setTravelMode('DRIVING')}
//           className={travelMode === 'DRIVING' ? 'bg-blue-700 text-white px-2 py-1 rounded' : 'bg-gray-300 px-2 py-1 rounded'}
//         >
//           Driving
//         </button>
//         <button
//           onClick={() => setTravelMode('WALKING')}
//           className={travelMode === 'WALKING' ? 'bg-blue-700 text-white px-2 py-1 rounded' : 'bg-gray-300 px-2 py-1 rounded'}
//         >
//           Walking
//         </button>
//         <button
//           onClick={() => setTravelMode('BICYCLING')}
//           className={travelMode === 'BICYCLING' ? 'bg-blue-700 text-white px-2 py-1 rounded' : 'bg-gray-300 px-2 py-1 rounded'}
//         >
//           Bicycling
//         </button>
//       </div>
//       <div 
//         ref={mapRef} 
//         style={{ height: '350px', width: '100%' }}
//         className="relative bg-gray-800"
//       >
//         {isLoading && (
//           <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//           </div>
//         )}
//         {error && (
//           <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-400">
//             <div className="text-center">
//               <p>{error}</p>
//               <p className="text-sm mt-2">Please check your API key configuration</p>
//               <p className="text-xs mt-1">Make sure the Maps JavaScript API is enabled in Google Cloud Console</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="text-xs text-gray-400 text-center mt-1 bg-gray-800 py-1">
//         <a 
//           href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="hover:text-blue-400 transition-colors"
//         >
//           View Larger Map
//         </a>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           className="px-4 py-2 text-white rounded bg-green-700 hover:bg-green-800"
//           onClick={handleGetDirections}
//         >
//           Get Directions
//         </button>
//       </div>
//     </div>
//   );
// } 