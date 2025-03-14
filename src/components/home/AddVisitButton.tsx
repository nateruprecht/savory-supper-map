
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X, MapPin } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ClubDetails from '@/components/ClubDetails';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';

type AddVisitButtonProps = {
  clubs: SupperClub[];
};

const AddVisitButton: React.FC<AddVisitButtonProps> = ({ clubs }) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SupperClub[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("visit");
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [showClubDetails, setShowClubDetails] = useState(false);
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  const handleAddVisitClick = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    setSelectedClub(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      // Filter clubs based on the search query
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
    setShowClubDetails(true);
    setIsAddMenuOpen(false);
  };
  
  const handleAddNew = () => {
    if (activeTab === "visit") {
      setShowAddNewForm(true);
      setIsAddMenuOpen(false);
    } else {
      setShowReviewForm(true);
      setIsAddMenuOpen(false);
    }
  };
  
  const handleClubDetailsClose = () => {
    setShowClubDetails(false);
  };
  
  const handleVisitToggle = () => {
    toast.success(`Updated visit status for ${selectedClub?.name}`);
    setShowClubDetails(false);
  };
  
  const handleReviewSubmit = (data: any) => {
    console.log('Review submitted:', data);
    toast.success('Review submitted successfully!');
    setShowReviewForm(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
    };

    if (isAddMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddMenuOpen]);
  
  return (
    <>
      <div className="fixed bottom-20 right-6 z-40 md:bottom-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-14 w-14 rounded-full bg-supper-red text-white shadow-lg flex items-center justify-center"
          onClick={handleAddVisitClick}
          aria-label="Add a visit or review"
        >
          <Plus className="h-7 w-7" />
        </motion.button>

        <AnimatePresence>
          {isAddMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute bottom-16 right-0 w-[330px] bg-white rounded-lg shadow-lg p-4"
            >
              <Tabs defaultValue="visit" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="visit">Add Visit</TabsTrigger>
                  <TabsTrigger value="review">Add Review</TabsTrigger>
                </TabsList>
                
                <TabsContent value="visit" className="mt-0">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Search or add Supper Club</h3>
                      <Button 
                        type="button" 
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleAddNew}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search supper clubs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {isSearching && (
                    <div className="max-h-[200px] overflow-y-auto border rounded-md mb-3">
                      {searchResults.length > 0 ? (
                        searchResults.map(club => (
                          <button
                            key={club.id}
                            className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md text-left border-b last:border-0"
                            onClick={() => handleSelectClub(club)}
                          >
                            <div className="w-10 h-10 rounded overflow-hidden mr-3">
                              <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{club.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" /> {club.city}, {club.state}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500 mb-2">No results found</p>
                          <Button
                            size="sm"
                            onClick={handleAddNew}
                            className="w-full text-sm"
                          >
                            Add as new supper club
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!isSearching && searchQuery.length > 0 && (
                    <div className="flex justify-end mt-3">
                      <Button
                        size="sm"
                        onClick={handleAddNew}
                        className="text-sm"
                      >
                        Add as new supper club
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="review" className="mt-0">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Search or add Supper Club to review</h3>
                      <Button 
                        type="button" 
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleAddNew}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search supper clubs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {isSearching && (
                    <div className="max-h-[200px] overflow-y-auto border rounded-md mb-3">
                      {searchResults.length > 0 ? (
                        searchResults.map(club => (
                          <button
                            key={club.id}
                            className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md text-left border-b last:border-0"
                            onClick={() => handleSelectClub(club)}
                          >
                            <div className="w-10 h-10 rounded overflow-hidden mr-3">
                              <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{club.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" /> {club.city}, {club.state}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500 mb-2">No results found</p>
                          <Button
                            size="sm"
                            onClick={handleAddNew}
                            className="w-full text-sm"
                          >
                            Add as new supper club
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!isSearching && searchQuery.length > 0 && (
                    <div className="flex justify-end mt-3">
                      <Button
                        size="sm"
                        onClick={handleAddNew}
                        className="text-sm"
                      >
                        Add as new supper club
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Club Details Dialog */}
      {selectedClub && (
        <ClubDetails 
          club={selectedClub}
          onClose={handleClubDetailsClose}
          onVisitToggle={handleVisitToggle}
          isOpen={showClubDetails}
        />
      )}

      {/* Add New Club & Review Form */}
      <SupperClubReviewForm
        open={showReviewForm}
        onOpenChange={setShowReviewForm}
        onSubmit={handleReviewSubmit}
        clubs={clubs}
      />
    </>
  );
};

export default AddVisitButton;
