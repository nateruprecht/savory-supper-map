
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon, PlusCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile, SupperClub, Review } from '@/lib/types';
import { toast } from 'sonner';

type ReviewsSectionProps = {
  user: UserProfile;
  clubs: SupperClub[];
  showTitle?: boolean;
  isCurrentUser?: boolean;
  limit?: number;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  user,
  clubs,
  showTitle = true,
  isCurrentUser = true,
  limit
}) => {
  const navigate = useNavigate();
  
  // Get all reviews by this user
  const userReviews: (Review & { club?: SupperClub })[] = [];
  
  clubs.forEach(club => {
    club.reviews.forEach(review => {
      if (review.userId === user.id) {
        userReviews.push({
          ...review,
          club
        });
      }
    });
  });
  
  // Apply limit if provided
  const displayReviews = limit ? userReviews.slice(0, limit) : userReviews;
  
  // Handle navigation to the reviews page
  const handleSeeAllReviews = () => {
    navigate('/user-reviews');
  };
  
  // Handle add review button click
  const handleAddReview = () => {
    toast.info("Add review feature will open club selection dialog");
  };

  if (displayReviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        {showTitle && (
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <StarIcon className="h-5 w-5 mr-2 text-amber-500" />
            {isCurrentUser ? 'Your Reviews' : `${user.name}'s Reviews`}
          </h2>
        )}
        
        <div className="text-center py-8">
          <StarIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3 opacity-30" />
          <p className="text-muted-foreground">
            {isCurrentUser 
              ? "You haven't reviewed any supper clubs yet." 
              : `${user.name} hasn't reviewed any supper clubs yet.`}
          </p>
          
          {isCurrentUser && (
            <Button 
              className="mt-4"
              variant="outline"
              onClick={handleAddReview}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a Review
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="mb-4">
        {showTitle && (
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold flex items-center mb-2">
              <StarIcon className="h-5 w-5 mr-2 text-amber-500" />
              {isCurrentUser ? 'Your Reviews' : `${user.name}'s Reviews`}
            </h2>
            
            {isCurrentUser && (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddReview}
                >
                  Add a Review
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary flex items-center"
                  onClick={handleSeeAllReviews}
                >
                  See All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {displayReviews.map(review => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">{review.club?.name}</div>
              <div className="flex items-center">
                <span className="mr-1">{review.rating}</span>
                <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
            <div className="text-xs text-muted-foreground mt-2">{review.date}</div>
          </div>
        ))}
      </div>
      
      {userReviews.length > (limit || 0) && isCurrentUser && (
        <div className="mt-4 text-center">
          <Button 
            variant="link"
            onClick={handleSeeAllReviews}
          >
            See all {userReviews.length} reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
