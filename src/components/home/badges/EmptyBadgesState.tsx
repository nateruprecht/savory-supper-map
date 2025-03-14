
import React from 'react';
import { Trophy } from 'lucide-react';
import { UserProfile } from '@/lib/types';

type EmptyBadgesStateProps = {
  isCurrentUser: boolean;
  user: UserProfile;
};

/**
 * Component displayed when a user has no earned badges
 */
const EmptyBadgesState: React.FC<EmptyBadgesStateProps> = ({ isCurrentUser, user }) => {
  const emptyStateMessage = isCurrentUser 
    ? "You haven't earned any badges yet." 
    : `${user.name} hasn't earned any badges yet.`;

  return (
    <div className="text-center py-10">
      <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
      <p className="text-muted-foreground">{emptyStateMessage}</p>
      {isCurrentUser && (
        <p className="text-sm text-muted-foreground mt-1">
          Keep visiting supper clubs to earn badges!
        </p>
      )}
    </div>
  );
};

export default EmptyBadgesState;
