
import React from 'react';
import { Trophy, ChevronRight, Facebook } from 'lucide-react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

type BadgesSectionProps = {
  user: UserProfile;
  badges?: BadgeType[];
  isCurrentUser?: boolean;
  limit?: number;
  showTitle?: boolean;
};

const BadgesSection: React.FC<BadgesSectionProps> = ({ 
  user, 
  badges = [], 
  isCurrentUser = true,
  limit,
  showTitle = true
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
  const displayLimit = limit || (isMobile ? 4 : badges.length);
  const displayBadges = badges.slice(0, displayLimit);
  const hasMoreBadges = badges.length > displayLimit;

  // Handle share on Facebook
  const handleShareOnFacebook = () => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your badge "Club Explorer" on Facebook!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center text-lg sm:text-xl">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            {sectionTitle}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{progressText}</span>
            {hasMoreBadges && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary flex items-center"
                onClick={() => setShowAllBadges(true)}
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
      
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

      {/* Dialog to show all badges */}
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
    </div>
  );
};

export default BadgesSection;
