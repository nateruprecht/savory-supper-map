
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { cn } from '@/lib/utils';

type MapPinsProps = {
  clubs: SupperClub[];
  selectedClub: SupperClub | null;
  onClubClick: (club: SupperClub) => void;
  selectedState?: string;
  onStateClick?: (state: string) => void;
};

// Midwest states with their approximate positions on our map
const midwestStates = [
  { id: 'WI', name: 'Wisconsin', path: "M340,120 L400,120 L420,180 L380,220 L330,220 L310,180 Z", color: '#F5DEB3' },
  { id: 'IL', name: 'Illinois', path: "M340,220 L380,220 L390,280 L350,320 L320,300 L320,240 Z", color: '#F5DEB3' },
  { id: 'MI', name: 'Michigan', path: "M400,120 L440,100 L480,120 L470,170 L420,180 Z M390,190 L420,180 L410,220 L380,220 Z", color: '#F5DEB3' },
  { id: 'MN', name: 'Minnesota', path: "M240,80 L320,80 L340,120 L310,180 L270,180 L240,150 Z", color: '#F5DEB3' },
  { id: 'IA', name: 'Iowa', path: "M240,150 L270,180 L320,180 L320,240 L270,240 L240,210 Z", color: '#F5DEB3' },
  { id: 'MO', name: 'Missouri', path: "M270,240 L320,240 L320,300 L280,300 L240,280 Z", color: '#F5DEB3' },
  { id: 'IN', name: 'Indiana', path: "M380,220 L410,220 L410,280 L390,280 Z", color: '#F5DEB3' },
  { id: 'OH', name: 'Ohio', path: "M410,220 L450,220 L450,280 L410,280 Z", color: '#F5DEB3' },
  { id: 'ND', name: 'North Dakota', path: "M180,80 L240,80 L240,120 L180,120 Z", color: '#F5DEB3' },
  { id: 'SD', name: 'South Dakota', path: "M180,120 L240,120 L240,150 L180,150 Z", color: '#F5DEB3' },
  { id: 'NE', name: 'Nebraska', path: "M180,150 L240,150 L240,210 L180,210 Z", color: '#F5DEB3' },
  { id: 'KS', name: 'Kansas', path: "M180,210 L240,210 L240,260 L180,260 Z", color: '#F5DEB3' }
];

const MapPins: React.FC<MapPinsProps> = ({ 
  clubs, 
  selectedClub, 
  onClubClick,
  selectedState,
  onStateClick
}) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Custom map of Midwest states */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 600 400" 
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      >
        <rect x="0" y="0" width="600" height="400" fill="#F5F5F5" />
        
        {midwestStates.map(state => (
          <g key={state.id} onClick={() => onStateClick?.(state.id)}>
            <path 
              d={state.path} 
              fill={selectedState === state.id ? '#F59E0B' : state.color}
              stroke="#FFFFFF" 
              strokeWidth="2"
              className="transition-colors duration-200 cursor-pointer hover:fill-amber-400"
            />
            <text 
              x={state.path.split(' ')[0].replace('M', '')} 
              y={state.path.split(' ')[1]} 
              dx="20" 
              dy="30" 
              className="text-xs font-medium pointer-events-none select-none"
              fill="#6B7280"
            >
              {state.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Club pins - position them according to state */}
      {clubs.map(club => (
        <div
          key={club.id}
          className={cn(
            "absolute map-pin z-10",
            club.visited ? "map-pin-visited" : "map-pin-unvisited"
          )}
          style={{
            left: `${((club.location.lng + 97) / 15) * 100}%`,
            top: `${(1 - (club.location.lat - 40) / 10) * 100}%`,
          }}
          onClick={() => onClubClick(club)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MapPin 
              className={cn(
                "h-8 w-8",
                selectedClub?.id === club.id ? "text-destructive fill-destructive" : club.visited ? "fill-success-100" : ""
              )} 
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default MapPins;
