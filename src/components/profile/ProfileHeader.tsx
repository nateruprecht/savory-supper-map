
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      {/* Banner section with background image */}
      <div 
        className="h-32 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="h-full w-full bg-black/30 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Profile picture overlapping the banner */}
      <div className="flex justify-center -mt-20 relative z-10">
        <Avatar className="h-24 w-24 border-4 border-white">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Date joined and location information - moved below avatar to prevent overlap */}
      <div className="flex flex-wrap justify-between items-start px-4 py-2 text-xs text-muted-foreground mt-4">
        <div className="flex items-start min-w-[80px] mr-2">
          <Calendar className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
          <span className="break-words">{joinDateFormatted}</span>
        </div>
        
        <div className="flex items-start min-w-[80px]">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
          <span className="break-words">{city}, {state}</span>
        </div>
      </div>
      
      {/* Name and username */}
      <div className="text-center pb-4 pt-2">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{username}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
