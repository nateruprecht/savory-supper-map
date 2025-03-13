
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { cn } from '@/lib/utils';

type MapPinsProps = {
  clubs: SupperClub[];
  selectedClub: SupperClub | null;
  onClubClick: (club: SupperClub) => void;
};

const MapPins: React.FC<MapPinsProps> = ({ 
  clubs, 
  selectedClub, 
  onClubClick 
}) => {
  return (
    <div className="absolute inset-0 z-0">
      {clubs.map(club => (
        <div
          key={club.id}
          className={cn(
            "absolute map-pin",
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
