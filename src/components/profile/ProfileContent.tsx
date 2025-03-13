
import React from 'react';
import { UserProfile, Badge, SupperClub } from '@/lib/types';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ListsSection from '@/components/profile/ListsSection';

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
  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      <ProfileStats user={user} clubs={clubs} />
      <StatusSection user={user} isCurrentUser={isCurrentUser} />
      <BadgesSection user={user} badges={badges} isCurrentUser={isCurrentUser} />
      <ReviewsSection user={user} clubs={clubs} isCurrentUser={isCurrentUser} />
      {showListsSection && <ListsSection user={user} clubs={clubs} />}
    </div>
  );
};

export default ProfileContent;
