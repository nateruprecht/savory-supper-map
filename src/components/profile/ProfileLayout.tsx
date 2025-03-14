
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserProfile } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

type ProfileLayoutProps = {
  user: UserProfile;
  activeTab: string;
  children: ReactNode;
  backLink?: {
    text: string;
    route: string;
  };
  title?: string;
  stickyHeader?: boolean;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ 
  user, 
  activeTab, 
  children, 
  backLink,
  title,
  stickyHeader = false
}) => {
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        {backLink && (
          <div className={`${stickyHeader ? 'sticky top-16 md:top-20 z-10' : ''} bg-background border-b border-border/40 shadow-sm w-full`}>
            <div className="container px-4 mx-auto">
              <div className="py-3 flex items-center">
                <button 
                  onClick={() => navigate(backLink.route)} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {backLink.text}
                </button>
                {title && (
                  <h1 className="text-lg font-medium ml-4">{title}</h1>
                )}
              </div>
            </div>
          </div>
        )}
        
        <ScrollArea className="w-full">
          <div className="container px-4 py-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
        </ScrollArea>
      </main>
      
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default ProfileLayout;
