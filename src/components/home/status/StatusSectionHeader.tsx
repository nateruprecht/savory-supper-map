
import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';

type StatusSectionHeaderProps = {
  showTitle: boolean;
  hasMoreStatuses: boolean;
  handleSeeAll: () => void;
};

/**
 * Renders the header for the status section
 */
const StatusSectionHeader: React.FC<StatusSectionHeaderProps> = ({ 
  showTitle, 
  hasMoreStatuses, 
  handleSeeAll 
}) => {
  if (showTitle) {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-supper-gold" />
          Status Level
        </h2>
        {hasMoreStatuses && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary flex items-center"
            onClick={handleSeeAll}
          >
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-semibold flex items-center">
        <Trophy className="mr-2 h-5 w-5 text-supper-gold" />
        Status Level
      </CardTitle>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSeeAll}
        className="flex items-center text-muted-foreground hover:text-foreground"
      >
        <span className="text-xs">See all</span>
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default StatusSectionHeader;
