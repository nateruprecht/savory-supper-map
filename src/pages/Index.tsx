import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { currentUser, sampleSupperClubs, badges, leaderboard } from '@/lib/data';
import { SupperClub } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MapView from '@/components/MapView';
import ClubCard from '@/components/ClubCard';
import Badge from '@/components/Badge';
import Leaderboard from '@/components/Leaderboard';
import ClubDetails from '@/components/ClubDetails';
import ProgressBar from '@/components/ProgressBar';
import { CupSoda, Trophy, Award, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [clubs, setClubs] = useState(sampleSupperClubs);
  const [user, setUser] = useState(currentUser);
  const isMobile = useIsMobile();
  
  const handleClubSelect = (club: SupperClub) => {
    setSelectedClub(club);
  };
  
  const handleCloseDetails = () => {
    setSelectedClub(null);
  };
  
  const handleVisitToggle = (clubId: string) => {
    setClubs(prev => prev.map(club => 
      club.id === clubId 
        ? { ...club, visited: !club.visited } 
        : club
    ));
    
    const updatedClub = clubs.find(club => club.id === clubId);
    if (updatedClub) {
      const wasVisited = updatedClub.visited;
      const updatedClubsVisited = wasVisited
        ? user.clubsVisited.filter(id => id !== clubId)
        : [...user.clubsVisited, clubId];
      
      const totalVisits = updatedClubsVisited.length;
      
      const updatedBadges = badges.filter(badge => 
        totalVisits >= badge.requiredVisits
      );
      
      setUser({
        ...user,
        clubsVisited: updatedClubsVisited,
        totalVisits,
        badges: updatedBadges,
      });
    }
  };

  const progressPercentage = (user.totalVisits / clubs.length) * 100;
  
  const visitedClubs = clubs.filter(club => club.visited);
  const unvisitedClubs = clubs.filter(club => !club.visited);

  useEffect(() => {
    if (isMobile !== undefined) {
      setActiveTab(isMobile ? 'map' : 'home');
    }
  }, [isMobile]);

  const renderHomeTab = () => (
    <div className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 animate-fade-in pb-16 md:pb-0">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Supper Club Roadmap</h1>
        <p className="text-muted-foreground italic">
          "Savor the Midwest, One Supper Club at a Time."
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
            <CupSoda className="h-5 w-5 mr-2 text-primary" />
            Your Progress
          </h2>
          
          <div className="mb-5 sm:mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm font-medium">
                Clubs Visited: {user.totalVisits} of {clubs.length}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <ProgressBar progress={progressPercentage} size="lg" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-1">{user.totalVisits}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Clubs Visited</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-1">{user.badges.length}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Badges Earned</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-1">#{user.rank}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Leaderboard Rank</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Visits</h2>
          
          {visitedClubs.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {visitedClubs.slice(0, 2).map(club => (
                <ClubCard
                  key={club.id}
                  club={club}
                  onClick={() => handleClubSelect(club)}
                  onVisitToggle={() => handleVisitToggle(club.id)}
                  compact
                />
              ))}
              
              {visitedClubs.length > 2 && (
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setActiveTab('map')}
                >
                  View All Visited Clubs
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <MapPin className="h-10 sm:h-12 w-10 sm:w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-4">You haven't visited any supper clubs yet.</p>
              <Button onClick={() => setActiveTab('map')}>Explore Map</Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-0">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recommended For You</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {unvisitedClubs.slice(0, 3).map(club => (
              <ClubCard
                key={club.id}
                club={club}
                onClick={() => handleClubSelect(club)}
                onVisitToggle={() => handleVisitToggle(club.id)}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBadgesTab = () => (
    <div className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 animate-fade-in pb-16 md:pb-0">
      <div className="mb-5 sm:mb-6 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold">Your Badges</h1>
        <p className="text-sm text-muted-foreground">Collect badges as you visit more supper clubs</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Achievements
          </h2>
          <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
            You've earned {user.badges.length} of {badges.length} badges
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {badges.map(badge => (
              <Badge
                key={badge.id}
                badge={badge}
                earned={user.badges.some(b => b.id === badge.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-0">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Challenges
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="border rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-1 sm:mb-2">Wisconsin Explorer</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                Visit 5 supper clubs in Wisconsin
              </p>
              <ProgressBar
                progress={(visitedClubs.filter(club => club.state === 'Wisconsin').length / 5) * 100}
                label={`${visitedClubs.filter(club => club.state === 'Wisconsin').length} of 5 completed`}
                colorClass="bg-primary"
              />
            </div>
            
            <div className="border rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-1 sm:mb-2">Seafood Connoisseur</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                Visit 3 supper clubs known for seafood
              </p>
              <ProgressBar
                progress={(visitedClubs.filter(club => 
                  club.specialties.some(s => ['Seafood', 'Fish Fry', 'Perch'].includes(s))
                ).length / 3) * 100}
                label={`${visitedClubs.filter(club => 
                  club.specialties.some(s => ['Seafood', 'Fish Fry', 'Perch'].includes(s))
                ).length} of 3 completed`}
                colorClass="bg-primary"
              />
            </div>
            
            <div className="border rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-1 sm:mb-2">Weekend Warrior</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                Visit 2 supper clubs in a single weekend
              </p>
              <ProgressBar
                progress={0}
                label="0 of 2 completed"
                colorClass="bg-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMapTab = () => (
    <div className="w-full h-full animate-fade-in">
      <MapView
        clubs={clubs}
        onClubSelect={handleClubSelect}
      />
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 animate-fade-in pb-16 md:pb-0">
      <div className="mb-5 sm:mb-6 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">See how you stack up against other travelers</p>
      </div>
      
      <Leaderboard
        entries={leaderboard}
        currentUserId={user.id}
        filterOptions={{
          states: ['Wisconsin', 'Minnesota', 'Michigan', 'Iowa', 'Illinois'],
          counties: ['Dane', 'Marathon', 'Oneida', 'Kenosha', 'Iron'],
          cities: ['Madison', 'Wausau', 'Minocqua', 'Kenosha', 'Mercer'],
        }}
      />
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'badges':
        return renderBadgesTab();
      case 'map':
        return renderMapTab();
      case 'leaderboard':
        return renderLeaderboardTab();
      default:
        return renderHomeTab();
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => {}} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 h-full flex items-start justify-center"
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {selectedClub && (
        <ClubDetails
          club={selectedClub}
          onClose={handleCloseDetails}
          onVisitToggle={() => handleVisitToggle(selectedClub.id)}
          isOpen={!!selectedClub}
        />
      )}
    </div>
  );
};

export default Index;
