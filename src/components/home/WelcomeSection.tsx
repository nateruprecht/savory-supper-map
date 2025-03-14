
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
        <h1 className="text-2xl font-bold">
          <span className="bg-white/70 px-3 py-1 rounded-md font-extrabold text-supper-navy inline-block">
            Welcome back, {userData.name}
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 drop-shadow-md">
          <span className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded inline-block">
            <span className="text-supper-navy font-extrabold">Savor the Midwest, One Supper Club at a Time</span>
          </span>
        </h2>
        <p className="text-supper-brown text-sm md:text-base max-w-2xl mx-auto bg-white/60 backdrop-blur-sm p-2 rounded-md font-medium">
          Discover hidden culinary gems, track your progress, earn badges, and share your journey through the iconic supper clubs of the Midwest.
        </p>
      </motion.div>
    </>
  );
};

export default WelcomeSection;
