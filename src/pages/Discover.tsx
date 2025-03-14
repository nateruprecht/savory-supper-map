
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddClubForm from '@/components/home/addVisit/AddClubForm';
import SearchBar from '@/components/home/addVisit/SearchBar';
import SearchResults from '@/components/home/addVisit/SearchResults';

const Discover = () => {
  const [user, setUser] = useState(currentUser);
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [clubs, setClubs] = useState(sampleSupperClubs);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [addClubFormOpen, setAddClubFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SupperClub[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addVisitOpen, setAddVisitOpen] = useState(false);
  const navigate = useNavigate();

  const handleClubSelect = (club: SupperClub) => {
    setSelectedClub(club);
  };

  const handleCloseDetails = () => {
    setSelectedClub(null);
  };

  const handleVisitToggle = (clubId: string) => {
    setClubs(prev => prev.map(club => club.id === clubId ? {
      ...club,
      visited: !club.visited
    } : club));
    const updatedClub = clubs.find(club => club.id === clubId);
    if (updatedClub) {
      const wasVisited = updatedClub.visited;
      const updatedClubsVisited = wasVisited ? user.clubsVisited.filter(id => id !== clubId) : [...user.clubsVisited, clubId];
      setUser({
        ...user,
        clubsVisited: updatedClubsVisited,
        totalVisits: updatedClubsVisited.length
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

  const handleCloseAddForm = () => {
    setAddClubFormOpen(false);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      const results = clubs.filter(club => 
        club.name.toLowerCase().includes(query.toLowerCase()) ||
        club.city.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  
  const handleSelectClub = (club: SupperClub) => {
    setSelectedClub(club);
    setAddVisitOpen(false);
  };
  
  const handleAddNew = () => {
    setAddClubFormOpen(true);
    setAddVisitOpen(false);
  };

  return <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        <div className="md:grid md:grid-cols-5 md:gap-4 md:p-4 h-full">
          <div className="md:col-span-3 h-[50vh] md:h-[calc(100vh-8rem)] relative">
            <MapView clubs={clubs} onClubSelect={handleClubSelect} />
          </div>
          
          <div className="flex flex-row md:col-span-2 gap-2 py-4 px-4">
            <Button variant="outline" className="flex-1" onClick={() => setAddVisitOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add a Visit
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setReviewFormOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" /> Review a Club
            </Button>
          </div>
          
          <div className="md:col-span-2 px-4 md:px-0 md:py-0 space-y-4 md:overflow-y-auto md:max-h-[calc(100vh-8rem)] md:pb-4 py-0 my-px">
            <DiscoverList clubs={clubs} onClubSelect={handleClubSelect} onVisitToggle={handleVisitToggle} />
          </div>
        </div>
      </main>
      
      <Navigation activeTab="discover" onTabChange={handleTabChange} />
      
      {selectedClub && <ClubDetails club={selectedClub} onClose={handleCloseDetails} onVisitToggle={() => handleVisitToggle(selectedClub.id)} isOpen={!!selectedClub} />}

      {/* Add Visit Search Dialog */}
      <Dialog open={addVisitOpen} onOpenChange={setAddVisitOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-4 py-2 px-1">
            <SearchBar
              title="Add a Visit - Search Clubs or Add a New Club"
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onAddNew={handleAddNew}
            />
            
            <SearchResults
              isSearching={isSearching}
              searchQuery={searchQuery}
              searchResults={searchResults}
              onSelectClub={handleSelectClub}
              onAddNew={handleAddNew}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Club Form Dialog */}
      <Dialog open={addClubFormOpen} onOpenChange={setAddClubFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-4 py-2 px-1">
            <h2 className="text-xl font-semibold">Add New Supper Club</h2>
            <AddClubForm onClose={handleCloseAddForm} />
          </div>
        </DialogContent>
      </Dialog>

      <SupperClubReviewForm open={reviewFormOpen} onOpenChange={setReviewFormOpen} onSubmit={handleReviewSubmit} clubs={clubs} />
    </div>;
};

export default Discover;
