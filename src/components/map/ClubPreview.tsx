
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
      <div className="glass-morphism rounded-lg w-full max-w-md p-4 flex items-center">
        <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
          <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{club.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {club.city}, {club.state}
          </p>
          <Button size="sm" onClick={onViewDetails}>View Details</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubPreview;
