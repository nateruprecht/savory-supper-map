
import React from 'react';
import { Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type BadgeGridProps = {
  badges: BadgeType[];
  earnedBadgeIds: string[];
  isCurrentUser: boolean;
  isMobile: boolean;
  onSeeAll?: () => void;
  showSeeAllButton?: boolean;
};

/**
 * Renders a grid of badge components
 */
const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  earnedBadgeIds,
  isCurrentUser,
  isMobile,
  onSeeAll,
  showSeeAllButton = false,
}) => {
  // Get total visits from earned badges to calculate progress
  const getVisitsProgress = (badge: BadgeType) => {
    // For earned badges, return 100%
    if (earnedBadgeIds.includes(badge.id)) {
      return { current: badge.requiredVisits, max: badge.requiredVisits };
    }

    // For unearned badges, calculate progress based on user's visit count
    // This should ideally come from user data, but we're estimating here
    // Find the highest earned badge requirement
    const earnedBadges = badges.filter(b => earnedBadgeIds.includes(b.id));
    let currentVisits = 0;
    
    if (earnedBadges.length > 0) {
      const highestEarnedBadge = earnedBadges.reduce((prev, current) => 
        (prev.requiredVisits > current.requiredVisits) ? prev : current
      );
      currentVisits = highestEarnedBadge.requiredVisits;
    }
    
    return { current: currentVisits, max: badge.requiredVisits };
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {badges.map(badge => {
          const progress = getVisitsProgress(badge);
          const progressPercentage = Math.min(Math.round((progress.current / progress.max) * 100), 100);
          
          return (
            <div key={badge.id} className="flex flex-col">
              <Badge 
                badge={badge} 
                earned={earnedBadgeIds.includes(badge.id)}
                isCurrentUser={isCurrentUser}
                compact={isMobile}
              />
              {!earnedBadgeIds.includes(badge.id) && isCurrentUser && (
                <div className="mt-2 px-2">
                  <Progress 
                    value={progressPercentage} 
                    className="h-1.5 bg-secondary/30" 
                    indicatorClassName="bg-supper-amber"
                  />
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {progress.current}/{progress.max} visits
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showSeeAllButton && onSeeAll && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSeeAll}
            className="flex items-center"
          >
            See all badges <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;
