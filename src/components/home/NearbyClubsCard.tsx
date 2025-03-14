
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupperClub } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type NearbyClubsCardProps = {
  clubs: SupperClub[];
};

const NearbyClubsCard: React.FC<NearbyClubsCardProps> = ({ clubs }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // For a real implementation, this would use geolocation to find nearby clubs
  // For now, we'll just display the first 10 clubs
  const nearbyClubs = clubs.slice(0, 10);
  
  const handleClubSelect = (club: SupperClub) => {
    // In a real app, this would navigate to the club details page
    toast.info(`Selected ${club.name}`);
  };
  
  const handleViewAll = () => {
    navigate('/discover');
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-1 md:col-span-2"
    >
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-supper-red" />
            Nearby Clubs
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollLeft}
              className="h-8 w-8 rounded-full hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="ghost" 
              size="icon"
              onClick={scrollRight}
              className="h-8 w-8 rounded-full hidden md:flex"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleViewAll}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">See All</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 space-x-4 hide-scrollbar snap-x snap-mandatory"
          >
            {nearbyClubs.map((club) => (
              <div 
                key={club.id} 
                className="flex-none w-64 cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow snap-start"
                onClick={() => handleClubSelect(club)}
              >
                <div className="relative h-32 w-full">
                  <img 
                    src={club.image} 
                    alt={club.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-white">
                  <h4 className="text-sm font-medium truncate">{club.name}</h4>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{club.city}</span>
                    <span className="mx-1">•</span>
                    <span>{Math.floor(Math.random() * 100) + 1} miles away</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NearbyClubsCard;
