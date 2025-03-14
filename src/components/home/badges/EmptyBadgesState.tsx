
import React from 'react';
import { Trophy } from 'lucide-react';

type EmptyBadgesStateProps = {
  isCurrentUser: boolean;
  userName: string;
};

/**
 * Renders an empty state when a user has no badges
 */
const EmptyBadgesState: React.FC<EmptyBadgesStateProps> = ({ isCurrentUser, userName }) => {
  const emptyStateMessage = isCurrentUser 
    ? "You haven't earned any badges yet." 
    : `${userName} hasn't earned any badges yet.`;
    
  return (
    <div className="text-center py-10" data-testid="empty-badges-state">
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
