
import React from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const JourneyMapCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="col-span-1 md:col-span-2"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Map className="mr-2 h-5 w-5 text-supper-amber" />
            Your Supper Club Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Map className="h-16 w-16 text-muted-foreground opacity-20 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Interactive map of your supper club visits coming soon!
            </p>
            <Button 
              className="mt-4" 
              variant="outline"
              onClick={() => navigate('/discover')}
            >
              Explore Supper Clubs
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JourneyMapCard;
