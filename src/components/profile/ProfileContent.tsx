
import React from 'react';
import { UserProfile, Badge, SupperClub } from '@/lib/types';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ListsSection from '@/components/profile/ListsSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

type ProfileContentProps = {
  user: UserProfile;
  clubs: SupperClub[];
  badges: Badge[];
  isCurrentUser?: boolean;
  showListsSection?: boolean;
};

/**
 * ProfileContent component displays all the profile sections
 * This is used by both Profile.tsx and UserProfilePage.tsx
 */
const ProfileContent: React.FC<ProfileContentProps> = ({
  user,
  clubs,
  badges,
  isCurrentUser = true,
  showListsSection = true
}) => {
  const isMobile = useIsMobile();
  
  // Debug log to ensure props are correctly passed
  console.log('ProfileContent rendering with user:', user);
  console.log('isCurrentUser:', isCurrentUser);
  
  // Handle share on Facebook
  const handleShareOnFacebook = (type: 'status' | 'badge', title: string) => {
    // Mock implementation - would use the Facebook Share API in production
    toast.success(`Shared your ${type} "${title}" on Facebook!`);
  };
  
  // Handle see all badges
  const handleSeeAllBadges = () => {
    toast.info("All badges view coming soon");
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
      {/* Profile Header and Stats */}
      <ProfileHeader user={user} />
      <ProfileStats user={user} clubs={clubs} />
      
      {/* Status Section - pass clubs data for review calculations */}
      <StatusSection 
        user={user} 
        clubs={clubs}
        isCurrentUser={isCurrentUser} 
        key="status-section"
        data-testid="profile-status-section"
      />
      
      {/* Other Sections */}
      <BadgesSection 
        user={user} 
        badges={badges} 
        isCurrentUser={isCurrentUser} 
        limit={isMobile ? 4 : undefined}
        handleSeeAllBadges={handleSeeAllBadges}
      />
      <ReviewsSection user={user} clubs={clubs} isCurrentUser={isCurrentUser} />
      {showListsSection && <ListsSection user={user} clubs={clubs} />}
    </div>
  );
};

export default ProfileContent;
