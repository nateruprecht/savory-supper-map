
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusSection from '@/components/home/StatusSection';
import { UserProfile } from '@/lib/types';

type StatusCardProps = {
  user: UserProfile;
  handleSeeAllStatuses: () => void;
  handleShareOnFacebook: (type: 'status' | 'badge', title: string) => void;
};

const StatusCard: React.FC<StatusCardProps> = ({ 
  user
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="col-span-1"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-supper-gold" />
            Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StatusSection user={user} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatusCard;
