
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { currentUser } from '@/lib/data';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/lib/types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  requireAuth?: boolean;
}

// Helper function to create a user profile object from Supabase User
const createUserProfile = (user: User | null): UserProfile => {
  if (!user) return currentUser;
  
  return {
    id: user.id,
    name: user.email?.split('@')[0] || 'User',
    avatar: '',
    clubsVisited: [],
    badges: [],
    totalVisits: 0,
    rank: 0,
    joinDate: user.created_at || new Date().toISOString()
  };
};

const Layout: React.FC<LayoutProps> = ({ children, activeTab, requireAuth = true }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (requireAuth && !loading && !user) {
      // Redirect to welcome screen if user is not authenticated
      navigate('/welcome');
    }
  }, [user, loading, navigate, requireAuth]);
  
  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'home' ? '' : tab}`);
  };

  // Create a user profile from the auth user
  const userForHeader = createUserProfile(user);

  if (loading && requireAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Header 
        user={userForHeader} 
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
