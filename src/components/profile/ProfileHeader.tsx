
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
  const city = "Madison";
  const state = "Wisconsin";
  
  // Format join date
  const joinDateFormatted = formatDistanceToNow(new Date(user.joinDate), { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="ml-4 sm:ml-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">{user.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{city}, {state}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Joined {joinDateFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
