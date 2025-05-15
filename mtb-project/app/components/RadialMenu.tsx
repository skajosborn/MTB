import { useState } from 'react';

const amenities = [
  { icon: '🅿️', label: 'Free Parking', color: 'text-white' },
  { icon: '🚻', label: 'Restrooms', color: 'text-white' },
  { icon: '🪑', label: 'Picnic Tables', color: 'text-white' },
  { icon: '🚰', label: 'Water Available', color: 'text-white' },
  { icon: '💰', label: 'Free Entry', color: 'text-white' },
];

const restrictions = [
  { icon: '🐕', label: 'No Dogs', color: 'text-white' },
  { icon: '🌙', label: 'No Night Riding', color: 'text-white' },
  { icon: '🚫', label: 'No Motorized Vehicles', color: 'text-white' },
];

function DropdownRadialMenu({ items, label, color, iconAbove }: { items: typeof amenities, label: string, color: string, iconAbove: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const radius = 120; // Slightly larger circle to accommodate bigger elements
  const angleStep = (2 * Math.PI) / items.length;

  return (
    <div
      className="relative flex flex-col items-center mx-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ minWidth: 100 }}
    >
      {/* Icon above button */}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl text-white drop-shadow-lg select-none pointer-events-none">
        {iconAbove}
      </span>
      <button
        className={`px-5 py-3 text-xl font-medium rounded bg-transparent ${color} transition-colors duration-200 hover:bg-gray-800/20`}
        type="button"
      >
        {label}
      </button>
      {/* Dropdown full-circle radial icons just above the button */}
      <div className="absolute left-1/2 bottom-full" style={{ pointerEvents: open ? 'auto' : 'none', width: radius * 2 + 60, height: radius * 2 + 60, marginBottom: 0, transform: 'translateX(-50%)' }}>
        {items.map((item, idx) => {
          const angle = idx * angleStep - Math.PI / 2; // Start at top
          const x = Math.cos(angle) * radius + radius + 30;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center ${item.color} text-center transition-opacity duration-300`}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                opacity: open ? 1 : 0,
                transition: 'opacity 0.3s',
                minWidth: 80,
                zIndex: 5,
              }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 bg-opacity-80 mb-2 shadow-lg">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <div className="bg-blue-200 bg-opacity-80 px-3 py-2 rounded-full shadow-lg">
                <span className="text-sm text-black font-medium whitespace-nowrap">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RadialMenu() {
  return (
    <div className="flex items-center space-x-4 pt-4 my-2">
      <DropdownRadialMenu items={amenities} label="Amenities" color="text-white" iconAbove={<span>✅</span>} />
      <DropdownRadialMenu items={restrictions} label="Restrictions" color="text-white" iconAbove={<span>🚫</span>} />
    </div>
  );
}

export default RadialMenu;