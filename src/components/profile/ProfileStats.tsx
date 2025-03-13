
import React from 'react';
import { UserProfile, SupperClub } from '@/lib/types';
import { CupSoda, Star } from 'lucide-react';

type ProfileStatsProps = {
  user: UserProfile;
  clubs: SupperClub[];
};

const ProfileStats: React.FC<ProfileStatsProps> = ({ user, clubs }) => {
  // Calculate number of reviews
  const reviewedClubs = clubs.filter(club => 
    club.reviews.some(review => review.userId === user.id)
  ).length;
  
  // Calculate average rating given by user
  const userReviews = clubs.flatMap(club => 
    club.reviews.filter(review => review.userId === user.id)
  );
  
  const averageRating = userReviews.length > 0
    ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length
    : 0;

  const stats = [
    {
      label: "Clubs Visited",
      value: user.totalVisits,
      icon: <CupSoda className="h-5 w-5 text-primary" />
    },
    {
      label: "Reviews Written",
      value: reviewedClubs,
      icon: <Star className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Statistics</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
