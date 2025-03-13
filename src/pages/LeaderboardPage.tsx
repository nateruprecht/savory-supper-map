
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, leaderboard } from '@/lib/data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Leaderboard from '@/components/Leaderboard';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Trophy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Get top 3 users for visualization
  const topThreeUsers = [...overallLeaderboard]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full px-4 sm:max-w-xl sm:mx-auto sm:p-4 pb-16 md:pb-0"
        >
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-semibold font-display">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">
              See how you stack up against other food explorers in the
              Midwest, your state, and your city
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8 bg-muted/50">
              <TabsTrigger value="overall" className="rounded-full">Overall</TabsTrigger>
              <TabsTrigger value="state" className="rounded-full">State</TabsTrigger>
              <TabsTrigger value="city" className="rounded-full">City</TabsTrigger>
            </TabsList>
            
            {/* Top 3 Visualization */}
            <div className="flex justify-center items-end mb-8 mt-4 gap-3 h-48">
              {topThreeUsers.map((user, index) => {
                // Determine height based on rank
                const heights = ['h-36', 'h-40', 'h-32'];
                const height = heights[index] || 'h-28'; 
                
                // Position users in order: 2nd, 1st, 3rd
                const displayIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
                
                return (
                  <div key={user.id} className="flex flex-col items-center">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium mt-1 truncate w-20">{user.name}</span>
                      <span className="text-sm font-bold">{user.totalVisits} Clubs</span>
                    </div>
                    <div 
                      className={`${height} w-14 bg-primary/90 rounded-t-lg flex items-center justify-center relative`}
                    >
                      <span className="absolute -bottom-6 text-lg font-bold">#{user.rank}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="font-display text-lg font-semibold mb-3 flex items-center">
              <Trophy className="w-5 h-5 text-amber-500 mr-2" />
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Leaderboard
            </div>
            
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

            <div className="mt-6 text-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Your Ranking on Facebook
              </Button>
            </div>
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
