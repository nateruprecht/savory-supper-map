
import React from 'react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';

// Imported components
import WelcomeSection from '@/components/home/WelcomeSection';
import StatusCard from '@/components/home/StatusCard';
import BadgesCard from '@/components/home/BadgesCard';
import ReviewsCard from '@/components/home/ReviewsCard';
import JourneyMapCard from '@/components/home/JourneyMapCard';
import AboutSupperClubsCard from '@/components/home/AboutSupperClubsCard';
import AddVisitButton from '@/components/home/addVisit/AddVisitButton';
import StatsCard from '@/components/home/StatsCard';
import NearbyClubsCard from '@/components/home/NearbyClubsCard';

const Home = () => {
  const { user } = useAuth();
  const userData = currentUser; // For demo purposes, using mock data
  const clubs = sampleSupperClubs;
  
  const handleSeeAllStatuses = () => {
    // Navigate to a detailed statuses page or open a modal
    toast.info("This feature is coming soon!");
  };
  
  const handleSeeAllBadges = () => {
    // Navigate to a detailed badges page or open a modal
    toast.info("This feature is coming soon!");
  };
  
  const handleShareOnFacebook = (type: 'status' | 'badge', title: string) => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your ${type} "${title}" on Facebook!`);
  };
  
  return (
    <Layout activeTab="home">
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="backdrop-blur-[2px] backdrop-brightness-[0.9] min-h-screen">
          <div className="container px-4 py-6 mx-auto">
            <WelcomeSection userData={userData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Stats Card */}
              <StatsCard user={userData} clubs={clubs} />
              
              {/* Nearby Clubs - Card with horizontal scrolling */}
              <NearbyClubsCard clubs={clubs} />
              
              <StatusCard 
                user={userData}
                handleSeeAllStatuses={handleSeeAllStatuses}
                handleShareOnFacebook={handleShareOnFacebook}
              />
              
              <BadgesCard 
                user={userData}
                badges={badges}
                handleSeeAllBadges={handleSeeAllBadges}
                handleShareOnFacebook={handleShareOnFacebook}
              />
              
              <ReviewsCard user={userData} clubs={clubs} />
              
              <JourneyMapCard />
              
              <AboutSupperClubsCard />
            </div>
          </div>
        </div>
      </div>

      <AddVisitButton clubs={clubs} />
    </Layout>
  );
};

export default Home;
