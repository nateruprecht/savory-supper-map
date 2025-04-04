
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { toast } from 'sonner';
import ClubDetails from '@/components/clubDetails/ClubDetails';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';
import AddVisitMenu from './AddVisitMenu';
import AddClubForm from './AddClubForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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

  const handleCloseAddNewForm = () => {
    setShowAddNewForm(false);
  };

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
            <AddVisitMenu
              menuRef={menuRef}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={isSearching}
              searchResults={searchResults}
              handleSearch={handleSearch}
              handleSelectClub={handleSelectClub}
              handleAddNew={handleAddNew}
            />
          )}
        </AnimatePresence>
      </div>

      {selectedClub && (
        <ClubDetails 
          club={selectedClub}
          onClose={handleClubDetailsClose}
          onVisitToggle={handleVisitToggle}
          isOpen={showClubDetails}
        />
      )}

      <Dialog open={showAddNewForm} onOpenChange={setShowAddNewForm}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-4 py-2 px-1">
            <h2 className="text-xl font-semibold">Add New Supper Club</h2>
            <AddClubForm onClose={handleCloseAddNewForm} />
          </div>
        </DialogContent>
      </Dialog>

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
