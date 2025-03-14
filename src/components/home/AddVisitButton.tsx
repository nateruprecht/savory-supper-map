
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { toast } from 'sonner';
import ClubDetails from '@/components/ClubDetails';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddClubForm from './addVisit/AddClubForm';
import AddVisitDialog from './addVisit/AddVisitDialog';
import useClickOutside from '@/hooks/useClickOutside';

type AddVisitButtonProps = {
  clubs: SupperClub[];
};

const AddVisitButton: React.FC<AddVisitButtonProps> = ({ clubs }) => {
  // Menu state
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const { ref: menuRef } = useClickOutside<HTMLDivElement>(() => setIsAddMenuOpen(false), isAddMenuOpen);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SupperClub[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Dialog state
  const [activeTab, setActiveTab] = useState("visit");
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [showClubDetails, setShowClubDetails] = useState(false);
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddVisitClick = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
    resetSearch();
  };

  const resetSearch = () => {
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
    } else {
      setShowReviewForm(true);
    }
    setIsAddMenuOpen(false);
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
  
  return (
    <>
      {/* Add Visit Button */}
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

        {/* Add Visit Menu */}
        {isAddMenuOpen && (
          <AddVisitDialog
            menuRef={menuRef}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            handleSearch={handleSearch}
            handleSelectClub={handleSelectClub}
            handleAddNew={handleAddNew}
          />
        )}
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

      {/* Add New Club Form Dialog */}
      <Dialog open={showAddNewForm} onOpenChange={setShowAddNewForm}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-4 py-2 px-1">
            <h2 className="text-xl font-semibold">Add New Supper Club</h2>
            <AddClubForm onClose={handleCloseAddNewForm} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Form Dialog */}
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
