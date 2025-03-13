
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { currentUser } from '@/lib/data';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header 
        user={user || currentUser} 
        onProfileClick={() => navigate('/profile')} 
      />
      
      <main className="pt-16 md:pt-20 pb-16 min-h-screen">
        {children}
      </main>
      
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Layout;
