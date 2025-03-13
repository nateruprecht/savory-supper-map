
import React, { useState } from 'react';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ListsSection from '@/components/profile/ListsSection';
import ProfileLayout from '@/components/profile/ProfileLayout';

const Profile = () => {
  const [user] = useState(currentUser);

  return (
    <ProfileLayout user={user} activeTab="profile">
      <div className="space-y-6">
        <ProfileHeader user={user} />
        <ProfileStats user={user} clubs={sampleSupperClubs} />
        <StatusSection user={user} />
        <BadgesSection user={user} badges={badges} />
        <ReviewsSection user={user} clubs={sampleSupperClubs} />
        <ListsSection user={user} clubs={sampleSupperClubs} />
      </div>
    </ProfileLayout>
  );
};

export default Profile;
