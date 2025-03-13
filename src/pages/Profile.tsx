
import React, { useState, useEffect } from 'react';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileContent from '@/components/profile/ProfileContent';

const Profile = () => {
  const [user] = useState(currentUser);
  
  // Adding console log to debug
  useEffect(() => {
    console.log('Profile page rendering with user:', user);
    console.log('All sections should be visible, including StatusSection');
  }, [user]);

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
