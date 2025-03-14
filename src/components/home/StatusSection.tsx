
import React, { useState } from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { Award, ChevronRight } from 'lucide-react';
import { getUserStatuses, UserStatus } from '@/lib/status-utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: SupperClub[];
  isCurrentUser?: boolean;
};

// Helper function - extracted to improve readability
const getStatusColor = (category: string): string => {
  switch (category) {
    case 'visits':
      return 'bg-primary text-primary-foreground';
    case 'reviews':
      return 'bg-secondary text-secondary-foreground';
    case 'leaderboard':
      return 'bg-supper-amber text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
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
  
  // Take only top items for initial display based on screen size
  const displayCount = isMobile ? 2 : 3;
  const displayStatuses = userStatuses.slice(0, displayCount);
  const hasMoreStatuses = userStatuses.length > displayCount;

  // Render status card to avoid repetition
  const renderStatusCard = (status: UserStatus) => (
    <div
      key={status.id}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center text-center mb-4"
    >
      <div className="mb-2">
        <Award 
          className={`h-6 w-6 ${
            status.category === 'visits' ? 'text-primary' : 
            status.category === 'reviews' ? 'text-secondary' : 
            'text-supper-amber'
          }`} 
        />
      </div>
      <h3 className="font-semibold text-base mb-1">{status.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{status.description}</p>
      <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status.category)}`}>
        {status.category}
      </div>
    </div>
  );

  // Empty state component
  const EmptyStatusState = () => (
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full box-border" data-testid="status-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Status
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary flex items-center"
          onClick={() => setShowAllStatuses(true)}
        >
          See all <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Status Badges */}
      {userStatuses.length > 0 ? (
        <div className="space-y-4">
          {displayStatuses.map(renderStatusCard)}
        </div>
      ) : (
        <EmptyStatusState />
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
                {userStatuses.map(renderStatusCard)}
              </div>
            ) : (
              <EmptyStatusState />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusSection;
