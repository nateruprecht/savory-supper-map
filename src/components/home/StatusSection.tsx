
import React, { useState } from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { Trophy, ChevronRight, Facebook } from 'lucide-react';
import { getUserStatuses, UserStatus } from '@/lib/status-utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: SupperClub[];
  isCurrentUser?: boolean;
  showTitle?: boolean;
  showShareButton?: boolean;
  limit?: number;
  handleSeeAllStatuses?: () => void;
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

  // Handle share on Facebook
  const handleShareOnFacebook = () => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your status "Supper Club Virtuoso" on Facebook!`);
  };

  // Handle see all statuses - use provided handler or default
  const handleSeeAll = () => {
    if (handleSeeAllStatuses) {
      handleSeeAllStatuses();
    } else {
      setShowAllStatuses(true);
    }
  };

  // Render status card to avoid repetition
  const renderStatusCard = (status: UserStatus) => (
    <div
      key={status.id}
      className="bg-white rounded-lg shadow-sm p-4 mb-3 flex flex-col items-center text-center"
    >
      <h3 className="font-semibold text-lg mb-1">{status.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{status.description}</p>
      <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status.category)}`}>
        {status.category}
      </div>
    </div>
  );

  // Empty state component
  const EmptyStatusState = () => (
    <div className="text-center py-8">
      <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
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

  const TitleComponent = showTitle ? 'h2' : CardTitle;

  return (
    <ContainerComponent>
      {showTitle ? (
        <div className="flex justify-between items-center mb-4">
          <TitleComponent className="text-lg sm:text-xl font-semibold flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-supper-gold" />
            Status Level
          </TitleComponent>
          {hasMoreStatuses && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary flex items-center"
              onClick={handleSeeAll}
            >
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      ) : (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-supper-gold" />
            Status Level
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSeeAll}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">See all</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
      )}
      
      {!showTitle && <CardContent>}
      
      {/* Status Badges */}
      {userStatuses.length > 0 ? (
        <>
          <div className="space-y-4">
            {displayStatuses.map(renderStatusCard)}
          </div>
          
          {/* Facebook Share Button */}
          {isCurrentUser && showShareButton && (
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
        <EmptyStatusState />
      )}
      
      {!showTitle && </CardContent>}

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
                  {userStatuses.map(renderStatusCard)}
                </div>
              ) : (
                <EmptyStatusState />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ContainerComponent>
  );
};

export default StatusSection;
