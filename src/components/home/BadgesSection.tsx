
import React from 'react';
import { Trophy, ChevronRight, Facebook } from 'lucide-react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BadgesSectionProps = {
  user: UserProfile;
  badges?: BadgeType[];
  isCurrentUser?: boolean;
  limit?: number;
  showTitle?: boolean;
  showShareButton?: boolean;
  handleSeeAllBadges?: () => void;
};

const BadgesSection: React.FC<BadgesSectionProps> = ({ 
  user, 
  badges = [], 
  isCurrentUser = true,
  limit,
  showTitle = true,
  showShareButton = true,
  handleSeeAllBadges
}) => {
  const [showAllBadges, setShowAllBadges] = React.useState(false);
  const isMobile = useIsMobile();
  
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

  // Apply limit to badges if provided
  const displayLimit = limit || (isMobile ? 3 : badges.length);
  const displayBadges = badges.slice(0, displayLimit);
  const hasMoreBadges = badges.length > displayLimit;

  // Handle share on Facebook
  const handleShareOnFacebook = () => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your badge "Club Explorer" on Facebook!`);
  };

  // Use external handler if provided, otherwise default to dialog
  const handleSeeAll = () => {
    if (handleSeeAllBadges) {
      handleSeeAllBadges();
    } else {
      setShowAllBadges(true);
    }
  };

  // Container can be either Card or simple div based on usage context
  const ContainerComponent = showTitle ? 
    (props: React.HTMLAttributes<HTMLDivElement>) => (
      <div 
        className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full"
        {...props}
      />
    ) :
    Card;

  const TitleComponent = showTitle ? 'h2' : CardTitle;

  return (
    <ContainerComponent>
      {showTitle ? (
        <div className="flex items-center justify-between mb-4">
          <TitleComponent className="font-semibold flex items-center text-lg sm:text-xl">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Badges
          </TitleComponent>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{progressText}</span>
            {hasMoreBadges && (
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
        </div>
      ) : (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-supper-red" />
            Badges
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
      
      {earnedCount > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {displayBadges.map(badge => (
              <Badge 
                key={badge.id} 
                badge={badge} 
                earned={earnedBadgeIds.includes(badge.id)}
                isCurrentUser={isCurrentUser}
                compact={isMobile}
              />
            ))}
          </div>

          {/* Facebook Share Button - Only shown if showShareButton is true */}
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
      
      {!showTitle && </CardContent>}

      {/* Dialog to show all badges - only shown if handleSeeAllBadges is not provided */}
      {!handleSeeAllBadges && (
        <Dialog open={showAllBadges} onOpenChange={setShowAllBadges}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isCurrentUser ? 'Your Badges' : `${user.name}'s Badges`}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.map(badge => (
                  <Badge 
                    key={badge.id} 
                    badge={badge} 
                    earned={earnedBadgeIds.includes(badge.id)}
                    isCurrentUser={isCurrentUser}
                  />
                ))}
              </div>
              
              {earnedCount === 0 && (
                <div className="text-center py-8">
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
          </DialogContent>
        </Dialog>
      )}
    </ContainerComponent>
  );
};

export default BadgesSection;
