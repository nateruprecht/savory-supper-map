
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 pb-16 md:pb-0"
        >
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">Supper Club Roadmap</h1>
            <p className="text-muted-foreground italic">
              "Savor the Midwest, One Supper Club at a Time."
            </p>
          </div>
          
          <div className="space-y-6">
            <StatusSection user={user} />
            <BadgesSection user={user} badges={badges} limit={6} />
            <ReviewsSection user={user} clubs={sampleSupperClubs} />
          </div>
        </motion.div>
      </main>
      
      <Navigation
        activeTab="home"
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Home;
