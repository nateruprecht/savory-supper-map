
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronRight, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BadgesSection from '@/components/home/BadgesSection';
import { UserProfile, Badge } from '@/lib/types';

type BadgesCardProps = {
  user: UserProfile;
  badges: Badge[];
  handleSeeAllBadges: () => void;
  handleShareOnFacebook: (type: 'status' | 'badge', title: string) => void;
};

const BadgesCard: React.FC<BadgesCardProps> = ({ 
  user, 
  badges, 
  handleSeeAllBadges, 
  handleShareOnFacebook 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-1"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Award className="mr-2 h-5 w-5 text-supper-red" />
            Badges
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSeeAllBadges}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">See all</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <BadgesSection user={user} badges={badges} limit={3} showTitle={false} />
          <div className="mt-4 flex justify-end">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleShareOnFacebook('badge', 'Club Explorer')}
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

export default BadgesCard;
