
import React from 'react';
import { Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';

type BadgeGridProps = {
  badges: BadgeType[];
  earnedBadgeIds: string[];
  isCurrentUser: boolean;
  isMobile: boolean;
};

/**
 * Renders a grid of badge components
 */
const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  earnedBadgeIds,
  isCurrentUser,
  isMobile,
}) => {
  return (
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
  );
};

export default BadgeGrid;
