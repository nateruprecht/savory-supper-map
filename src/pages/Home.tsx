
import React from 'react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, Trophy, ChevronRight } from 'lucide-react';

// Imported components
import WelcomeSection from '@/components/home/WelcomeSection';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import JourneyMapCard from '@/components/home/JourneyMapCard';
import AboutSupperClubsCard from '@/components/home/AboutSupperClubsCard';
import AddVisitButton from '@/components/home/addVisit/AddVisitButton';
import StatsCard from '@/components/home/StatsCard';
import NearbyClubsCard from '@/components/home/NearbyClubsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const { user } = useAuth();
  const userData = currentUser; // For demo purposes, using mock data
  const clubs = sampleSupperClubs;
  const navigate = useNavigate();
  
  const handleSeeAllStatuses = () => {
    // Navigate to a detailed statuses page or open a modal
    toast.info("This feature is coming soon!");
  };
  
  const handleSeeAllBadges = () => {
    // Navigate to a detailed badges page or open a modal
    toast.info("This feature is coming soon!");
  };
  
  return (
    <Layout activeTab="home">
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="backdrop-blur-[2px] backdrop-brightness-[0.9] min-h-screen">
          <div className="container px-4 py-6 mx-auto">
            <WelcomeSection userData={userData} />

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                onClick={() => navigate('/discover')}
                className="w-full max-w-[180px]"
                variant="secondary"
              >
                <Compass className="mr-2 h-4 w-4" />
                Discover
              </Button>
              <Button 
                onClick={() => navigate('/leaderboard')}
                className="w-full max-w-[180px]"
                variant="secondary"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Stats Card */}
              <StatsCard user={userData} clubs={clubs} />
              
              {/* Nearby Clubs - Card with horizontal scrolling */}
              <NearbyClubsCard clubs={clubs} />
              
              {/* Status Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-supper-gold" />
                    Status Level
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSeeAllStatuses}
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <span className="text-xs">See all</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <StatusSection 
                    user={userData}
                    clubs={clubs}
                    showTitle={false}
                    limit={1}
                    handleSeeAllStatuses={handleSeeAllStatuses}
                  />
                </CardContent>
              </Card>
              
              {/* Badges Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-supper-red" />
                    Badges
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSeeAllBadges}
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <span className="text-xs">See all</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <BadgesSection 
                    user={userData}
                    badges={badges}
                    showTitle={false}
                    limit={3}
                    handleSeeAllBadges={handleSeeAllBadges}
                  />
                </CardContent>
              </Card>
              
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
