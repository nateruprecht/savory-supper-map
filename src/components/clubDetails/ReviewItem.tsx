
import React from 'react';
import { ThumbsUp, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/types';
import StarRating from './StarRating';

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="p-4 border-b border-border last:border-0">
      <div className="flex items-start">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="h-10 w-10 rounded-full mr-3 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{review.userName}</h4>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="text-sm mt-2">{review.comment}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Food</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.foodRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Service</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.serviceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Ambience</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.ambienceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-3 space-x-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <MessageCircle className="h-3 w-3 mr-1" /> Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
