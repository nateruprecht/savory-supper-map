
import React, { useState } from 'react';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileContent from '@/components/profile/ProfileContent';

const Profile = () => {
  const [user] = useState(currentUser);

  return (
    <ProfileLayout user={user} activeTab="profile">
      <ProfileContent 
        user={user} 
        clubs={sampleSupperClubs} 
        badges={badges} 
        isCurrentUser={true}
        showListsSection={true}
      />
    </ProfileLayout>
  );
};

export default Profile;
