
import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapFilter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { regions } from '@/lib/data';

type MapFiltersProps = {
  isOpen: boolean;
  filters: MapFilter;
  onClose: () => void;
  onFilterChange: (key: keyof MapFilter, value: any) => void;
};

const MapFilters: React.FC<MapFiltersProps> = ({ 
  isOpen, 
  filters, 
  onClose, 
  onFilterChange 
}) => {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div>
          <label className="text-xs text-muted-foreground">Region</label>
          <select 
            className="w-full p-2 border border-border rounded-md text-sm mt-1"
            value={filters.region || ''}
            onChange={(e) => onFilterChange('region', e.target.value || undefined)}
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
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
              onClick={() => onFilterChange('visited', filters.visited === true ? undefined : true)}
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
              onClick={() => onFilterChange('visited', filters.visited === false ? undefined : false)}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Not Visited
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapFilters;
