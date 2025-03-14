
import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { UserProfile, Badge as BadgeType } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import BadgeSectionHeader from '@/components/home/badges/BadgeSectionHeader';
import BadgeGrid from '@/components/home/badges/BadgeGrid';
import EmptyBadgesState from '@/components/home/badges/EmptyBadgesState';
import ShareButton from '@/components/home/shared/ShareButton';

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
  
  // Calculate progress for the title
  const earnedCount = earnedBadgeIds.length;
  const totalCount = badges.length;
  const progressText = totalCount > 0 ? `${earnedCount} of ${totalCount} earned` : '';

  // Apply limit to badges if provided
  const displayLimit = limit || (isMobile ? 4 : badges.length);
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full">
      {showTitle && (
        <BadgeSectionHeader 
          sectionTitle={sectionTitle} 
          progressText={progressText}
          hasMoreBadges={hasMoreBadges}
          onSeeAll={handleSeeAll}
        />
      )}
      
      {earnedCount > 0 ? (
        <>
          <BadgeGrid 
            badges={displayBadges}
            earnedBadgeIds={earnedBadgeIds}
            isCurrentUser={isCurrentUser}
            isMobile={isMobile}
          />

          {/* Facebook Share Button - Only shown if showShareButton is true */}
          {isCurrentUser && showShareButton && (
            <ShareButton 
              type="badge"
              title="Club Explorer"
            />
          )}
        </>
      ) : (
        <EmptyBadgesState 
          isCurrentUser={isCurrentUser} 
          user={user} 
        />
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
                isMobile={false}
              />
              
              {earnedCount === 0 && (
                <EmptyBadgesState 
                  isCurrentUser={isCurrentUser} 
                  user={user} 
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BadgesSection;
