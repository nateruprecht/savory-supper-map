
import React from 'react';
import { Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {badges.map(badge => (
          <Badge 
            key={badge.id} 
            badge={badge} 
            earned={earnedBadgeIds.includes(badge.id)}
            isCurrentUser={isCurrentUser}
            compact={isMobile}
          />
        ))}
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
