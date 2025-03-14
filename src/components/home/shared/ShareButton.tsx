
import React from 'react';
import { Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ShareButtonProps = {
  type: 'status' | 'badge';
  title: string;
};

/**
 * Reusable component for sharing statuses or badges on Facebook
 */
const ShareButton: React.FC<ShareButtonProps> = ({ type, title }) => {
  const handleShareOnFacebook = () => {
    // In a real implementation, this would use the Facebook Share API
    toast.success(`Shared your ${type} "${title}" on Facebook!`);
  };

  return (
    <div className="mt-4 flex justify-end">
      <Button 
        size="sm" 
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleShareOnFacebook}
      >
        <Facebook className="h-4 w-4" />
        <span className="text-xs">Share on Facebook</span>
      </Button>
    </div>
  );
};

export default ShareButton;
