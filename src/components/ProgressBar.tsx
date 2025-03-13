
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ProgressBarProps = {
  progress: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  colorClass?: string;
  showValue?: boolean;
  className?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  size = 'md', 
  colorClass = "bg-primary", 
  showValue = true,
  className 
}) => {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">
            {label}
          </span>
          {showValue && (
            <span className="text-xs text-muted-foreground">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn("h-full rounded-full", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
