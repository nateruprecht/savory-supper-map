
import React from 'react';
import { UserProfile } from '@/lib/types';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

type StatusSectionProps = {
  user: UserProfile;
  isCurrentUser?: boolean;
};

const StatusSection: React.FC<StatusSectionProps> = ({ user, isCurrentUser = true }) => {
  const joinDate = new Date(user.joinDate);
  const formatJoinDate = !isNaN(joinDate.getTime()) 
    ? format(joinDate, 'MMMM yyyy')
    : 'Unknown';
  
  const rankOrdinal = (rank: number) => {
    const j = rank % 10;
    const k = rank % 100;
    if (j === 1 && k !== 11) return `${rank}st`;
    if (j === 2 && k !== 12) return `${rank}nd`;
    if (j === 3 && k !== 13) return `${rank}rd`;
    return `${rank}th`;
  };

  // Personalize the text based on whether we're viewing our own profile or someone else's
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
      ? `You're currently ranked ${rankOrdinal(user.rank)} in the leaderboard.` 
      : `${user.name} is currently ranked ${rankOrdinal(user.rank)} in the leaderboard.`;
  };

  const getJoinText = () => {
    return isCurrentUser
      ? `You joined in ${formatJoinDate}.`
      : `${user.name} joined in ${formatJoinDate}.`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <div className="space-y-3">
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
