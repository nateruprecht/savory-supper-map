
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SupperClub, MapFilter } from '@/lib/types';
import { cuisineTypes, regions } from '@/lib/data';
import SearchBar from './map/SearchBar';
import MapFilters from './map/MapFilters';
import MapPins from './map/MapPins';
import ClubPreview from './map/ClubPreview';
import { toast } from 'sonner';

type MapViewProps = {
  clubs: SupperClub[];
  onClubSelect: (club: SupperClub) => void;
  userLocation?: { lat: number; lng: number };
};

const MapView: React.FC<MapViewProps> = ({ clubs, onClubSelect, userLocation }) => {
  const [selectedClub, setSelectedClub] = useState<SupperClub | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<MapFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);

  const handleClubClick = (club: SupperClub) => {
    setSelectedClub(club);
    // In a real app, this would animate to the club's position on the map
  };

  const handleStateClick = (stateId: string) => {
    setSelectedState(prev => prev === stateId ? undefined : stateId);
    
    const stateObj = midwestStates.find(s => s.id === stateId);
    toast(`${stateObj?.name || stateId} selected`, {
      description: `Showing supper clubs in ${stateObj?.name || stateId}`,
    });
  };

  const handleViewDetails = () => {
    if (selectedClub) {
      onClubSelect(selectedClub);
    }
  };

  const handleFilterChange = (key: keyof MapFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDiscoverClick = () => {
    toast("Discover Mode", {
      description: "Showing you the most popular supper clubs in the Midwest!",
    });
    // Here you could implement special discovery logic
  };

  // This would be replaced with actual filtering logic
  const filteredClubs = clubs.filter(club => {
    // Search filter
    if (searchTerm && !club.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // State filter
    if (selectedState && club.state !== selectedState) {
      return false;
    }
    
    // Visited filter
    if (filters.visited !== undefined && club.visited !== filters.visited) {
      return false;
    }
    
    // Region filter
    if (filters.region) {
      const region = regions.find(r => r.id === filters.region);
      if (region && !region.states.includes(club.state)) {
        return false;
      }
    }
    
    // Cuisine filter
    if (filters.cuisine && !club.specialties.includes(filters.cuisine)) {
      return false;
    }
    
    return true;
  });

  // Midwest states with their approximate positions on our map
  const midwestStates = [
    { id: 'WI', name: 'Wisconsin' },
    { id: 'IL', name: 'Illinois' },
    { id: 'MI', name: 'Michigan' },
    { id: 'MN', name: 'Minnesota' },
    { id: 'IA', name: 'Iowa' },
    { id: 'MO', name: 'Missouri' },
    { id: 'IN', name: 'Indiana' },
    { id: 'OH', name: 'Ohio' },
    { id: 'ND', name: 'North Dakota' },
    { id: 'SD', name: 'South Dakota' },
    { id: 'NE', name: 'Nebraska' },
    { id: 'KS', name: 'Kansas' }
  ];

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
      {/* Map Background - We're replacing this with our interactive map */}
      <div className="absolute inset-0 bg-gray-100"></div>
      
      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
        onDiscoverClick={handleDiscoverClick}
      />
      
      {/* Filters Panel */}
      <AnimatePresence>
        <MapFilters 
          isOpen={isFilterOpen}
          filters={filters}
          onClose={() => setIsFilterOpen(false)}
          onFilterChange={handleFilterChange}
        />
      </AnimatePresence>
      
      {/* Map Pins */}
      <MapPins 
        clubs={filteredClubs}
        selectedClub={selectedClub}
        onClubClick={handleClubClick}
        selectedState={selectedState}
        onStateClick={handleStateClick}
      />
      
      {/* Selected Club Info */}
      <AnimatePresence>
        <ClubPreview 
          club={selectedClub}
          onViewDetails={handleViewDetails}
        />
      </AnimatePresence>
    </div>
  );
};

export default MapView;
