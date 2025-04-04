import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupperClub } from '@/lib/types';
import { Check } from 'lucide-react';
import SupperClubReviewForm from '@/components/reviews/SupperClubReviewForm';
import ClubImageGallery from './ClubImageGallery';
import ClubInfoDetails from './ClubInfoDetails';
import ClubSpecialties from './ClubSpecialties';
import ClubReviewsSection from './ClubReviewsSection';
import ClubFooterActions from './ClubFooterActions';
import { Button } from '@/components/ui/button';

type ClubDetailsProps = {
  club: SupperClub;
  onClose: () => void;
  onVisitToggle: () => void;
  isOpen: boolean;
};

const ClubDetails: React.FC<ClubDetailsProps> = ({ 
  club, 
  onClose, 
  onVisitToggle,
  isOpen
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const images = [
    club.image,
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareClub = () => {
    alert('Sharing is not implemented in this demo');
  };
  
  const handleReviewSubmit = (data: any) => {
    console.log('Review submitted:', data);
    setShowReviewForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              ref={detailsRef}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-background rounded-t-xl sm:rounded-xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <ClubImageGallery
                images={images}
                currentImageIndex={currentImageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
                onClose={onClose}
                visited={club.visited}
              />
              
              <div className="flex-1 overflow-y-auto p-4">
                <ClubInfoDetails club={club} />
                
                <div className="my-4">
                  <Button 
                    onClick={onVisitToggle}
                    className="w-full"
                    variant={club.visited ? "outline" : "default"}
                  >
                    {club.visited ? (
                      <><Check className="mr-2 h-4 w-4" /> Marked as Visited</>
                    ) : (
                      "Mark as Visited"
                    )}
                  </Button>
                </div>
                
                <ClubSpecialties specialties={club.specialties} />
                
                <ClubReviewsSection 
                  reviews={club.reviews}
                  onOpenReviewForm={() => setShowReviewForm(true)}
                />
              </div>
              
              <ClubFooterActions
                clubName={club.name}
                visited={!!club.visited}
                onShare={shareClub}
                onVisitToggle={onVisitToggle}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SupperClubReviewForm
        open={showReviewForm}
        onOpenChange={setShowReviewForm}
        onSubmit={handleReviewSubmit}
        clubs={[club]}
        preselectedClub={club}
      />
    </>
  );
};

export default ClubDetails;
