
import React, { useState } from 'react';
import { SupperClub } from '@/lib/types';
import { MapPin, Star, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ClubCardProps = {
  club: SupperClub;
  onClick: () => void;
  onVisitToggle: () => void;
  compact?: boolean;
};

const ClubCard: React.FC<ClubCardProps> = ({ 
  club, 
  onClick, 
  onVisitToggle,
  compact = false 
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVisitToggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer card-hover",
        compact ? "flex items-center" : "flex flex-col"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!compact && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img 
            src={club.image} 
            alt={club.name} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
          />
          {club.visited && (
            <div className="absolute top-3 right-3 bg-success-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" />
              <span>Visited</span>
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "flex flex-col p-4",
        compact ? "flex-1" : ""
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-lg tracking-tight">{club.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>
                {club.city}, {club.state}
              </span>
            </div>
          </div>

          {compact && club.image && (
            <div className="relative h-12 w-12 rounded-md overflow-hidden ml-2">
              <img 
                src={club.image} 
                alt={club.name} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {!compact && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {club.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="ml-1 text-sm font-medium">{club.rating}</span>
            <span className="text-muted-foreground text-xs ml-1">
              ({club.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleVisitClick}
              className={cn(
                "flex items-center justify-center rounded-full text-xs font-medium mr-2 h-8 px-3 transition-colors",
                club.visited 
                  ? "bg-success-100 text-success-700 hover:bg-success-200" 
                  : "bg-primary-100 text-primary-700 hover:bg-primary-200"
              )}
            >
              {club.visited ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  <span>Visited</span>
                </>
              ) : (
                <span>Mark Visited</span>
              )}
            </button>

            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;
