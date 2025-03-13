
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const Events = () => {
  return (
    <Layout activeTab="events">
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <h1 className="text-3xl font-bold text-supper-navy mb-4">Supper Club Events</h1>
          <div className="bg-supper-cream rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🍽️</span>
          </div>
          <p className="text-xl text-supper-brown mb-2">Coming Soon!</p>
          <p className="text-gray-600">
            We're cooking up something special. Check back for upcoming supper club events, 
            meetups, and special dining experiences.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Events;
