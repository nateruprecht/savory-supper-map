
import React from 'react';
import { Share2, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type ClubFooterActionsProps = {
  clubName: string;
  visited: boolean;
  onShare: () => void;
  onVisitToggle: () => void;
};

const ClubFooterActions: React.FC<ClubFooterActionsProps> = ({
  clubName,
  visited,
  onShare,
  onVisitToggle,
}) => {
  return (
    <div className="p-4 border-t flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Award className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Earn Badges</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-muted-foreground">
                Visit this club to earn progress toward badges!
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Button 
        onClick={onVisitToggle}
        className={cn(
          visited ? "bg-success-500 hover:bg-success-600" : ""
        )}
      >
        {visited ? (
          <>
            <Check className="h-4 w-4 mr-2" /> Visited
          </>
        ) : (
          "Mark as Visited"
        )}
      </Button>
    </div>
  );
};

export default ClubFooterActions;
