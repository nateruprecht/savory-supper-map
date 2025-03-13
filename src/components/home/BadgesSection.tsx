
import React from 'react';
import { Award } from 'lucide-react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';
import { cn } from '@/lib/utils';

type BadgesSectionProps = {
  user: UserProfile;
  badges: BadgeType[];
  compact?: boolean;
  limit?: number;
  isCurrentUser?: boolean;
};

const BadgesSection: React.FC<BadgesSectionProps> = ({ 
  user, 
  badges,
  compact = false,
  limit,
  isCurrentUser = true
}) => {
  const earnedBadges = badges.filter(badge => 
    user.badges.some(b => b.id === badge.id)
  );
  
  const nextBadges = badges
    .filter(badge => !user.badges.some(b => b.id === badge.id))
    .sort((a, b) => a.requiredVisits - b.requiredVisits);
  
  const displayedBadges = limit 
    ? earnedBadges.slice(0, limit)
    : earnedBadges;
  
  const nextBadge = nextBadges.length > 0 ? nextBadges[0] : null;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm", compact ? "p-3" : "p-4 sm:p-5")}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className={cn("font-semibold flex items-center", compact ? "text-base" : "text-lg sm:text-xl")}>
          <Award className="h-5 w-5 mr-2 text-primary" />
          Badges
        </h2>
        
        <div className="text-xs text-muted-foreground">
          {earnedBadges.length} of {badges.length} earned
        </div>
      </div>
      
      {displayedBadges.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
          {displayedBadges.map(badge => (
            <Badge
              key={badge.id}
              badge={badge}
              earned={true}
              compact={compact}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-2 mb-4">
          No badges earned yet
        </div>
      )}
      
      {nextBadge && (
        <div className="border rounded-lg p-3">
          <h3 className="font-medium text-sm mb-1">Next Badge:</h3>
          <div className="flex items-center">
            <div className="mr-3 opacity-50">
              <Badge badge={nextBadge} earned={false} compact />
            </div>
            <div>
              <p className="font-medium text-sm">{nextBadge.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.totalVisits} / {nextBadge.requiredVisits} visits
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, (user.totalVisits / nextBadge.requiredVisits) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesSection;
