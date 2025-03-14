
import React from 'react';
import { Home, MapPin, Award, Trophy, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

type NavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'home', icon: <Home className="h-5 w-5" />, position: 'left' },
    { id: 'events', icon: <Calendar className="h-5 w-5" />, position: 'left-middle' },
    { id: 'discover', icon: <MapPin className="h-5 w-5" />, position: 'middle' },
    { id: 'leaderboard', icon: <Trophy className="h-5 w-5" />, position: 'right-middle' },
    { id: 'profile', icon: <User className="h-5 w-5" />, position: 'right' },
  ];

  // Direct navigation handler to ensure proper routing
  const handleNavigation = (item: string) => {
    onTabChange(item);
    navigate(`/${item === 'home' ? '' : item}`);
  };

  return (
    <>
      {/* Mobile Navigation - Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around px-2 py-1 bg-background/90 backdrop-blur-lg border-t border-supper-amber/20 shadow-md">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={cn(
                "relative flex items-center justify-center p-2 rounded-lg transition-all duration-300",
                item.position === 'middle' ? "pb-1" : "py-3",
                activeTab === item.id
                  ? "text-supper-red"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.id}
            >
              {item.position === 'middle' ? (
                <div className="absolute -top-5">
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full bg-supper-red text-white shadow-lg border-4",
                    activeTab === item.id ? "border-supper-amber" : "border-supper-cream"
                  )}>
                    {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                  </div>
                </div>
              ) : (
                React.cloneElement(item.icon, { 
                  className: cn(
                    "h-5 w-5 transition-transform duration-300",
                    activeTab === item.id && "scale-110"
                  )
                })
              )}
              
              {activeTab === item.id && item.position !== 'middle' && (
                <motion.div
                  layoutId="navigation-pill"
                  className="absolute bottom-0.5 h-1 w-5 bg-supper-red rounded-t-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation - Side Bar */}
      <div className="hidden md:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glass-morphism rounded-full py-4 px-1.5 flex flex-col items-center space-y-5 border-supper-amber/30">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={cn(
                "relative p-3 rounded-full transition-all duration-300 hover:bg-secondary group",
                item.position === 'middle' && "mb-2",
                activeTab === item.id
                  ? item.position === 'middle'
                    ? "bg-supper-red text-white hover:bg-supper-red"
                    : "bg-supper-amber/20 text-supper-red hover:bg-supper-amber/30"
                  : "hover:bg-supper-cream/50"
              )}
              aria-label={item.id}
            >
              {item.position === 'middle' ? (
                <div className={cn(
                  "p-3 -m-3 rounded-full",
                  activeTab === item.id ? "bg-supper-red text-white" : "bg-supper-amber/30 text-supper-red"
                )}>
                  {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                </div>
              ) : (
                React.cloneElement(item.icon, { className: "h-5 w-5" })
              )}
              
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-supper-red text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
