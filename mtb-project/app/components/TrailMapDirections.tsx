import React from 'react';

export type DirectionSection = {
  heading: string;
  text: string;
};

type TrailMapDirectionsProps = {
  mapTitle: string;
  mapEmbedUrl: string;
  directionsTitle: string;
  directions: DirectionSection[];
  googleMapsLink: string;
};

export default function TrailMapDirections({
  mapTitle,
  mapEmbedUrl,
  directionsTitle,
  directions,
  googleMapsLink,
}: TrailMapDirectionsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
          <span className="text-white text-xl">🗺️</span>
        </div>
        <h2 className="text-3xl font-bold text-white">Maps & Directions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map */}
        <div>
          <h3 className="text-3xl font-bold text-white mt-10 mb-10">{mapTitle}</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Directions */}
        <div>
          <h3 className="text-3xl font-bold text-white mt-10 mb-10">{directionsTitle}</h3>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="space-y-4">
              {directions.map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-300">{section.heading}</h4>
                  <p className="text-gray-400">{section.text}</p>
                </div>
              ))}
              <div className="pt-3 flex justify-center">
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Get Directions in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 