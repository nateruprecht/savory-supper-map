
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

type ProfileHeaderProps = {
  user: UserProfile;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // Extract first name and last name (mock implementation)
  const nameParts = user.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  // Mock city and state
  const city = "City";
  const state = "State";
  
  // Format join date
  const joinDate = new Date(user.joinDate);
  const joinMonth = joinDate.toLocaleString('default', { month: 'long' });
  const joinYear = joinDate.getFullYear();
  const joinDateFormatted = `Joined ${joinMonth} ${joinYear}`;

  // Generate username from name (for example purposes)
  const username = `@${firstName.toLowerCase()}${lastName.toLowerCase()}`;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Banner section with joined date and location */}
      <div className="bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{joinDateFormatted}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{city}, {state}</span>
          <MapPin className="h-4 w-4 ml-1" />
        </div>
      </div>
      
      {/* Profile picture overlapping the banner */}
      <div className="flex justify-center -mt-12 relative z-10">
        <Avatar className="h-24 w-24 border-4 border-white">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Name and username */}
      <div className="text-center pb-5 pt-2">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{username}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
