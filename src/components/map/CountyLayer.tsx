
import React from 'react';

type CountyFeature = {
  type: string;
  properties: {
    name: string;
    state: string;
    countyCode: string;
  };
  geometry: {
    type: string;
    coordinates: any[][];
  };
};

type CountyLayerProps = {
  counties: CountyFeature[];
  selectedState: string | null;
};

const CountyLayer: React.FC<CountyLayerProps> = ({ counties, selectedState }) => {
  return (
    <g className="counties-layer">
      {counties.map((county) => (
        <path
          key={county.properties.countyCode}
          d={getPathFromCoordinates(county.geometry)}
          fill="white"
          fillOpacity={0.1}
          stroke="#666"
          strokeWidth="0.5"
          strokeOpacity={0.8}
          className="transition-all duration-200"
        />
      ))}
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

export default CountyLayer;
