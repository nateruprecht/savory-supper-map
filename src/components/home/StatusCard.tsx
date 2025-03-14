
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getUserStatuses } from '@/lib/status-utils';
import { useIsMobile } from '@/hooks/use-mobile';

type StatusCardProps = {
  user: UserProfile;
  handleSeeAllStatuses: () => void;
  handleShareOnFacebook: (type: 'status' | 'badge', title: string) => void;
};

const StatusCard: React.FC<StatusCardProps> = ({ 
  user, 
  handleSeeAllStatuses, 
  handleShareOnFacebook 
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
            Status Level
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSeeAllStatuses}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">See all</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Status cards are now directly rendered in StatusSection */}
          <div className="space-y-3">
            {getUserStatuses(user).slice(0, 2).map(status => (
              <div 
                key={status.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-2">
                  <Trophy 
                    className={`h-6 w-6 ${
                      status.category === 'visits' ? 'text-primary' : 
                      status.category === 'reviews' ? 'text-secondary' : 
                      'text-supper-amber'
                    }`} 
                  />
                </div>
                <h3 className="font-semibold text-base mb-1">{status.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{status.description}</p>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  status.category === 'visits' ? 'bg-primary text-primary-foreground' : 
                  status.category === 'reviews' ? 'bg-secondary text-secondary-foreground' : 
                  'bg-supper-amber text-white'
                }`}>
                  {status.category}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleShareOnFacebook('status', 'Supper Enthusiast')}
            >
              <Facebook className="h-4 w-4" />
              <span className="text-xs">Share on Facebook</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatusCard;
