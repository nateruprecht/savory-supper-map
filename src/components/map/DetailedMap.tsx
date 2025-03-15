
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SupperClub } from '@/lib/types';
import { midwestStatesGeoJson, midwestCountiesGeoJson, midwestRegions } from '@/lib/map/midwest-states';
import StateLayer from './StateLayer';
import CountyLayer from './CountyLayer';
import ClubMarkers from './ClubMarkers';
import { toast } from 'sonner';

type DetailedMapProps = {
  clubs: SupperClub[];
  selectedState: string | null;
  onStateSelect: (stateCode: string | null) => void;
  selectedClub: SupperClub | null;
  onClubSelect: (club: SupperClub) => void;
  hoveredState: string | null;
  onStateHover: (stateCode: string | null) => void;
};

const DetailedMap: React.FC<DetailedMapProps> = ({
  clubs,
  selectedState,
  onStateSelect,
  selectedClub,
  onClubSelect,
  hoveredState,
  onStateHover
}) => {
  const [viewBox, setViewBox] = useState<string>("0 0 600 400");
  const [mapScale, setMapScale] = useState<number>(1);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [showCounties, setShowCounties] = useState(false);

  // Filter clubs based on selected state
  const filteredClubs = clubs.filter(club => {
    if (selectedState && club.state !== selectedState) return false;
    return true;
  });

  // Effect to handle zooming in/out when a state is selected
  useEffect(() => {
    if (selectedState) {
      // Find the selected state feature
      const stateFeature = midwestStatesGeoJson.features.find(
        feature => feature.properties.stateCode === selectedState
      );
      
      if (stateFeature) {
        // Calculate bounding box for the state
        let coords: number[][] = [];
        
        if (stateFeature.geometry.type === 'Polygon') {
          coords = stateFeature.geometry.coordinates[0] as number[][];
        } else if (stateFeature.geometry.type === 'MultiPolygon') {
          // Flatten multipolygon coordinates
          stateFeature.geometry.coordinates.forEach((polygon: number[][][]) => {
            coords = [...coords, ...(polygon[0] as number[][])];
          });
        }
        
        // Find min/max coordinates
        if (coords.length > 0) {
          const minX = Math.min(...coords.map(c => c[0]));
          const maxX = Math.max(...coords.map(c => c[0]));
          const minY = Math.min(...coords.map(c => c[1]));
          const maxY = Math.max(...coords.map(c => c[1]));
          
          // Add padding
          const paddingFactor = 0.2;
          const width = (maxX - minX) * (1 + paddingFactor * 2);
          const height = (maxY - minY) * (1 + paddingFactor * 2);
          const centerX = minX + (maxX - minX) / 2;
          const centerY = minY + (maxY - minY) / 2;
          
          // Set new viewBox
          setViewBox(`${centerX - width/2} ${centerY - height/2} ${width} ${height}`);
          setMapScale(2);
          setShowCounties(true);
        }
      }
    } else {
      // Reset to full view
      setViewBox("0 0 600 400");
      setMapScale(1);
      setMapOffset({ x: 0, y: 0 });
      setShowCounties(false);
    }
  }, [selectedState]);

  const handleStateClick = (stateCode: string) => {
    if (selectedState === stateCode) {
      onStateSelect(null);
      toast("Showing full Midwest region");
    } else {
      onStateSelect(stateCode);
      const stateName = midwestStatesGeoJson.features.find(
        f => f.properties.stateCode === stateCode
      )?.properties.name;
      toast(`Viewing ${stateName}`, {
        description: `Showing counties and supper clubs in ${stateName}`
      });
    }
  };

  return (
    <div 
      ref={mapContainer} 
      className="relative w-full h-full rounded-xl overflow-hidden bg-supper-cream/10 shadow-md"
    >
      <div className="absolute inset-0 z-0">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="transition-all duration-500 ease-in-out"
        >
          {/* Background rect */}
          <rect x="-200" y="-200" width="1000" height="800" fill="#F5F5F5" />
          
          {/* State boundaries */}
          <StateLayer 
            states={midwestStatesGeoJson.features}
            selectedState={selectedState}
            hoveredState={hoveredState}
            onStateClick={handleStateClick}
            onStateHover={onStateHover}
          />
          
          {/* County boundaries - only show when zoomed to a state */}
          {showCounties && (
            <CountyLayer 
              counties={midwestCountiesGeoJson.features.filter(
                county => county.properties.state === selectedState
              )}
              selectedState={selectedState}
            />
          )}

          {/* Region labels */}
          {!selectedState && midwestRegions.map(region => {
            // Calculate average position for region label based on state positions
            const regionStates = midwestStatesGeoJson.features.filter(
              feature => region.states.includes(feature.properties.stateCode)
            );
            
            if (regionStates.length === 0) return null;
            
            // Get center points for each state in region
            let centerPoints: number[][] = [];
            regionStates.forEach(state => {
              if (state.geometry.type === 'Polygon') {
                const coords = state.geometry.coordinates[0] as number[][];
                const sumX = coords.reduce((acc, curr) => acc + curr[0], 0);
                const sumY = coords.reduce((acc, curr) => acc + curr[1], 0);
                centerPoints.push([sumX / coords.length, sumY / coords.length]);
              }
            });
            
            // Average the center points
            const avgX = centerPoints.reduce((acc, curr) => acc + curr[0], 0) / centerPoints.length;
            const avgY = centerPoints.reduce((acc, curr) => acc + curr[1], 0) / centerPoints.length;
            
            return (
              <g key={region.id} className="region-label">
                <text
                  x={avgX}
                  y={avgY}
                  fill={region.color}
                  fontSize="6"
                  textAnchor="middle"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Supper Club Markers */}
      <ClubMarkers 
        clubs={filteredClubs}
        selectedClub={selectedClub}
        onClubSelect={onClubSelect}
        mapScale={mapScale}
        mapOffset={mapOffset}
      />
      
      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={() => {
            onStateSelect(null);
            toast("Reset to full Midwest view");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="m21 15-5-5L5 21"></path>
          </svg>
        </motion.button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-md text-xs shadow-sm border border-gray-100">
        <div className="font-semibold mb-1">Map Legend</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-supper-amber/30 mr-1 border border-supper-amber"></div>
          <span>State</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-supper-amber/80 mr-1 border border-supper-red"></div>
          <span>Selected State</span>
        </div>
        {showCounties && (
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-white mr-1 border border-gray-400"></div>
            <span>County</span>
          </div>
        )}
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-supper-red mr-1"></div>
          <span>Supper Club</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedMap;
