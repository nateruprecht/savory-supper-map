
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Layout activeTab="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center"
      >
        <div className="retro-pattern-bg retro-border p-8 rounded-lg max-w-md w-full">
          <h1 className="font-display text-3xl font-bold text-supper-red mb-4">
            404 - Page Not Found
          </h1>
          
          <div className="retro-divider mb-6"></div>
          
          <p className="text-supper-brown mb-6">
            Sorry, the page you were looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-supper-red hover:bg-supper-red/90 text-white"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default NotFound;
