
import React from 'react';
import { Award, Star } from 'lucide-react';
import { UserStatus } from '@/lib/status-utils';
import { Progress } from '@/components/ui/progress';

type StatusCardProps = {
  status: UserStatus;
  isPrimary?: boolean;
};

/**
 * Renders a single status card with appropriate styling based on category
 */
const StatusCard: React.FC<StatusCardProps> = ({ status, isPrimary = false }) => {
  // Helper function - extracted to improve readability
  const getStatusColor = (category: string): string => {
    switch (category) {
      case 'visits':
        return 'bg-primary text-primary-foreground';
      case 'reviews':
        return 'bg-secondary text-secondary-foreground';
      case 'leaderboard':
        return 'bg-supper-amber text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Progress calculation - this would be based on actual data in a real implementation
  const currentProgress = status.progress?.current || 0;
  const maxProgress = status.progress?.max || 100;
  const progressPercentage = Math.min(100, Math.max(0, (currentProgress / maxProgress) * 100));

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 border ${isPrimary 
        ? 'border-supper-amber/50 bg-amber-50/30' 
        : 'border-gray-100'} flex flex-col items-center text-center mb-4 relative`}
    >
      {isPrimary && (
        <div className="absolute top-2 right-2">
          <Star className="h-4 w-4 text-supper-amber fill-supper-amber" />
        </div>
      )}
      <div className="mb-2">
        <Award 
          className={`h-6 w-6 ${
            status.category === 'visits' ? 'text-primary' : 
            status.category === 'reviews' ? 'text-secondary' : 
            'text-supper-amber'
          }`} 
        />
      </div>
      <h3 className="font-semibold text-base mb-1">{status.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{status.description}</p>
      
      {/* Progress indicator */}
      <div className="w-full space-y-1 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progress to next level</span>
          <span className="text-xs font-medium text-gray-700">{currentProgress}/{maxProgress}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" 
          indicatorClassName={status.category === 'visits' ? 'bg-primary' : 
                             status.category === 'reviews' ? 'bg-secondary' : 
                             'bg-supper-amber'} 
        />
      </div>
      
      <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status.category)}`}>
        {status.category}
      </div>
    </div>
  );
};

export default StatusCard;
