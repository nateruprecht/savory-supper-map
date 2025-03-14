
import React from 'react';
import { Award } from 'lucide-react';
import { UserStatus } from '@/lib/status-utils';

type StatusCardProps = {
  status: UserStatus;
};

/**
 * Renders a single status card with appropriate styling based on category
 */
const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
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

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center text-center mb-4"
    >
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
      <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status.category)}`}>
        {status.category}
      </div>
    </div>
  );
};

export default StatusCard;
