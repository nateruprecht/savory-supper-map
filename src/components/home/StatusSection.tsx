
import React, { useState } from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { Award, ChevronRight, Facebook } from 'lucide-react';
import { getUserStatuses, UserStatus, getPrimaryUserStatus } from '@/lib/status-utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import StatusCard from '@/components/home/status/StatusCard';
import EmptyStatusState from '@/components/home/status/EmptyStatusState';
import StatusSectionHeader from '@/components/home/status/StatusSectionHeader';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: SupperClub[];
  isCurrentUser?: boolean;
};

/**
 * StatusSection component displays user's statuses and badges
 */
const StatusSection: React.FC<StatusSectionProps> = ({ user, clubs = [], isCurrentUser = true }) => {
  const [showAllStatuses, setShowAllStatuses] = useState(false);
  const isMobile = useIsMobile();
  
  // Calculate data for display
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  ).length;
  const userStatuses = getUserStatuses(user, reviewedClubs);
  
  // Get primary status for profile display
  // For this version, we'll use simulated values for state/city rankings
  // In a real implementation, these would come from the database
  const primaryStatus = getPrimaryUserStatus(
    user, 
    'Wisconsin', // Example state - in production this would come from user profile
    user.rank ? null : 3, // Example state rank - only used if user isn't on overall leaderboard
    'Madison', // Example city - in production this would come from user profile
    user.rank ? null : 2 // Example city rank - only used if user isn't on overall leaderboard
  );
  
  // Take only top items for initial display based on screen size
  const displayCount = isMobile ? 2 : 3;
  // If there's a primary status, make sure it's first in the list
  let displayStatuses = [];
  if (primaryStatus) {
    displayStatuses = [primaryStatus];
    displayStatuses = displayStatuses.concat(
      userStatuses
        .filter(status => status.id !== primaryStatus.id)
        .slice(0, displayCount - 1)
    );
  } else {
    displayStatuses = userStatuses.slice(0, displayCount);
  }
  
  const hasMoreStatuses = userStatuses.length > displayCount;

  // Handle share on Facebook
  const handleShareOnFacebook = () => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your status "${primaryStatus?.title || 'Supper Enthusiast'}" on Facebook!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full box-border" data-testid="status-section">
      <StatusSectionHeader 
        hasMoreStatuses={true} 
        onSeeAll={() => setShowAllStatuses(true)} 
      />
      
      {userStatuses.length > 0 ? (
        <>
          <div className="space-y-4">
            {displayStatuses.map(status => (
              <StatusCard key={status.id} status={status} isPrimary={status.id === primaryStatus?.id} />
            ))}
          </div>
          
          {/* Facebook Share Button */}
          {isCurrentUser && (
            <div className="mt-4 flex justify-end">
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleShareOnFacebook}
              >
                <Facebook className="h-4 w-4" />
                <span className="text-xs">Share on Facebook</span>
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyStatusState isCurrentUser={isCurrentUser} user={user} />
      )}

      {/* Dialog to show all statuses */}
      <Dialog open={showAllStatuses} onOpenChange={setShowAllStatuses}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto dialog-content hide-scrollbar">
          <DialogHeader>
            <DialogTitle>{isCurrentUser ? 'Your Statuses' : `${user.name}'s Statuses`}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {userStatuses.length > 0 ? (
              <div className="space-y-4">
                {userStatuses.map(status => (
                  <StatusCard key={status.id} status={status} isPrimary={status.id === primaryStatus?.id} />
                ))}
              </div>
            ) : (
              <EmptyStatusState isCurrentUser={isCurrentUser} user={user} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusSection;
