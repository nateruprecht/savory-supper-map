
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupperClub } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type NearbyClubsCardProps = {
  clubs: SupperClub[];
};

const NearbyClubsCard: React.FC<NearbyClubsCardProps> = ({ clubs }) => {
  const navigate = useNavigate();
  
  // For a real implementation, this would use geolocation to find nearby clubs
  // For now, we'll just display the first 6 clubs
  const nearbyClubs = clubs.slice(0, 6);
  
  const handleClubSelect = (club: SupperClub) => {
    // In a real app, this would navigate to the club details page
    toast.info(`Selected ${club.name}`);
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
            <span className="text-xs">See All</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearbyClubs.map((club) => (
              <div 
                key={club.id} 
                className="cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                onClick={() => handleClubSelect(club)}
              >
                <div className="relative h-24 w-full">
                  <img 
                    src={club.image} 
                    alt={club.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
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
