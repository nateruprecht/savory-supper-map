
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupperClub } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ClubCard from '@/components/ClubCard';
import { toast } from 'sonner';

type NearbyClubsCardProps = {
  clubs: SupperClub[];
};

const NearbyClubsCard: React.FC<NearbyClubsCardProps> = ({ clubs }) => {
  const navigate = useNavigate();
  
  // For a real implementation, this would use geolocation to find nearby clubs
  // For now, we'll just display the first 5 clubs
  const nearbyClubs = clubs.slice(0, 5);
  
  const handleClubSelect = (club: SupperClub) => {
    // In a real app, this would navigate to the club details page
    toast.info(`Selected ${club.name}`);
  };
  
  const handleVisitToggle = (clubId: string) => {
    // In a real app, this would mark the club as visited
    toast.success(`Toggled visit status for club ID: ${clubId}`);
  };
  
  const handleViewAll = () => {
    navigate('/discover');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-1 md:col-span-2"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-supper-red" />
            Nearby Clubs
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewAll}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">View All</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {nearbyClubs.map((club) => (
                <CarouselItem key={club.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ClubCard 
                      club={club} 
                      onClick={() => handleClubSelect(club)} 
                      onVisitToggle={() => handleVisitToggle(club.id)}
                      compact={true}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NearbyClubsCard;
