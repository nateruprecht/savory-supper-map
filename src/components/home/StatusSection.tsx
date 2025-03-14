
import React from 'react';
import { UserProfile } from '@/lib/types';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

type StatusSectionProps = {
  user: UserProfile;
  clubs?: any[];
  isCurrentUser?: boolean;
};

// Helper function for formatting join date
const formatUserJoinDate = (dateString: string): string => {
  const joinDate = new Date(dateString);
  return !isNaN(joinDate.getTime()) 
    ? format(joinDate, 'MMMM yyyy')
    : 'Unknown';
};

/**
 * StatusSection component displays user's visit stats, rank, and join date
 */
const StatusSection: React.FC<StatusSectionProps> = ({ user, isCurrentUser = true }) => {
  // Format join date
  const formatJoinDate = formatUserJoinDate(user.joinDate);
  
  // Text generators for different parts
  const getVisitText = () => {
    if (user.totalVisits === 0) {
      return isCurrentUser 
        ? "You haven't visited any supper clubs yet." 
        : `${user.name} hasn't visited any supper clubs yet.`;
    } else if (user.totalVisits === 1) {
      return isCurrentUser 
        ? "You've visited 1 supper club." 
        : `${user.name} has visited 1 supper club.`;
    } else {
      return isCurrentUser 
        ? `You've visited ${user.totalVisits} supper clubs.` 
        : `${user.name} has visited ${user.totalVisits} supper clubs.`;
    }
  };

  const getRankText = () => {
    if (user.rank === 0) {
      return isCurrentUser
        ? "Your rank will appear once you start visiting clubs."
        : `${user.name}'s rank will appear once they start visiting clubs.`;
    }
    
    return isCurrentUser 
      ? `You're currently ranked ${user.rank}${getRankSuffix(user.rank)} in the leaderboard.` 
      : `${user.name} is currently ranked ${user.rank}${getRankSuffix(user.rank)} in the leaderboard.`;
  };

  const getJoinText = () => {
    return isCurrentUser
      ? `You joined in ${formatJoinDate}.`
      : `${user.name} joined in ${formatJoinDate}.`;
  };
  
  // Helper function to get ordinal suffix for rank
  const getRankSuffix = (rank: number): string => {
    const j = rank % 10;
    const k = rank % 100;
    
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full max-w-full box-border" data-testid="status-section">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Status
        </h2>
      </div>
      
      {/* Visit and Join Info */}
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base">{getVisitText()} {getRankText()}</p>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base">{getJoinText()}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
