
import React from 'react';
import { Home, MapPin, Award, Users, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();

  const navigationItems = [
    { id: 'home', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { id: 'discover', icon: <MapPin className="h-5 w-5" />, label: 'Discover' },
    { id: 'leaderboard', icon: <Users className="h-5 w-5" />, label: 'Leaderboard' },
    { id: 'profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Navigation - Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around px-4 py-2 bg-background/80 backdrop-blur-lg border-t border-border shadow-md">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 rounded-lg transition-all duration-300 w-full max-w-[80px]",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              {React.cloneElement(item.icon, { 
                className: cn(
                  "h-5 w-5 mb-1 transition-transform duration-300",
                  activeTab === item.id && "scale-110"
                )
              })}
              <span className="text-xs font-medium truncate">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="navigation-pill"
                  className="absolute bottom-0 h-1 w-7 bg-primary rounded-t-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation - Side Bar */}
      <div className="hidden md:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glass-morphism rounded-full py-4 px-1.5 flex flex-col items-center space-y-5">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative p-3 rounded-full transition-all duration-300 hover:bg-secondary group",
                activeTab === item.id && "bg-primary text-primary-foreground hover:bg-primary"
              )}
              aria-label={item.label}
            >
              {React.cloneElement(item.icon, { className: "h-5 w-5" })}
              
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-foreground text-background text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
