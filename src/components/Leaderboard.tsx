
import React, { useState } from 'react';
import { LeaderboardEntry, LeaderboardFilter } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  currentUserId: string;
  filterOptions?: {
    states?: string[];
    counties?: string[];
    cities?: string[];
  };
};

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  entries, 
  currentUserId,
  filterOptions
}) => {
  const [activeFilter, setActiveFilter] = useState<LeaderboardFilter>('overall');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const filterTabs: { id: LeaderboardFilter; label: string }[] = [
    { id: 'overall', label: 'Overall' },
    { id: 'state', label: 'By State' },
    { id: 'county', label: 'By County' },
    { id: 'city', label: 'By City' },
  ];

  // Mock filtered data - in a real app, this would come from an API
  const filteredEntries = entries;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Trophy className="h-5 w-5 text-amber-500 mr-2" /> 
          Leaderboard
        </h2>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeFilter === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeFilter !== 'overall' && filterOptions && (
        <div className="mb-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-2 border border-border rounded-md text-sm"
          >
            <option value="">Select a {activeFilter}</option>
            {activeFilter === 'state' && filterOptions.states?.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
            {activeFilter === 'county' && filterOptions.counties?.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
            {activeFilter === 'city' && filterOptions.cities?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-3">
        {filteredEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "flex items-center p-3 rounded-lg",
              entry.id === currentUserId 
                ? "bg-primary-50 border border-primary-100" 
                : "bg-gray-50 hover:bg-gray-100 transition-colors"
            )}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-sm mr-3">
              <span className="font-semibold text-sm">{entry.rank}</span>
            </div>

            <div className="flex-shrink-0 mr-3">
              <img
                src={entry.avatar}
                alt={entry.name}
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium">
                  {entry.name} {entry.id === currentUserId && <span className="text-xs text-muted-foreground">(you)</span>}
                </h3>
              </div>
              {activeFilter !== 'overall' && selectedRegion && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{selectedRegion}</span>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <span className="font-semibold">{entry.totalVisits}</span>
              <span className="text-xs text-muted-foreground ml-1">visits</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
