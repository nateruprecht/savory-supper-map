
import React from 'react';
import { motion } from 'framer-motion';
import { SupperClub } from '@/lib/types';

type ClubMarkersProps = {
  clubs: SupperClub[];
  selectedClub: SupperClub | null;
  onClubSelect: (club: SupperClub) => void;
  mapScale: number;
  mapOffset: { x: number; y: number };
};

const ClubMarkers: React.FC<ClubMarkersProps> = ({
  clubs,
  selectedClub,
  onClubSelect,
  mapScale,
  mapOffset
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {clubs.map((club) => {
        const isSelected = selectedClub?.id === club.id;
        
        // Convert lat/lng to map coordinates
        // This is a simplified conversion - in a real app, you'd use projection functions
        const x = (club.location.lng + 100) * 2; // Simplified conversion
        const y = (50 - club.location.lat) * 4; // Simplified conversion
        
        return (
          <motion.div
            key={club.id}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${isSelected ? 1.2 : 1})`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isSelected ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute w-4 h-4 rounded-full bg-supper-red shadow-md cursor-pointer pointer-events-auto"
            onClick={() => onClubSelect(club)}
          >
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-1 rounded-full border-2 border-supper-red/70 animate-pulse"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ClubMarkers;
