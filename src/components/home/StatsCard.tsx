
import React from 'react';
import { motion } from 'framer-motion';
import { CupSoda, Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, SupperClub } from '@/lib/types';

type StatsCardProps = {
  user: UserProfile;
  clubs: SupperClub[];
};

const StatsCard: React.FC<StatsCardProps> = ({ user, clubs }) => {
  // Calculate number of reviews
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  ).length;
  
  // For demo purposes, assuming we're in Wisconsin - this would normally
  // come from user preferences or location data
  const defaultState = "Wisconsin";
  
  // Count clubs in the user's state (using default for now)
  const clubsInState = clubs.filter(club => 
    club.state === defaultState && 
    user.clubsVisited.includes(club.id)
  ).length;

  const stats = [
    {
      label: "Clubs Visited",
      value: user.totalVisits,
      icon: <CupSoda className="h-5 w-5 text-supper-red" />
    },
    {
      label: "Reviews Written",
      value: reviewedClubs,
      icon: <Star className="h-5 w-5 text-supper-amber" />
    },
    {
      label: `In ${defaultState}`,
      value: clubsInState,
      icon: <MapPin className="h-5 w-5 text-supper-brown" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-1 md:col-span-2"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg"
              >
                <div className="mb-1">{stat.icon}</div>
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
