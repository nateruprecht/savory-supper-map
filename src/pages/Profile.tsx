
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ListsSection from '@/components/profile/ListsSection';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => {}} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 pb-16 md:pb-0"
        >
          <div className="space-y-6">
            <ProfileHeader user={user} />
            <ProfileStats user={user} clubs={sampleSupperClubs} />
            <StatusSection user={user} />
            <BadgesSection user={user} badges={badges} />
            <ReviewsSection user={user} clubs={sampleSupperClubs} />
            <ListsSection user={user} clubs={sampleSupperClubs} />
          </div>
        </motion.div>
      </main>
      
      <Navigation
        activeTab="profile"
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Profile;
