
import React from 'react';
import { UserProfile } from '@/lib/types';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  user: UserProfile;
  onProfileClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ user, onProfileClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-background/70 backdrop-blur-lg border-b border-border flex items-center justify-between animate-slide-down">
      <div className="flex items-center">
        <div className="font-medium text-xl tracking-tight">Supper Club Roadmap</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 cursor-pointer" onClick={onProfileClick}>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
