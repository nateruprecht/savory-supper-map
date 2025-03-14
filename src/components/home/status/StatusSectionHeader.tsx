
import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StatusSectionHeaderProps = {
  hasMoreStatuses: boolean;
  onSeeAll: () => void;
};

/**
 * Header component for the Status section showing title and "See all" button
 */
const StatusSectionHeader: React.FC<StatusSectionHeaderProps> = ({ 
  hasMoreStatuses, 
  onSeeAll 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg sm:text-xl font-semibold flex items-center">
        <Award className="h-5 w-5 mr-2 text-primary" />
        Status
      </h2>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-primary flex items-center"
        onClick={onSeeAll}
      >
        See all <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default StatusSectionHeader;
