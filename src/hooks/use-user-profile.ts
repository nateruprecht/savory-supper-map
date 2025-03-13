
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/lib/types';
import { currentUser } from '@/lib/data';

/**
 * Converts a Supabase User object to a UserProfile object
 * for use with the app's components
 */
export const useUserProfile = () => {
  /**
   * Creates a UserProfile from a Supabase User
   */
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

  return { createUserProfile };
};

export default useUserProfile;
