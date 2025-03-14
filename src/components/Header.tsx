
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
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-2.5 bg-background/80 backdrop-blur-lg border-b border-supper-amber/20 flex items-center justify-between animate-slide-down shadow-sm">
      <div className="flex items-center">
        <div className="font-display text-lg sm:text-xl font-medium tracking-tight truncate max-w-[200px] sm:max-w-none text-supper-brown">
          {isMobile ? 'Supper Club' : 'Supper Club Roadmap'}
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {authUser ? (
          <>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 hover:bg-supper-cream/50">
                <Bell className="h-5 w-5 text-supper-brown" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-supper-red rounded-full"></span>
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div 
                  className="flex items-center space-x-2 cursor-pointer" 
                  aria-label="User profile"
                >
                  <Avatar className="h-8 w-8 border border-supper-amber/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block text-supper-brown">{user.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-supper-amber/30">
                <DropdownMenuItem onClick={onProfileClick} className="hover:bg-supper-cream/20">
                  <User className="mr-2 h-4 w-4 text-supper-brown" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-supper-amber/20" />
                <DropdownMenuItem onClick={handleLogoutClick} className="hover:bg-supper-cream/20">
                  <LogOut className="mr-2 h-4 w-4 text-supper-red" />
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
            className="bg-supper-red hover:bg-supper-red/90 text-white"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
