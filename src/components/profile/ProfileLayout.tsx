
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
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ 
  user, 
  activeTab, 
  children, 
  backLink,
  title
}) => {
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header user={user} onProfileClick={() => navigate('/profile')} />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen flex flex-col">
        {backLink && (
          <div className="sticky top-16 md:top-20 z-10 bg-background border-b border-border/40 shadow-sm">
            <div className="w-full px-4 sm:max-w-4xl sm:mx-auto py-3 flex items-center">
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
        )}
        
        <ScrollArea className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4 sm:max-w-4xl sm:mx-auto sm:p-4 pb-16 md:pb-0"
          >
            {children}
          </motion.div>
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
