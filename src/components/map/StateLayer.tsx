
import React from 'react';
import { motion } from 'framer-motion';

type StateFeature = {
  type: string;
  properties: {
    name: string;
    stateCode: string;
  };
  geometry: {
    type: string;
    coordinates: any[][];
  };
};

type StateLayerProps = {
  states: StateFeature[];
  selectedState: string | null;
  hoveredState: string | null;
  onStateClick: (stateCode: string) => void;
  onStateHover: (stateCode: string | null) => void;
};

const StateLayer: React.FC<StateLayerProps> = ({
  states,
  selectedState,
  hoveredState,
  onStateClick,
  onStateHover
}) => {
  return (
    <g className="states-layer">
      {states.map((state) => {
        const isSelected = selectedState === state.properties.stateCode;
        const isHovered = hoveredState === state.properties.stateCode;
        
        return (
          <motion.path
            key={state.properties.stateCode}
            d={getPathFromCoordinates(state.geometry)}
            fill={isSelected ? '#E9C46A80' : isHovered ? '#E9C46A50' : '#E9C46A30'}
            stroke="#9D4B2E"
            strokeWidth={isSelected || isHovered ? "2" : "1"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => onStateClick(state.properties.stateCode)}
            onMouseEnter={() => onStateHover(state.properties.stateCode)}
            onMouseLeave={() => onStateHover(null)}
            className="cursor-pointer transition-all duration-200 hover:fill-supper-amber/40"
          />
        );
      })}
    </g>
  );
};

// Helper function to generate SVG path from GeoJSON coordinates
const getPathFromCoordinates = (geometry: any): string => {
  if (!geometry || !geometry.coordinates || !geometry.coordinates.length) {
    return '';
  }

  let path = '';
  
  if (geometry.type === 'Polygon') {
    // Handle a single polygon
    const coordinates = geometry.coordinates[0];
    if (coordinates && coordinates.length > 0) {
      path = `M ${coordinates[0][0]} ${coordinates[0][1]} `;
      for (let i = 1; i < coordinates.length; i++) {
        path += `L ${coordinates[i][0]} ${coordinates[i][1]} `;
      }
      path += 'Z';
    }
  } else if (geometry.type === 'MultiPolygon') {
    // Handle multiple polygons
    geometry.coordinates.forEach((polygon: number[][][], index: number) => {
      const coordinates = polygon[0];
      if (coordinates && coordinates.length > 0) {
        path += `M ${coordinates[0][0]} ${coordinates[0][1]} `;
        for (let i = 1; i < coordinates.length; i++) {
          path += `L ${coordinates[i][0]} ${coordinates[i][1]} `;
        }
        path += 'Z ';
      }
    });
  }
  
  return path;
};

export default StateLayer;
