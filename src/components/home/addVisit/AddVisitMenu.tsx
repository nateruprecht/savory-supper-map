
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupperClub } from '@/lib/types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

type AddVisitMenuProps = {
  menuRef: React.RefObject<HTMLDivElement>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  searchResults: SupperClub[];
  handleSearch: (query: string) => void;
  handleSelectClub: (club: SupperClub) => void;
  handleAddNew: () => void;
};

const AddVisitMenu: React.FC<AddVisitMenuProps> = ({
  menuRef,
  activeTab,
  setActiveTab,
  searchQuery,
  isSearching,
  searchResults,
  handleSearch,
  handleSelectClub,
  handleAddNew,
}) => {
  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute bottom-16 right-0 w-[330px] bg-white rounded-lg shadow-lg p-4"
    >
      <Tabs defaultValue="visit" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="visit">Add Visit</TabsTrigger>
          <TabsTrigger value="review">Add Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visit" className="mt-0">
          <SearchBar
            title="Search or add Supper Club"
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onAddNew={handleAddNew}
          />
          
          <SearchResults
            isSearching={isSearching}
            searchQuery={searchQuery}
            searchResults={searchResults}
            onSelectClub={handleSelectClub}
            onAddNew={handleAddNew}
          />
        </TabsContent>
        
        <TabsContent value="review" className="mt-0">
          <SearchBar
            title="Search or add Supper Club to review"
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onAddNew={handleAddNew}
          />
          
          <SearchResults
            isSearching={isSearching}
            searchQuery={searchQuery}
            searchResults={searchResults}
            onSelectClub={handleSelectClub}
            onAddNew={handleAddNew}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AddVisitMenu;
