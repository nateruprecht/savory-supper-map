
import React from 'react';
import { Search, Layers, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
  onDiscoverClick?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onFilterToggle,
  onDiscoverClick
}) => {
  return (
    <>
      {/* Search Bar - Positioned at the top */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-center px-4 z-10">
        <div className="glass-morphism rounded-full w-full max-w-md flex items-center p-1 pl-4">
          <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder="Search supper clubs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-2 h-9"
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-8 w-8 ml-2"
            onClick={onFilterToggle}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Discover Button - Positioned at the bottom */}
      {onDiscoverClick && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 z-10">
          <Button 
            onClick={onDiscoverClick}
            variant="default"
            className="rounded-full px-4"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Discover Supper Clubs
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
