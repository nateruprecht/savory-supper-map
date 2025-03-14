
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReviewsSection from '@/components/home/ReviewsSection';
import { UserProfile, SupperClub } from '@/lib/types';
import { toast } from 'sonner';

type ReviewsCardProps = {
  user: UserProfile;
  clubs: SupperClub[];
};

const ReviewsCard: React.FC<ReviewsCardProps> = ({ user, clubs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="col-span-1 md:col-span-2"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-supper-brown" />
            Your Reviews
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toast.info("Detailed reviews coming soon!")}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">Detailed Statistics</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <ReviewsSection user={user} clubs={clubs} showTitle={false} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewsCard;
