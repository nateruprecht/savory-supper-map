
import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/lib/types';

type WelcomeSectionProps = {
  userData: UserProfile;
};

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userData }) => {
  return (
    <>
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
    </>
  );
};

export default WelcomeSection;
