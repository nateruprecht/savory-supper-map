
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SearchBarProps = {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNew: () => void;
  isLoading?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  title,
  searchQuery,
  onSearchChange,
  onAddNew,
  isLoading = false,
}) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <Button 
          type="button" 
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={onAddNew}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search supper clubs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10"
          disabled={isLoading}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
