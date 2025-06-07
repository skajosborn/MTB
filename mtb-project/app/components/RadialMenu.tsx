import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';

export interface RadialMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode; // Emoji or SVG
  onClick?: () => void;
  color?: string;
}

interface RadialMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: RadialMenuItem[];
  size?: number;
  position: { x: number; y: number };
  overlay?: boolean; // Optional: show a dim background overlay
}

const DEFAULT_SIZE = 350; // or 400
const MIN_SECTORS = 6;

const getAngle = (idx: number, total: number) => {
  // Start at top, clockwise
  return ((360 / total) * idx) - 90;
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
};

// const describeSector = (
//   cx: number,
//   cy: number,
//   outerR: number,
//   innerR: number,
//   startAngle: number,
//   endAngle: number
// ) => {
//   // SVG arc for a donut sector
//   const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
//   const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
//   const startInner = polarToCartesian(cx, cy, innerR, startAngle);
//   const endInner = polarToCartesian(cx, cy, innerR, endAngle);
//   const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
//   return [
//     `M ${startOuter.x} ${startOuter.y}`,
//     `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
//     `L ${startInner.x} ${startInner.y}`,
//     `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${endInner.x} ${endInner.y}`,
//     'Z',
//   ].join(' ');
// };

const RadialMenu: React.FC<RadialMenuProps> = ({ isOpen, onClose, menuItems, size = DEFAULT_SIZE, position, overlay = true }) => {
  const [selected, setSelected] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const sectorCount = Math.max(menuItems?.length ?? 0, MIN_SECTORS);
  const radius = size / 2;
  // const innerRadius = radius * 0.45;
  // const sectorSpace = 12; // Much more space between sectors (degrees)

  useEffect(() => {
    if (isOpen) setSelected(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent | KeyboardEventInit) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setSelected((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setSelected((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      }
    };
    window.addEventListener('keydown', handleKey as EventListener);
    return () => window.removeEventListener('keydown', handleKey as EventListener);
  }, [isOpen, menuItems, selected, onClose]);

  if (!isOpen) return null;

  // Calculate menu position so it's centered at position.x, position.y
  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x - size / 2,
    top: position.y - size / 2,
    zIndex: 1001,
    pointerEvents: 'auto',
    transform: 'translateY(-80px)', // Move the menu up by 80px
  };

  return (
    <>
      {overlay && (
        <div
          className="fixed inset-0 z-[1000] bg-black/0"
          style={{ backdropFilter: 'blur(2px)' }}
          onClick={onClose}
        />
      )}
      <div style={menuStyle} onClick={e => e.stopPropagation()}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="relative drop-shadow-2xl"
          style={{ cursor: 'default', display: 'block' }}
        >
          {/* Circles as menu items */}
          {menuItems.map((item, i) => {
            const angle = getAngle(i, sectorCount);
            const ringRadius = radius * 0.85; // spread out more
            const iconRadius = 28; // smaller circles
            const center = polarToCartesian(radius, radius, ringRadius, angle);
            const isSelected = i === selected;
            return (
              <g
                key={item.id}
                style={{ cursor: item.onClick ? 'pointer' : 'default', pointerEvents: 'auto' }}
                onClick={item.onClick}
              >
                <circle
                  cx={center.x}
                  cy={center.y}
                  r={iconRadius}
                  fill={item?.color === 'red' ? (isSelected ? '#ff4d4dcc' : '#ff4d4dcc') : (isSelected ? '#90ee90cc' : '#90ee90cc')}
                  stroke="#000"
                  strokeWidth={isSelected ? 3 : 1}
                />
                {typeof item.icon === 'string' && item.icon.match(/\.(png|jpg|jpeg|gif)$/i) ? (
                  <image
                    href={item.icon}
                    x={center.x - 14}
                    y={center.y - 14}
                    width={28}
                    height={28}
                  />
                ) : typeof item.icon === 'string' ? (
                  <text
                    x={center.x}
                    y={center.y + 10}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={28}
                    fill="#fff"
                    style={{ filter: 'drop-shadow(1px 1px 2px #000)' }}
                  >
                    {item.icon}
                  </text>
                ) : item.icon ? (
                  <g transform={`translate(${center.x - 24},${center.y - 24})`}>
                    {item.icon}
                  </g>
                ) : null}
              </g>
            );
          })}
          {/* Center Button */}
          <g
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          >
            {/* <circle
              cx={radius}
              cy={radius}
              r={innerRadius - 8}
              fill="#00000022"
              stroke="#000"
              strokeWidth={2}
            /> */}
            {/* <text
              x={radius}
              y={radius + 12}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={56}
              fill="#fff"
              style={{ filter: 'drop-shadow(1px 1px 2px #000)' }}
            >
              ×
            </text> */}
          </g>
        </svg>
      </div>
    </>
  );
};

export default RadialMenu;