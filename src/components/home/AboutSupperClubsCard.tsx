
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InfoSection from '@/components/discover/InfoSection';

const AboutSupperClubsCard: React.FC = () => {
  return (
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
  );
};

export default AboutSupperClubsCard;
