
import React, { useState } from 'react';
import { Star, MessageSquare, Plus } from 'lucide-react';
import { UserProfile, SupperClub, Review } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';
import { toast } from 'sonner';

type ReviewsSectionProps = {
  user: UserProfile;
  clubs: SupperClub[];
  compact?: boolean;
  isCurrentUser?: boolean;
  showTitle?: boolean;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  user, 
  clubs, 
  compact, 
  isCurrentUser = true,
  showTitle = true 
}) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  // Get clubs that the user has reviewed
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  );
  
  // Calculate average rating given by user
  const userRatings = reviewedClubs.map(club => {
    const userReview = club.reviews.find(review => review.userId === user.id);
    return {
      clubId: club.id,
      clubName: club.name,
      rating: userReview?.rating || 0,
      image: club.image
    };
  }).sort((a, b) => b.rating - a.rating);
  
  const averageRating = userRatings.length > 0
    ? userRatings.reduce((sum, item) => sum + item.rating, 0) / userRatings.length
    : 0;

  // Title changes based on whether viewing own profile or someone else's
  const sectionTitle = isCurrentUser ? "Your Reviews" : `${user.name}'s Reviews`;
  const emptyStateMessage = isCurrentUser 
    ? "You haven't reviewed any supper clubs yet."
    : `${user.name} hasn't reviewed any supper clubs yet.`;

  const handleSubmitReview = (data: any) => {
    console.log('Review submitted:', data);
    toast.success('Review submitted successfully!');
    setReviewDialogOpen(false);
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-sm", compact ? "p-3" : "p-4 sm:p-5")}>
      {showTitle && (
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className={cn("font-semibold flex items-center", compact ? "text-base" : "text-lg sm:text-xl")}>
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {sectionTitle}
          </h2>
          
          {isCurrentUser && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setReviewDialogOpen(true)}
              title="Add a review"
              className="h-8 w-8"
            >
              <Plus className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}
      
      {userRatings.length > 0 ? (
        <>
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Average Rating</span>
              <span className="text-sm font-medium flex items-center">
                {averageRating.toFixed(1)}
                <Star className="h-4 w-4 ml-1 fill-amber-400 text-amber-400" />
              </span>
            </div>
            
            <div className="relative h-2 bg-gray-100 rounded-full">
              <div className="absolute top-0 left-0 w-full flex justify-between px-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="h-2 border-r border-gray-300" style={{ width: '1px' }}></div>
                ))}
              </div>
              <div className="relative">
                {userRatings.map(item => (
                  <div 
                    key={item.clubId}
                    className="absolute top-0 w-4 h-4 rounded-full bg-primary border-2 border-white -mt-1"
                    style={{ left: `calc(${(item.rating / 5) * 100}% - 8px)` }}
                    title={`${item.clubName}: ${item.rating}/5`}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">1</span>
              <span className="text-xs text-muted-foreground">5</span>
            </div>
          </div>
          
          {!compact && (
            <div className="space-y-3">
              {userRatings.slice(0, 3).map(item => {
                const club = clubs.find(c => c.id === item.clubId);
                return (
                  <div key={item.clubId} className="flex items-center p-2 rounded-lg border">
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img src={item.image} alt={item.clubName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.clubName}</div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={cn(
                              "h-3 w-3", 
                              star <= item.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-gray-300"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">{emptyStateMessage}</p>
        </div>
      )}

      {/* Review Form Dialog */}
      <SupperClubReviewForm
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        onSubmit={handleSubmitReview}
        clubs={clubs}
      />
    </div>
  );
};

export default ReviewsSection;
