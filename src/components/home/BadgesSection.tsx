
import React from 'react';
import { Trophy } from 'lucide-react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';

type BadgesSectionProps = {
  user: UserProfile;
  badges?: BadgeType[];
  isCurrentUser?: boolean;
};

const BadgesSection: React.FC<BadgesSectionProps> = ({ 
  user, 
  badges = [], 
  isCurrentUser = true 
}) => {
  const earnedBadges = user.badges || [];
  const earnedBadgeIds = earnedBadges.map(badge => badge.id);
  
  // Determine the title and empty state message based on whether it's the current user
  const sectionTitle = isCurrentUser ? "Your Badges" : `${user.name}'s Badges`;
  const emptyStateMessage = isCurrentUser 
    ? "You haven't earned any badges yet." 
    : `${user.name} hasn't earned any badges yet.`;
  
  // Calculate progress for the title
  const earnedCount = earnedBadgeIds.length;
  const totalCount = badges.length;
  const progressText = totalCount > 0 ? `${earnedCount} of ${totalCount} earned` : '';

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold flex items-center text-lg sm:text-xl">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          {sectionTitle}
        </h2>
        <span className="text-sm text-muted-foreground">{progressText}</span>
      </div>
      
      {earnedCount > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {badges.slice(0, 6).map(badge => (
            <Badge 
              key={badge.id} 
              badge={badge} 
              earned={earnedBadgeIds.includes(badge.id)}
              isCurrentUser={isCurrentUser}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
          <p className="text-muted-foreground">{emptyStateMessage}</p>
          {isCurrentUser && (
            <p className="text-sm text-muted-foreground mt-1">
              Keep visiting supper clubs to earn badges!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BadgesSection;
