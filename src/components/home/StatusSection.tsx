
import React from 'react';
import { Trophy } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar';
import { cn } from '@/lib/utils';

type StatusSectionProps = {
  user: UserProfile;
  compact?: boolean;
  isCurrentUser?: boolean;
};

const StatusSection: React.FC<StatusSectionProps> = ({ user, compact, isCurrentUser = true }) => {
  // Define user statuses based on visit count
  const statuses = [
    { name: "Novice Explorer", threshold: 0, color: "bg-zinc-400" },
    { name: "Club Hopper", threshold: 5, color: "bg-blue-500" },
    { name: "Supper Enthusiast", threshold: 15, color: "bg-green-500" },
    { name: "Midwest Maven", threshold: 30, color: "bg-purple-500" },
    { name: "Legendary Diner", threshold: 50, color: "bg-amber-500" },
  ];

  // Find current status and next status
  const currentStatusIndex = statuses.reduceRight((acc, status, index) => 
    user.totalVisits >= status.threshold ? index : acc, 0);
  
  const currentStatus = statuses[currentStatusIndex];
  const nextStatus = statuses[currentStatusIndex + 1];
  
  // Calculate progress to next status
  const progress = nextStatus 
    ? Math.min(100, ((user.totalVisits - currentStatus.threshold) / (nextStatus.threshold - currentStatus.threshold)) * 100)
    : 100;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm", compact ? "p-3" : "p-4 sm:p-5")}>
      <h2 className={cn("font-semibold flex items-center", compact ? "text-base mb-2" : "text-lg sm:text-xl mb-3 sm:mb-4")}>
        <Trophy className="h-5 w-5 mr-2 text-primary" />
        Current Status
      </h2>
      
      <div className={cn("flex items-center justify-between", compact ? "mb-2" : "mb-3 sm:mb-4")}>
        <div>
          <div className="flex items-center">
            <div className={cn("w-3 h-3 rounded-full mr-2", currentStatus.color)}></div>
            <span className="font-medium">{currentStatus.name}</span>
          </div>
          {nextStatus && (
            <div className="text-xs text-muted-foreground mt-1">
              Next: {nextStatus.name} ({nextStatus.threshold - user.totalVisits} more visits)
            </div>
          )}
        </div>
      </div>
      
      {nextStatus && (
        <ProgressBar 
          progress={progress} 
          colorClass={currentStatus.color}
          label={`${user.totalVisits} / ${nextStatus.threshold} visits`}
          size={compact ? "sm" : "lg"}
        />
      )}
    </div>
  );
};

export default StatusSection;
