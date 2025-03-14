
import React from 'react';
import { Award } from 'lucide-react';
import { UserProfile } from '@/lib/types';

type EmptyStatusStateProps = {
  isCurrentUser: boolean;
  user: UserProfile;
};

/**
 * Component displayed when a user has no earned statuses
 */
const EmptyStatusState: React.FC<EmptyStatusStateProps> = ({ isCurrentUser, user }) => {
  return (
    <div className="text-center py-8">
      <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
      <p className="text-muted-foreground">
        {isCurrentUser 
          ? "You haven't earned any statuses yet." 
          : `${user.name} hasn't earned any statuses yet.`}
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
