
import React, { useState } from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { getUserStatuses, UserStatus } from '@/lib/status-utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import StatusCard from './status/StatusCard';
import EmptyStatusState from './status/EmptyStatusState';
import StatusSectionHeader from './status/StatusSectionHeader';
import ShareButton from './status/ShareButton';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: SupperClub[];
  isCurrentUser?: boolean;
  showTitle?: boolean;
  showShareButton?: boolean;
  limit?: number;
  handleSeeAllStatuses?: () => void;
};

/**
 * StatusSection component displays user's statuses
 */
const StatusSection: React.FC<StatusSectionProps> = ({ 
  user, 
  clubs = [], 
  isCurrentUser = true,
  showTitle = true,
  showShareButton = true,
  limit,
  handleSeeAllStatuses
}) => {
  const [showAllStatuses, setShowAllStatuses] = useState(false);
  const isMobile = useIsMobile();
  
  // Calculate data for display
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  ).length;
  const userStatuses = getUserStatuses(user, reviewedClubs);
  
  // Take only top items for initial display based on screen size or limit
  const displayCount = limit || (isMobile ? 1 : 2);
  const displayStatuses = userStatuses.slice(0, displayCount);
  const hasMoreStatuses = userStatuses.length > displayCount;

  // Handle see all statuses - use provided handler or default
  const handleSeeAll = () => {
    if (handleSeeAllStatuses) {
      handleSeeAllStatuses();
    } else {
      setShowAllStatuses(true);
    }
  };

  // Container can be either Card or simple div based on usage context
  const ContainerComponent = showTitle ? 
    (props: React.HTMLAttributes<HTMLDivElement>) => (
      <div 
        className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full box-border" 
        data-testid="status-section"
        {...props}
      />
    ) :
    Card;

  return (
    <ContainerComponent>
      <StatusSectionHeader 
        showTitle={showTitle} 
        hasMoreStatuses={hasMoreStatuses} 
        handleSeeAll={handleSeeAll} 
      />
      
      {!showTitle && (
        <CardContent>
          {userStatuses.length > 0 ? (
            <>
              <div className="space-y-4">
                {displayStatuses.map(status => (
                  <StatusCard key={status.id} status={status} />
                ))}
              </div>
              
              <ShareButton show={showShareButton} isCurrentUser={isCurrentUser} />
            </>
          ) : (
            <EmptyStatusState isCurrentUser={isCurrentUser} userName={user.name} />
          )}
        </CardContent>
      )}

      {showTitle && (
        <>
          {userStatuses.length > 0 ? (
            <>
              <div className="space-y-4">
                {displayStatuses.map(status => (
                  <StatusCard key={status.id} status={status} />
                ))}
              </div>
              
              <ShareButton show={showShareButton} isCurrentUser={isCurrentUser} />
            </>
          ) : (
            <EmptyStatusState isCurrentUser={isCurrentUser} userName={user.name} />
          )}
        </>
      )}

      {/* Dialog to show all statuses - only used if handleSeeAllStatuses not provided */}
      {!handleSeeAllStatuses && (
        <Dialog open={showAllStatuses} onOpenChange={setShowAllStatuses}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto dialog-content hide-scrollbar">
            <DialogHeader>
              <DialogTitle>{isCurrentUser ? 'Your Statuses' : `${user.name}'s Statuses`}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {userStatuses.length > 0 ? (
                <div className="space-y-4">
                  {userStatuses.map(status => (
                    <StatusCard key={status.id} status={status} />
                  ))}
                </div>
              ) : (
                <EmptyStatusState isCurrentUser={isCurrentUser} userName={user.name} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ContainerComponent>
  );
};

export default StatusSection;
