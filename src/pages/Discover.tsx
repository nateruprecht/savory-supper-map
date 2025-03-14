
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser, sampleSupperClubs } from '@/lib/data';
import { SupperClub } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
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
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="px-3 py-1 bg-red-100 text-supper-red rounded-full text-xs font-medium">
                Interactive Map
              </span>
              <h1 className="text-3xl font-display font-bold mt-4 mb-3 text-gray-800">
                Discover Supper Clubs Near You
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the rich culinary traditions of the Midwest through our interactive map. Find hidden gems and plan your next visit.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl overflow-hidden shadow-lg mb-8">
              <div className="grid md:grid-cols-3">
                <div className="bg-amber-100/50 p-6">
                  <h3 className="font-semibold text-supper-brown mb-4">Midwest Regions</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-supper-red mr-2" />
                        <span className="text-gray-800">Wisconsin</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">65 clubs</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-800">Minnesota</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">42 clubs</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-800">Michigan</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">38 clubs</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-800">Illinois</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">27 clubs</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-800">Iowa</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">18 clubs</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-supper-red flex items-center px-0"
                      onClick={() => navigate('/map')}
                    >
                      <span>Explore full map</span>
                      <span className="ml-1">→</span>
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 flex items-center justify-center">
                  <div className="relative w-full h-full min-h-[250px]">
                    <div className="absolute inset-0 bg-red-200/50 rounded-xl border-2 border-red-800/30" style={{
                      clipPath: "polygon(40% 10%, 70% 20%, 90% 40%, 80% 70%, 50% 90%, 20% 80%, 10% 40%, 20% 20%)"
                    }}>
                      {/* Sample pins */}
                      <div className="absolute top-[30%] left-[30%] h-3 w-3 rounded-full bg-white shadow-md"></div>
                      <div className="absolute top-[50%] left-[50%] h-3 w-3 rounded-full bg-white shadow-md"></div>
                      <div className="absolute top-[40%] left-[70%] h-3 w-3 rounded-full bg-white shadow-md"></div>
                      <div className="absolute top-[70%] left-[40%] h-3 w-3 rounded-full bg-white shadow-md"></div>
                      <div className="absolute top-[60%] left-[60%] h-3 w-3 rounded-full bg-white shadow-md"></div>
                      
                      {/* Highlighted pins */}
                      <div className="absolute top-[35%] left-[40%] h-4 w-4 rounded-full bg-red-800 shadow-md"></div>
                      <div className="absolute top-[45%] left-[55%] h-4 w-4 rounded-full bg-red-800 shadow-md"></div>
                    </div>
                    
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-sm text-sm font-medium text-supper-brown border border-amber-200">
                      Wisconsin
                      <div className="text-xs text-gray-500">65 supper clubs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <Button 
                className="bg-supper-red hover:bg-supper-red/90 text-white" 
                onClick={() => navigate('/map')}
              >
                <MapPin className="mr-2 h-4 w-4" /> View Interactive Map
              </Button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
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
