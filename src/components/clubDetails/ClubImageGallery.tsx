
import React from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ClubImageGalleryProps = {
  images: string[];
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  onClose: () => void;
  visited?: boolean;
};

const ClubImageGallery: React.FC<ClubImageGalleryProps> = ({
  images,
  currentImageIndex,
  onNextImage,
  onPrevImage,
  onClose,
  visited,
}) => {
  return (
    <div className="relative">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Club image"
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNextImage}
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
      {visited && (
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
          <Check className="h-4 w-4 mr-1" />
          <span>Visited</span>
        </div>
      )}
    </div>
  );
};

export default ClubImageGallery;
