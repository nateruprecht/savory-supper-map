
import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';

type BadgeSectionHeaderProps = {
  showTitle: boolean;
  hasMoreBadges: boolean;
  progressText: string;
  handleSeeAll: () => void;
};

/**
 * Renders the header for the badges section
 */
const BadgeSectionHeader: React.FC<BadgeSectionHeaderProps> = ({ 
  showTitle, 
  hasMoreBadges, 
  progressText, 
  handleSeeAll 
}) => {
  if (showTitle) {
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold flex items-center text-lg sm:text-xl">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          Badges
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">{progressText}</span>
          {hasMoreBadges && (
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
      </div>
    );
  }
  
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-semibold flex items-center">
        <Trophy className="mr-2 h-5 w-5 text-supper-red" />
        Badges
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

export default BadgeSectionHeader;
