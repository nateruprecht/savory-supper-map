import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, sampleSupperClubs } from '@/lib/data';
import { SupperClub } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MapView from '@/components/MapView';
import DiscoverList from '@/components/discover/DiscoverList';
import InfoSection from '@/components/discover/InfoSection';
import ClubDetails from '@/components/ClubDetails';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Discover = () => {
  const [user, setUser] = useState(currentUser);
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [clubs, setClubs] = useState(sampleSupperClubs);
  const navigate = useNavigate();
  
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
      
      setUser({
        ...user,
        clubsVisited: updatedClubsVisited,
        totalVisits: updatedClubsVisited.length,
      });
    }
  };
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <div className="md:grid md:grid-cols-5 md:gap-4 md:p-4 h-full">
          <div className="md:col-span-3 h-[50vh] md:h-[calc(100vh-8rem)] relative">
            <MapView
              clubs={clubs}
              onClubSelect={handleClubSelect}
            />
          </div>
          
          <div className="md:col-span-2 px-4 md:px-0 py-6 md:py-0 space-y-4 md:overflow-y-auto md:max-h-[calc(100vh-8rem)] md:pb-4">
            <DiscoverList 
              clubs={clubs}
              onClubSelect={handleClubSelect}
              onVisitToggle={handleVisitToggle}
            />
            
            <InfoSection />
          </div>
        </div>
      </main>
      
      <Navigation
        activeTab="discover"
        onTabChange={handleTabChange}
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

export default Discover;
