
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Utensils, MapPin, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/welcome');
      }
    }
  }, [navigate, user, loading]);
  
  return (
    <Layout activeTab="home">
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-supper-red mb-2">
            Wisconsin Supper Club Trail
          </h1>
          <p className="text-supper-brown italic">
            "Savor the Midwest, One Supper Club at a Time"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="retro-pattern-bg retro-border w-full max-w-md p-8 rounded-lg"
        >
          <div className="flex justify-center mb-8">
            <div className="animate-spin-slow rounded-full h-16 w-16 border-4 border-t-supper-amber border-r-supper-red border-b-supper-gold border-l-supper-brown"></div>
          </div>

          <p className="text-supper-navy font-medium mb-6">
            Loading your Wisconsin Supper Club adventure...
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="bg-supper-cream p-3 rounded-full mb-2">
                <Utensils className="h-6 w-6 text-supper-red" />
              </div>
              <span className="text-xs text-supper-brown">Discover</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-supper-cream p-3 rounded-full mb-2">
                <MapPin className="h-6 w-6 text-supper-amber" />
              </div>
              <span className="text-xs text-supper-brown">Visit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-supper-cream p-3 rounded-full mb-2">
                <Trophy className="h-6 w-6 text-supper-gold" />
              </div>
              <span className="text-xs text-supper-brown">Compete</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
