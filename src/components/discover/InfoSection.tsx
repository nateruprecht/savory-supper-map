
import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type InfoSectionProps = {
  compact?: boolean;
};

const InfoSection: React.FC<InfoSectionProps> = ({ compact }) => {
  const infoItems = [
    {
      title: "What is a Supper Club?",
      content: "Supper clubs are traditional dining establishments found primarily in the Upper Midwestern states. They offer a relaxed, homey atmosphere with classic American cuisine like prime rib, fish fry, and classic cocktails."
    },
    {
      title: "Supper Club Etiquette",
      content: "Order a brandy old-fashioned before dinner, take your time, and don't rush the experience. Many clubs have a relaxed dress code, but some nicer establishments may request business casual attire."
    }
  ];

  return (
    <div className={cn("bg-white rounded-xl shadow-sm", compact ? "p-3" : "p-4 sm:p-5")}>
      <h2 className={cn("font-semibold flex items-center", compact ? "text-base mb-2" : "text-lg sm:text-xl mb-3 sm:mb-4")}>
        <Info className="h-5 w-5 mr-2 text-primary" />
        About Supper Clubs
      </h2>
      
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index}>
            <h3 className="font-medium text-sm mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.content}</p>
          </div>
        ))}
        
        <Button variant="outline" size="sm" className="w-full mt-2">
          Learn More <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
