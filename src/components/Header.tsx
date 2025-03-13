
import React from 'react';
import { UserProfile } from '@/lib/types';
import { Bell, User, Menu, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  user: UserProfile;
  onProfileClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ user, onProfileClick }) => {
  const isMobile = useIsMobile();
  const { user: authUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/auth');
  };
  
  const handleLogoutClick = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 bg-background/70 backdrop-blur-lg border-b border-border flex items-center justify-between animate-slide-down">
      <div className="flex items-center">
        <div className="font-medium text-lg sm:text-xl tracking-tight truncate max-w-[200px] sm:max-w-none">
          {isMobile ? 'Supper Club' : 'Supper Club Roadmap'}
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {authUser ? (
          <>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div 
                  className="flex items-center space-x-2 cursor-pointer" 
                  aria-label="User profile"
                >
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
