
import React, { useState } from 'react';
import { SupperClub, Review } from '@/lib/types';
import { 
  MapPin, Star, Calendar, Phone, Globe, Clock, X, 
  Check, ThumbsUp, MessageCircle, ChevronLeft, ChevronRight,
  Share2, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ClubDetailsProps = {
  club: SupperClub;
  onClose: () => void;
  onVisitToggle: () => void;
  isOpen: boolean;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={cn(
            "h-4 w-4 mr-0.5",
            star <= rating 
              ? "text-amber-500 fill-amber-500" 
              : "text-gray-300"
          )} 
        />
      ))}
    </div>
  );
};

const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div className="p-4 border-b border-border last:border-0">
      <div className="flex items-start">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="h-10 w-10 rounded-full mr-3 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{review.userName}</h4>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="text-sm mt-2">{review.comment}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Food</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.foodRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Service</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.serviceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">Ambience</div>
              <div className="flex items-center">
                <span className="font-medium mr-1">{review.ambienceRating}</span>
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-3 space-x-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <MessageCircle className="h-3 w-3 mr-1" /> Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClubDetails: React.FC<ClubDetailsProps> = ({ 
  club, 
  onClose, 
  onVisitToggle,
  isOpen
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock multiple images for the image gallery
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
    // In a real app, this would open a share dialog
    alert('Sharing is not implemented in this demo');
  };

  return (
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
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-background rounded-t-xl sm:rounded-xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                
                {/* Image Indicator */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    <div className="flex space-x-1 px-2 py-1 bg-black/40 rounded-full">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Visited Badge */}
              {club.visited && (
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Visited</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-2xl font-semibold mb-1">{club.name}</h2>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-3">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-medium">{club.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({club.reviews.length} reviews)
                  </span>
                </div>
                
                {/* Location */}
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>
                    {club.city}, {club.state}
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {club.description}
              </p>
              
              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <span className="text-muted-foreground">Open Hours:</span>
                    <div>{club.openHours}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <div>{club.phoneNumber}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <div>{club.address}, {club.city}, {club.state}</div>
                  </div>
                </div>
                
                {club.website && (
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                    <div>
                      <span className="text-muted-foreground">Website:</span>
                      <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block">
                        {club.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {club.specialties.map((specialty) => (
                    <span key={specialty} className="badge bg-secondary text-secondary-foreground">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Reviews</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Write a Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-center text-muted-foreground">
                          This feature would be implemented in a complete version.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {club.reviews.length > 0 ? (
                  <div className="border rounded-lg divide-y overflow-hidden">
                    {club.reviews.map((review) => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={shareClub}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Award className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Earn Badges</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-muted-foreground">
                        Visit this club to earn progress toward badges!
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Button 
                onClick={onVisitToggle}
                className={cn(
                  club.visited ? "bg-success-500 hover:bg-success-600" : ""
                )}
              >
                {club.visited ? (
                  <>
                    <Check className="h-4 w-4 mr-2" /> Visited
                  </>
                ) : (
                  "Mark as Visited"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClubDetails;
