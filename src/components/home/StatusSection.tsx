
import React, { useState } from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { MapPin, Calendar, Award, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { getUserStatuses, UserStatus } from '@/lib/status-utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: SupperClub[];
  isCurrentUser?: boolean;
};

// Helper functions - extracted to improve readability
const getOrdinalSuffix = (rank: number): string => {
  const j = rank % 10;
  const k = rank % 100;
  
  if (j === 1 && k !== 11) return `${rank}st`;
  if (j === 2 && k !== 12) return `${rank}nd`;
  if (j === 3 && k !== 13) return `${rank}rd`;
  return `${rank}th`;
};

const formatUserJoinDate = (dateString: string): string => {
  const joinDate = new Date(dateString);
  return !isNaN(joinDate.getTime()) 
    ? format(joinDate, 'MMMM yyyy')
    : 'Unknown';
};

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
 * StatusSection component displays user's visit stats, rank, and join date
 */
const StatusSection: React.FC<StatusSectionProps> = ({ user, clubs = [], isCurrentUser = true }) => {
  const [showAllStatuses, setShowAllStatuses] = useState(false);
  const isMobile = useIsMobile();
  
  // Calculate data for display
  const formatJoinDate = formatUserJoinDate(user.joinDate);
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  ).length;
  const userStatuses = getUserStatuses(user, reviewedClubs);
  
  // Take only top items for initial display based on screen size
  const displayCount = isMobile ? 2 : 3;
  const displayStatuses = userStatuses.slice(0, displayCount);
  const hasMoreStatuses = userStatuses.length > displayCount;
  
  // Text generators for different parts
  const getVisitText = () => {
    if (user.totalVisits === 0) {
      return isCurrentUser 
        ? "You haven't visited any supper clubs yet." 
        : `${user.name} hasn't visited any supper clubs yet.`;
    } else if (user.totalVisits === 1) {
      return isCurrentUser 
        ? "You've visited 1 supper club." 
        : `${user.name} has visited 1 supper club.`;
    } else {
      return isCurrentUser 
        ? `You've visited ${user.totalVisits} supper clubs.` 
        : `${user.name} has visited ${user.totalVisits} supper clubs.`;
    }
  };

  const getRankText = () => {
    if (user.rank === 0) {
      return isCurrentUser
        ? "Your rank will appear once you start visiting clubs."
        : `${user.name}'s rank will appear once they start visiting clubs.`;
    }
    
    const rankWithOrdinal = getOrdinalSuffix(user.rank);
    
    return isCurrentUser 
      ? `You're currently ranked ${rankWithOrdinal} in the leaderboard.` 
      : `${user.name} is currently ranked ${rankWithOrdinal} in the leaderboard.`;
  };

  const getJoinText = () => {
    return isCurrentUser
      ? `You joined in ${formatJoinDate}.`
      : `${user.name} joined in ${formatJoinDate}.`;
  };

  // Render status card to avoid repetition
  const renderStatusCard = (status: UserStatus) => (
    <div
      key={status.id}
      className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105 w-full"
    >
      <div className="mb-2 p-2 rounded-full bg-gray-50">
        <Award className={`h-6 w-6 ${
          status.category === 'visits' ? 'text-primary' : 
          status.category === 'reviews' ? 'text-secondary' : 
          'text-supper-amber'
        }`} />
      </div>
      <h3 className="font-medium text-sm mb-1">{status.title}</h3>
      <p className="text-xs text-muted-foreground">{status.description}</p>
      <div className={`mt-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(status.category)}`}>
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
        {hasMoreStatuses && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary flex items-center"
            onClick={() => setShowAllStatuses(true)}
          >
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
      
      {/* Status Badges */}
      {userStatuses.length > 0 ? (
        <div className="mb-5 w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {displayStatuses.map(renderStatusCard)}
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground mb-4">
          {isCurrentUser 
            ? "You haven't earned any status badges yet. Keep visiting supper clubs!"
            : `${user.name} hasn't earned any status badges yet.`}
        </div>
      )}

      {/* Visit and Join Info */}
      <div className="space-y-3 mt-4 border-t pt-4 border-gray-100">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base">{getVisitText()} {getRankText()}</p>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base">{getJoinText()}</p>
        </div>
      </div>

      {/* Dialog to show all statuses */}
      <Dialog open={showAllStatuses} onOpenChange={setShowAllStatuses}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto dialog-content hide-scrollbar">
          <DialogHeader>
            <DialogTitle>{isCurrentUser ? 'Your Statuses' : `${user.name}'s Statuses`}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {userStatuses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
