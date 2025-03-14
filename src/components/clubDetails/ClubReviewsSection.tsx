
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/types';
import ReviewItem from './ReviewItem';

type ClubReviewsSectionProps = {
  reviews: Review[];
  onOpenReviewForm: () => void;
};

const ClubReviewsSection: React.FC<ClubReviewsSectionProps> = ({ 
  reviews, 
  onOpenReviewForm 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Reviews</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenReviewForm}
        >
          Write a Review
        </Button>
      </div>
      
      {reviews.length > 0 ? (
        <div className="border rounded-lg divide-y overflow-hidden">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
};

export default ClubReviewsSection;
