import { FC } from 'react';

interface WeatherDisplayProps {
  location: string;
}

const WeatherDisplay: FC<WeatherDisplayProps> = ({ location }) => {
  const weatherMetrics = [
    { label: "Temperature", value: "--°F" },
    { label: "Conditions", value: "--" },
    { label: "Humidity", value: "--%"},
    { label: "Wind", value: "-- mph" }
  ];

  return (
    <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-white">Weather Information</h3>
      <div className="space-y-4 text-gray-200">
        <p>Weather information for {location} will be displayed here once enabled.</p>
        <div className="grid grid-cols-2 gap-4">
          {weatherMetrics.map((metric) => (
            <div key={metric.label} className="bg-gray-500 rounded-lg p-4">
              <h4 className="font-semibold mb-2">{metric.label}</h4>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xl md:text-2xl text-gray-200">Experience Florida&apos;s Natural Beauty</p>
      </div>
    </div>
  );
};

export default WeatherDisplay; 