
import React, { useState } from 'react';
import { LeaderboardEntry, LeaderboardFilter } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MapPin, User, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // Mock filtered data - in a real app, this would come from an API
  const filteredEntries = entries;

  const handleViewProfile = (userId: string) => {
    // Navigate to the user's profile if it's current user
    if (userId === currentUserId) {
      navigate('/profile');
    } else {
      navigate(`/user-profile/${userId}`);
    }
  };

  return (
    <div className="animate-scale-in space-y-3">
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
            <div className="flex items-center justify-center h-8 w-8 mr-3">
              <span className={cn(
                "font-bold text-lg",
                entry.rank === 1 ? "text-amber-500" :
                entry.rank === 2 ? "text-gray-500" :
                entry.rank === 3 ? "text-amber-700" : "text-gray-700"
              )}>#{entry.rank}</span>
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
              <div className="text-sm text-muted-foreground">
                Visited {entry.totalVisits} clubs
              </div>
              {activeFilter !== 'overall' && selectedRegion && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{selectedRegion}</span>
                </div>
              )}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs py-1 px-2 h-auto"
              onClick={() => handleViewProfile(entry.id)}
            >
              View Profile <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
