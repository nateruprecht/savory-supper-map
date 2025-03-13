import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  MessageSquare, 
  Map, 
  Plus, 
  Facebook,
  ChevronRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import StatusSection from '@/components/home/StatusSection';
import BadgesSection from '@/components/home/BadgesSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import InfoSection from '@/components/discover/InfoSection';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { currentUser, sampleSupperClubs, badges } from '@/lib/data';
import ProgressBar from '@/components/ProgressBar';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
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
  
  const handleAddVisitClick = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
  };
  
  return (
    <Layout activeTab="home">
      <div className="container px-4 py-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <h1 className="text-2xl font-bold text-supper-navy">
            Welcome back, {userData.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6 text-center"
        >
          <h2 className="text-2xl font-serif font-bold mb-2">
            Savor the Midwest, <span className="text-supper-red">One Supper Club</span> at a Time
          </h2>
          <p className="text-supper-brown text-sm md:text-base max-w-2xl mx-auto">
            Discover hidden culinary gems, track your progress, earn badges, and share your journey through the iconic supper clubs of the Midwest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-1"
          >
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
                <StatusSection user={userData} />
                <div className="mt-4 flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleShareOnFacebook('status', 'Supper Enthusiast')}
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="text-xs">Share on Facebook</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-span-1"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-supper-red" />
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
                <BadgesSection user={userData} badges={badges} limit={3} />
                <div className="mt-4 flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleShareOnFacebook('badge', 'Club Explorer')}
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="text-xs">Share on Facebook</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-1 md:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-supper-brown" />
                  Your Reviews
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toast.info("Detailed reviews coming soon!")}
                  className="flex items-center text-muted-foreground hover:text-foreground"
                >
                  <span className="text-xs">Detailed Statistics</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ReviewsSection user={userData} clubs={clubs} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="col-span-1 md:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Map className="mr-2 h-5 w-5 text-supper-amber" />
                  Your Supper Club Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-16 w-16 text-muted-foreground opacity-20 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map of your supper club visits coming soon!
                  </p>
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={() => navigate('/discover')}
                  >
                    Explore Supper Clubs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Info className="mr-2 h-5 w-5 text-supper-blue" />
                  About Supper Clubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoSection />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-20 right-6 z-40 md:bottom-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-14 w-14 rounded-full bg-supper-red text-white shadow-lg flex items-center justify-center"
          onClick={handleAddVisitClick}
          aria-label="Add a visit"
        >
          <Plus className="h-7 w-7" />
        </motion.button>

        <AnimatePresence>
          {isAddMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-lg p-4"
            >
              <h3 className="font-medium mb-3">Add a Supper Club Visit</h3>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search for a supper club..."
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {clubs.slice(0, 3).map(club => (
                  <button
                    key={club.id}
                    className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md mb-1 text-left"
                    onClick={() => {
                      toast.success(`Added visit to ${club.name}`);
                      setIsAddMenuOpen(false);
                    }}
                  >
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{club.name}</div>
                      <div className="text-xs text-muted-foreground">{club.city}, {club.state}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Home;
