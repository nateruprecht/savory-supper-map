
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';
import { SupperClub } from '@/lib/types';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from '@/hooks/useReviewForm';

interface ClubSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  isSearching: boolean;
  searchResults: SupperClub[];
  onSelectClub: (club: SupperClub) => void;
  onAddNew: () => void;
  form: UseFormReturn<ReviewFormValues>;
  selectedClub: SupperClub | null;
  showAddNew: boolean;
  preselectedClub?: SupperClub;
}

const ClubSearch: React.FC<ClubSearchProps> = ({
  searchQuery,
  onSearch,
  isSearching,
  searchResults,
  onSelectClub,
  onAddNew,
  form,
  selectedClub,
  showAddNew,
  preselectedClub
}) => {
  return (
    <div className="space-y-4">
      {!preselectedClub && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add a Review - Search Clubs or Add a New Club</h3>
            <Button 
              type="button" 
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={onAddNew}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search supper clubs..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            
            {isSearching && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((club) => (
                    <div
                      key={club.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => onSelectClub(club)}
                    >
                      {club.name} - {club.city}, {club.state}
                    </div>
                  ))
                ) : (
                  <div className="p-3 space-y-2">
                    <p className="text-sm text-gray-500">No results found</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-sm"
                      onClick={onAddNew}
                    >
                      Add "{searchQuery}" as new supper club
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      
      {(showAddNew || selectedClub || preselectedClub) && (
        <>
          <FormField
            control={form.control}
            name="clubName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Name</FormLabel>
                <FormControl>
                  <Input {...field} readOnly={!!selectedClub || !!preselectedClub} />
                </FormControl>
              </FormItem>
            )}
          />
          
          {showAddNew && (
            <>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClubSearch;
