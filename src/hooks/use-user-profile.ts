
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, Badge } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Converts a Supabase User object to a UserProfile object
   * and fetches additional profile data from the database
   */
  const getUserProfile = async (user: User | null): Promise<UserProfile> => {
    if (!user) {
      return {
        id: '',
        name: 'Guest',
        avatar: '',
        clubsVisited: [],
        badges: [],
        totalVisits: 0,
        rank: 0,
        joinDate: new Date().toISOString()
      };
    }

    setLoading(true);
    setError(null);

    try {
      // Get profile data from the database
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      console.log('Profile data from DB:', data);

      // Type-safe conversion of JSON data
      const clubsVisited = Array.isArray(data?.clubs_visited) 
        ? data.clubs_visited as string[]
        : [];
      
      const badges = Array.isArray(data?.badges)
        ? data.badges as Badge[]
        : [];

      return {
        id: user.id,
        name: data?.first_name ? `${data.first_name} ${data.surname || ''}`.trim() : user.email?.split('@')[0] || 'User',
        avatar: data?.avatar_url || '',
        clubsVisited,
        badges,
        totalVisits: data?.total_visits || 0,
        rank: data?.rank || 0,
        joinDate: user.created_at || new Date().toISOString(),
        bio: data?.bio
      };
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(err.message);
      
      // Return basic profile with data we have from auth
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
    } finally {
      setLoading(false);
    }
  };

  return { getUserProfile, loading, error };
};

export default useUserProfile;
