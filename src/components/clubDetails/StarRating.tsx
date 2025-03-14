
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  size?: 'small' | 'medium';
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'medium' }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={cn(
            size === 'small' ? "h-3 w-3 mr-0.5" : "h-4 w-4 mr-0.5",
            star <= rating 
              ? "text-amber-500 fill-amber-500" 
              : "text-gray-300"
          )} 
        />
      ))}
    </div>
  );
};

export default StarRating;
