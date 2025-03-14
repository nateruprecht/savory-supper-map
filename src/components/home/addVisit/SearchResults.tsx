
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupperClub } from '@/lib/types';

type SearchResultsProps = {
  isSearching: boolean;
  searchQuery: string;
  searchResults: SupperClub[];
  onSelectClub: (club: SupperClub) => void;
  onAddNew: () => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchQuery,
  searchResults,
  onSelectClub,
  onAddNew,
}) => {
  if (!isSearching && searchQuery.length > 0) {
    return (
      <div className="flex justify-end mt-3">
        <Button
          size="sm"
          onClick={onAddNew}
          className="text-sm"
        >
          Add as new supper club
        </Button>
      </div>
    );
  }

  if (!isSearching) {
    return null;
  }

  return (
    <div className="max-h-[200px] overflow-y-auto border rounded-md mb-3">
      {searchResults.length > 0 ? (
        searchResults.map(club => (
          <button
            key={club.id}
            className="flex items-center w-full p-2 hover:bg-gray-50 rounded-md text-left border-b last:border-0"
            onClick={() => onSelectClub(club)}
          >
            <div className="w-10 h-10 rounded overflow-hidden mr-3">
              <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-medium text-sm">{club.name}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {club.city}, {club.state}
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="p-3 text-center">
          <p className="text-sm text-gray-500 mb-2">No results found</p>
          <Button
            size="sm"
            onClick={onAddNew}
            className="w-full text-sm"
          >
            Add as new supper club
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
