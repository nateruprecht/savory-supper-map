
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
          Welcome back, <span className="bg-white/70 px-2 py-1 rounded-md font-extrabold text-supper-red">{userData.name}</span>
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
            Savor the <span className="text-supper-brown font-extrabold">Midwest</span>, 
            <span className="text-supper-red font-extrabold"> One Supper Club</span> at a Time
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
