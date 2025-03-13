
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, sampleSupperClubs } from '@/lib/data';
import { SupperClub } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MapView from '@/components/MapView';
import DiscoverList from '@/components/discover/DiscoverList';
import ClubDetails from '@/components/ClubDetails';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Plus, MessageSquare } from 'lucide-react';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';

const Discover = () => {
  const [user, setUser] = useState(currentUser);
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [clubs, setClubs] = useState(sampleSupperClubs);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
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

  const handleReviewSubmit = (data: any) => {
    console.log('Review submitted:', data);
    setReviewFormOpen(false);
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
          
          <div className="flex justify-center gap-4 py-4 px-4 md:col-span-5">
            <Button 
              variant="outline" 
              className="flex-1 md:flex-none md:w-auto"
              onClick={() => navigate('/add-club')}
            >
              <Plus className="mr-2 h-4 w-4" /> Add a Club You've Visited
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 md:flex-none md:w-auto"
              onClick={() => setReviewFormOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Review a Club You've Visited
            </Button>
          </div>
          
          <div className="md:col-span-2 px-4 md:px-0 py-6 md:py-0 space-y-4 md:overflow-y-auto md:max-h-[calc(100vh-8rem)] md:pb-4">
            <DiscoverList 
              clubs={clubs}
              onClubSelect={handleClubSelect}
              onVisitToggle={handleVisitToggle}
            />
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

      <SupperClubReviewForm
        open={reviewFormOpen}
        onOpenChange={setReviewFormOpen}
        onSubmit={handleReviewSubmit}
        clubs={clubs}
      />
    </div>
  );
};

export default Discover;
