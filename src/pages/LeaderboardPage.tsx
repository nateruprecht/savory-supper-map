
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, leaderboard } from '@/lib/data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Leaderboard from '@/components/Leaderboard';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const LeaderboardPage = () => {
  const [user] = useState(currentUser);
  const [activeTab, setActiveTab] = useState('overall');
  const navigate = useNavigate();
  
  // Mock different leaderboards
  const overallLeaderboard = leaderboard;
  const stateLeaderboard = [...leaderboard].sort(() => Math.random() - 0.5);
  const cityLeaderboard = [...leaderboard].sort(() => Math.random() - 0.5);
  
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
          <div className="mb-5 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">See how you stack up against other travelers</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="state">State</TabsTrigger>
              <TabsTrigger value="city">City</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overall" className="animate-fade-in">
              <Leaderboard
                entries={overallLeaderboard}
                currentUserId={user.id}
                filterOptions={{
                  states: ['Wisconsin', 'Minnesota', 'Michigan', 'Iowa', 'Illinois'],
                }}
              />
            </TabsContent>
            
            <TabsContent value="state" className="animate-fade-in">
              <Leaderboard
                entries={stateLeaderboard}
                currentUserId={user.id}
                filterOptions={{
                  states: ['Wisconsin', 'Minnesota', 'Michigan', 'Iowa', 'Illinois'],
                }}
              />
            </TabsContent>
            
            <TabsContent value="city" className="animate-fade-in">
              <Leaderboard
                entries={cityLeaderboard}
                currentUserId={user.id}
                filterOptions={{
                  cities: ['Madison', 'Wausau', 'Minocqua', 'Kenosha', 'Mercer'],
                }}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Navigation
        activeTab="leaderboard"
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default LeaderboardPage;
