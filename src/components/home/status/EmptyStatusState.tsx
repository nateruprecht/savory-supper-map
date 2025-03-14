
import React from 'react';
import { Trophy } from 'lucide-react';

type EmptyStatusStateProps = {
  isCurrentUser: boolean;
  userName: string;
};

/**
 * Renders an empty state when a user has no statuses
 */
const EmptyStatusState: React.FC<EmptyStatusStateProps> = ({ isCurrentUser, userName }) => {
  return (
    <div className="text-center py-8" data-testid="empty-status-state">
      <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
      <p className="text-muted-foreground">
        {isCurrentUser 
          ? "You haven't earned any statuses yet." 
          : `${userName} hasn't earned any statuses yet.`}
      </p>
      {isCurrentUser && (
        <p className="text-sm text-muted-foreground mt-1">
          Visit and review more supper clubs to earn statuses!
        </p>
      )}
    </div>
  );
};

export default EmptyStatusState;
