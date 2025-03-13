
import React, { useState, useEffect } from 'react';
import { sampleSupperClubs, badges, leaderboard } from '@/lib/data';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import { useNavigate, useParams } from 'react-router-dom';
import { currentUser } from '@/lib/data';
import { UserProfile } from '@/lib/types';
import useUserProfile from '@/hooks/use-user-profile';
import ProfileLayout from '@/components/profile/ProfileLayout';

const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState<UserProfile | null>(null);
  const [currentUserState] = useState(currentUser);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { getUserProfile } = useUserProfile();
  
  useEffect(() => {
    // In a real app, we would fetch the user profile data from an API
    // For now, we'll use mock data from the leaderboard
    const userFromLeaderboard = leaderboard.find(user => user.id === userId);
    
    if (userFromLeaderboard) {
      // Create a mock user profile from the leaderboard entry
      const mockUserProfile: UserProfile = {
        id: userFromLeaderboard.id,
        name: userFromLeaderboard.name,
        avatar: userFromLeaderboard.avatar,
        clubsVisited: [],  // We don't have this info from leaderboard
        badges: userFromLeaderboard.id === 'u2' ? badges : [badges[0]], // Give some badges based on rank
        totalVisits: userFromLeaderboard.totalVisits,
        rank: userFromLeaderboard.rank,
        joinDate: '2023-06-01', // Mock join date
        bio: `This is a fellow supper club explorer in the Midwest.`
      };
      
      setViewedUser(mockUserProfile);
    } else {
      // If user not found, redirect to the leaderboard
      navigate('/leaderboard');
    }
  }, [userId, navigate]);

  if (!viewedUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading profile...</div>
      </div>
    );
  }

  const isCurrentUser = currentUserState.id === viewedUser.id;

  return (
    <ProfileLayout 
      user={currentUserState} 
      activeTab="leaderboard"
      backLink={{ text: "← Back", route: "/leaderboard" }}
      title={`${viewedUser.name}'s Profile`}
    >
      <div className="space-y-6 pt-4">
        <ProfileHeader user={viewedUser} />
        <ProfileStats user={viewedUser} clubs={sampleSupperClubs} />
        <StatusSection user={viewedUser} isCurrentUser={isCurrentUser} />
        <BadgesSection user={viewedUser} badges={badges} isCurrentUser={isCurrentUser} />
        <ReviewsSection user={viewedUser} clubs={sampleSupperClubs} isCurrentUser={isCurrentUser} />
        {/* Lists section is intentionally excluded for other users' profiles */}
      </div>
    </ProfileLayout>
  );
};

export default UserProfilePage;
