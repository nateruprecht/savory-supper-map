
import React from 'react';
import { Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';

type BadgeGridProps = {
  badges: BadgeType[];
  earnedBadgeIds: string[];
  isCurrentUser: boolean;
  compact: boolean;
};

/**
 * Renders a grid of badges
 */
const BadgeGrid: React.FC<BadgeGridProps> = ({ 
  badges, 
  earnedBadgeIds, 
  isCurrentUser, 
  compact 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {badges.map(badge => (
        <Badge 
          key={badge.id} 
          badge={badge} 
          earned={earnedBadgeIds.includes(badge.id)}
          isCurrentUser={isCurrentUser}
          compact={compact}
        />
      ))}
    </div>
  );
};

export default BadgeGrid;
