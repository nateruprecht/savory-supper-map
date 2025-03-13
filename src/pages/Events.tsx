
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const Events = () => {
  return (
    <Layout activeTab="events">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-screen p-4"
      >
        <div className="retro-pattern-bg retro-border p-8 rounded-lg max-w-md w-full text-center">
          <h1 className="font-display text-3xl font-bold text-supper-red mb-4">
            Events
          </h1>
          
          <div className="retro-divider"></div>
          
          <p className="text-supper-brown text-xl mt-6">
            Coming Soon
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Events;
