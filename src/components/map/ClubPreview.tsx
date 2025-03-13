
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star } from 'lucide-react';
import { SupperClub } from '@/lib/types';

type ClubPreviewProps = {
  club: SupperClub | null;
  onViewDetails: () => void;
};

const ClubPreview: React.FC<ClubPreviewProps> = ({ club, onViewDetails }) => {
  if (!club) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-4 left-0 right-0 flex justify-center px-4"
    >
      <div className="glass-morphism rounded-lg w-full max-w-md p-4">
        <div className="flex items-start">
          <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
            <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{club.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{club.city}, {club.state}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span>{club.rating.toFixed(1)}</span>
              <Calendar className="h-3.5 w-3.5 ml-3 mr-1" />
              <span>{club.openHours}</span>
            </div>
            <Button size="sm" onClick={onViewDetails}>View Details</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubPreview;
