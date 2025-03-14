
import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BadgeSectionHeaderProps = {
  sectionTitle: string;
  progressText: string;
  hasMoreBadges: boolean;
  onSeeAll: () => void;
};

/**
 * Header component for the Badges section showing title and "See all" button
 */
const BadgeSectionHeader: React.FC<BadgeSectionHeaderProps> = ({ 
  sectionTitle, 
  progressText, 
  hasMoreBadges, 
  onSeeAll 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold flex items-center text-lg sm:text-xl">
        <Trophy className="h-5 w-5 mr-2 text-primary" />
        {sectionTitle}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">{progressText}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary flex items-center"
          onClick={onSeeAll}
        >
          See all <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BadgeSectionHeader;
