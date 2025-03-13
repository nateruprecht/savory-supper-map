
import React from 'react';
import { Badge as BadgeType } from '@/lib/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeProps = {
  badge: BadgeType;
  earned: boolean;
};

const Badge: React.FC<BadgeProps> = ({ badge, earned }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        "flex flex-col items-center p-4 rounded-lg",
        earned ? "bg-white shadow-md" : "bg-gray-100",
      )}
    >
      <div className="relative mb-2">
        <img
          src={badge.image}
          alt={badge.name}
          className={cn(
            "w-12 h-12 mb-2",
            !earned && "grayscale opacity-40"
          )}
        />
        {earned && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </div>
      <h3 className={cn(
        "text-sm font-medium",
        earned ? `text-badge-${badge.level}` : "text-gray-400"
      )}>
        {badge.name}
      </h3>
      <p className="text-xs text-gray-500 text-center mt-1">
        {earned ? badge.description : `Visit ${badge.requiredVisits} clubs to earn`}
      </p>
    </motion.div>
  );
};

export default Badge;
