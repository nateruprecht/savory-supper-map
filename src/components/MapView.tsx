
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Layers, X, CheckCircle2 } from 'lucide-react';
import { SupperClub, MapFilter } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cuisineTypes, regions } from '@/lib/data';

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
    <div className="relative w-full h-[calc(100vh-8rem)] rounded-xl overflow-hidden shadow-md">
      {/* Map Background - In a real app, this would be replaced with a proper map component */}
      <div className="absolute inset-0" style={mapStyle}></div>
      
      {/* Search and Filters Overlay */}
      <div className="absolute top-4 left-0 right-0 flex justify-center px-4 z-10">
        <div className="glass-morphism rounded-full w-full max-w-md flex items-center p-1 pl-4">
          <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder="Search supper clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-2 h-9"
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-8 w-8 ml-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 flex justify-center px-4 z-10"
          >
            <div className="glass-morphism rounded-xl w-full max-w-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Region</label>
                  <select 
                    className="w-full p-2 border border-border rounded-md text-sm mt-1"
                    value={filters.region || ''}
                    onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
                  >
                    <option value="">All Regions</option>
                    {regions.map(region => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground">Specialty</label>
                  <select 
                    className="w-full p-2 border border-border rounded-md text-sm mt-1"
                    value={filters.cuisine || ''}
                    onChange={(e) => handleFilterChange('cuisine', e.target.value || undefined)}
                  >
                    <option value="">All Cuisines</option>
                    {cuisineTypes.map(cuisine => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-3">
                <label className="text-xs text-muted-foreground">Status</label>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    className={cn(
                      "flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm border transition-colors",
                      filters.visited === true
                        ? "bg-primary-100 border-primary-200 text-primary-900"
                        : "border-border hover:bg-secondary"
                    )}
                    onClick={() => handleFilterChange('visited', filters.visited === true ? undefined : true)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Visited
                  </button>
                  <button
                    className={cn(
                      "flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm border transition-colors",
                      filters.visited === false
                        ? "bg-primary-100 border-primary-200 text-primary-900"
                        : "border-border hover:bg-secondary"
                    )}
                    onClick={() => handleFilterChange('visited', filters.visited === false ? undefined : false)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Not Visited
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Map Pins */}
      <div className="absolute inset-0 z-0">
        {filteredClubs.map(club => (
          <div
            key={club.id}
            className={cn(
              "absolute map-pin",
              club.visited ? "map-pin-visited" : "map-pin-unvisited"
            )}
            style={{
              left: `${((club.location.lng + 97) / 15) * 100}%`,
              top: `${(1 - (club.location.lat - 40) / 10) * 100}%`,
            }}
            onClick={() => handleClubClick(club)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <MapPin 
                className={cn(
                  "h-8 w-8",
                  selectedClub?.id === club.id ? "text-destructive fill-destructive" : club.visited ? "fill-success-100" : ""
                )} 
              />
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Selected Club Info */}
      <AnimatePresence>
        {selectedClub && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center px-4"
          >
            <div className="glass-morphism rounded-lg w-full max-w-md p-4 flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <img src={selectedClub.image} alt={selectedClub.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{selectedClub.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedClub.city}, {selectedClub.state}
                </p>
                <Button size="sm" onClick={handleViewDetails}>View Details</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
