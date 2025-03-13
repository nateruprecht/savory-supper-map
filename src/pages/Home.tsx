import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <Layout activeTab="home">
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-supper-navy mb-2">
            Wisconsin Supper Club Trail
          </h1>
          <p className="text-supper-brown italic">
            "Savor the Midwest, One Supper Club at a Time"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-supper-red p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Discover
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Explore Wisconsin's finest supper clubs and plan your next visit.
              </p>
              <Button 
                onClick={() => navigate('/discover')}
                className="w-full bg-supper-amber hover:bg-supper-amber/90 text-white"
              >
                Find Supper Clubs
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-supper-gold p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Events
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Join special supper club events and community gatherings.
              </p>
              <Button 
                onClick={() => navigate('/events')}
                className="w-full bg-supper-gold hover:bg-supper-gold/90 text-white"
              >
                View Events
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-supper-brown p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Leaderboard
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                See how you rank among other supper club enthusiasts.
              </p>
              <Button 
                onClick={() => navigate('/leaderboard')}
                className="w-full bg-supper-brown hover:bg-supper-brown/90 text-white"
              >
                View Rankings
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-xl font-bold text-supper-navy mb-4">Your Supper Club Journey</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Clubs Visited</span>
            <span className="font-semibold">0 / 100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-supper-red h-2.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="mt-6 text-center">
            <Button 
              onClick={() => navigate('/profile')}
              variant="outline"
              className="border-supper-navy text-supper-navy hover:bg-supper-navy/10"
            >
              View Your Profile
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-supper-cream p-6 rounded-lg border border-supper-gold"
        >
          <h2 className="text-lg font-semibold text-supper-brown mb-2">What is a Supper Club?</h2>
          <p className="text-gray-700">
            Wisconsin supper clubs are unique dining establishments typically found in rural areas, 
            known for their relaxed atmosphere, hearty portions, and classic cocktails like the 
            Brandy Old Fashioned. They're a cherished part of Wisconsin's cultural heritage.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
