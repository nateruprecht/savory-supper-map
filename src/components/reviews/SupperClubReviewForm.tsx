
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SupperClub } from '@/lib/types';
import { useReviewForm, ReviewFormValues } from '@/hooks/useReviewForm';
import ClubSearch from './ClubSearch';
import RatingSliders from './RatingSliders';
import ExtendedReview from './ExtendedReview';

type SupperClubReviewFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReviewFormValues) => void;
  clubs: SupperClub[];
  preselectedClub?: SupperClub;
};

/**
 * SupperClubReviewForm component
 * 
 * This modal form allows users to submit reviews for supper clubs.
 * It handles both reviewing existing clubs and adding reviews for new clubs.
 * 
 * The form is split into three main sections:
 * 1. Club selection/creation
 * 2. Rating sliders for numerical feedback
 * 3. Extended review with text comments
 */
const SupperClubReviewForm: React.FC<SupperClubReviewFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  clubs,
  preselectedClub
}) => {
  // Custom hook to manage form state and logic
  const {
    form,
    searchQuery,
    searchResults,
    isSearching,
    selectedClub,
    showAddNew,
    handleSearch,
    handleSelectClub,
    handleAddNew,
    handleSubmit
  } = useReviewForm({ clubs, preselectedClub, onSubmit });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Supper Club Review</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Club search and selection section */}
            <ClubSearch
              searchQuery={searchQuery}
              onSearch={handleSearch}
              isSearching={isSearching}
              searchResults={searchResults}
              onSelectClub={handleSelectClub}
              onAddNew={handleAddNew}
              form={form}
              selectedClub={selectedClub}
              showAddNew={showAddNew}
              preselectedClub={preselectedClub}
            />
            
            {/* Only show rating and review sections after club is selected or being added */}
            {(showAddNew || selectedClub || preselectedClub) && (
              <>
                <RatingSliders form={form} />
                
                <ExtendedReview form={form} />
                
                <Button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                  aria-label="Submit review"
                >
                  Submit Review
                </Button>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SupperClubReviewForm;
