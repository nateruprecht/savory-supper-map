
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

const SupperClubReviewForm: React.FC<SupperClubReviewFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  clubs,
  preselectedClub
}) => {
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
            
            {(showAddNew || selectedClub || preselectedClub) && (
              <>
                <RatingSliders form={form} />
                
                <ExtendedReview form={form} />
                
                <Button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
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
