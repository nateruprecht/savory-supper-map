
import React from 'react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import BadgeSectionHeader from './badges/BadgeSectionHeader';
import BadgeGrid from './badges/BadgeGrid';
import EmptyBadgesState from './badges/EmptyBadgesState';
import ShareButton from './status/ShareButton';

type BadgesSectionProps = {
  user: UserProfile;
  badges?: BadgeType[];
  isCurrentUser?: boolean;
  limit?: number;
  showTitle?: boolean;
  showShareButton?: boolean;
  handleSeeAllBadges?: () => void;
};

/**
 * BadgesSection component displays user's badges
 */
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
  
  // Calculate progress for the title
  const earnedCount = earnedBadgeIds.length;
  const totalCount = badges.length;
  const progressText = totalCount > 0 ? `${earnedCount} of ${totalCount} earned` : '';

  // Apply limit to badges if provided
  const displayLimit = limit || (isMobile ? 3 : badges.length);
  const displayBadges = badges.slice(0, displayLimit);
  const hasMoreBadges = badges.length > displayLimit;

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
        data-testid="badges-section"
        {...props}
      />
    ) :
    Card;

  return (
    <ContainerComponent>
      <BadgeSectionHeader
        showTitle={showTitle}
        hasMoreBadges={hasMoreBadges}
        progressText={progressText}
        handleSeeAll={handleSeeAll}
      />
      
      {!showTitle && (
        <CardContent>
          {earnedCount > 0 ? (
            <>
              <BadgeGrid
                badges={displayBadges}
                earnedBadgeIds={earnedBadgeIds}
                isCurrentUser={isCurrentUser}
                compact={isMobile}
              />
              <ShareButton show={showShareButton} isCurrentUser={isCurrentUser} />
            </>
          ) : (
            <EmptyBadgesState isCurrentUser={isCurrentUser} userName={user.name} />
          )}
        </CardContent>
      )}
      
      {showTitle && (
        <>
          {earnedCount > 0 ? (
            <>
              <BadgeGrid
                badges={displayBadges}
                earnedBadgeIds={earnedBadgeIds}
                isCurrentUser={isCurrentUser}
                compact={isMobile}
              />
              <ShareButton show={showShareButton} isCurrentUser={isCurrentUser} />
            </>
          ) : (
            <EmptyBadgesState isCurrentUser={isCurrentUser} userName={user.name} />
          )}
        </>
      )}
      
      {/* Dialog to show all badges - only shown if handleSeeAllBadges is not provided */}
      {!handleSeeAllBadges && (
        <Dialog open={showAllBadges} onOpenChange={setShowAllBadges}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isCurrentUser ? 'Your Badges' : `${user.name}'s Badges`}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <BadgeGrid
                badges={badges}
                earnedBadgeIds={earnedBadgeIds}
                isCurrentUser={isCurrentUser}
                compact={false}
              />
              
              {earnedCount === 0 && (
                <EmptyBadgesState isCurrentUser={isCurrentUser} userName={user.name} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ContainerComponent>
  );
};

export default BadgesSection;
