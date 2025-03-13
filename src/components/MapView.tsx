
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SupperClub, MapFilter } from '@/lib/types';
import { cuisineTypes, regions } from '@/lib/data';
import SearchBar from './map/SearchBar';
import MapFilters from './map/MapFilters';
import MapPins from './map/MapPins';
import ClubPreview from './map/ClubPreview';

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

  // This would be replaced with an actual map integration
  const mapStyle = {
    backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=44.5,-89.5&zoom=6&size=800x800&scale=2&style=feature:all|element:labels|visibility:off&style=feature:landscape|color:0xf5f5f5&style=feature:road|color:0xffffff&style=feature:water|color:0xc9d1d9&key=YOUR_API_KEY')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleClubClick = (club: SupperClub) => {
    setSelectedClub(club);
    // In a real app, this would animate to the club's position on the map
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

  // This would be replaced with actual filtering logic
  const filteredClubs = clubs.filter(club => {
    // Search filter
    if (searchTerm && !club.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
      {/* Map Background - In a real app, this would be replaced with a proper map component */}
      <div className="absolute inset-0" style={mapStyle}></div>
      
      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
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
