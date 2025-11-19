// =====================================================
// Country Renderer Component
// =====================================================
// Handles rendering individual countries on the map
// Split from WorldMap for better code splitting
// =====================================================

import React from 'react';
import { CountryData } from '../../types';
import { CountryPosition } from './CountryCoordinates';
import { getRiskColor, getRiskHoverColor, getSelectedRiskColor } from './ColorScheme';

interface CountryRendererProps {
  countryCode: string;
  position: CountryPosition;
  country?: CountryData;
  hoveredCountry: string | null;
  selectedCountry?: CountryData | null;
  onCountryClick?: (countryCode: string) => void;
  onMouseEnter?: (countryCode: string, event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}

export function CountryRenderer({
  countryCode,
  position,
  country,
  hoveredCountry,
  selectedCountry,
  onCountryClick,
  onMouseEnter,
  onMouseLeave
}: CountryRendererProps) {
  const hasData = country && typeof country === 'object';
  const isHovered = hoveredCountry === countryCode;
  const isSelected = selectedCountry?.country.code === countryCode;

  const getCountryFill = (): string => {
    if (!hasData) return '#F3F4F6'; // Gray-100 for countries not in our dataset
    
    if (isHovered || isSelected) {
      return getRiskHoverColor(country.current_uri.risk_level);
    }
    
    return getRiskColor(country.current_uri.risk_level);
  };

  const getCountryStroke = (): string => {
    if (!hasData) return '#D1D5DB'; // Gray-300
    
    if (isSelected) {
      return '#1F2937'; // Gray-800 for selected
    }
    
    return isHovered ? '#374151' : '#9CA3AF'; // Darker stroke on hover
  };

  const getCountryOpacity = (): number => {
    return hasData ? 0.9 : 0.3; // Dim countries not in dataset
  };

  const handleClick = () => {
    if (hasData && onCountryClick) {
      onCountryClick(countryCode);
    }
  };

  const handleMouseEnterEvent = (event: React.MouseEvent) => {
    if (hasData && onMouseEnter) {
      onMouseEnter(countryCode, event);
    }
  };

  return (
    <g key={countryCode}>
      <rect
        x={position.x}
        y={position.y}
        width={position.width}
        height={position.height}
        fill={getCountryFill()}
        stroke={getCountryStroke()}
        strokeWidth={isSelected ? 2 : 1}
        opacity={getCountryOpacity()}
        rx={3}
        className="cursor-pointer transition-all duration-200 hover:opacity-100"
        onClick={handleClick}
        onMouseEnter={handleMouseEnterEvent}
        onMouseLeave={hasData ? onMouseLeave : undefined}
      />
      
      {/* Country code label */}
      <text
        x={position.x + position.width / 2}
        y={position.y + position.height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium pointer-events-none fill-white"
        style={{ fontSize: '10px' }}
      >
        {countryCode}
      </text>
    </g>
  );
}

// Batch renderer for multiple countries
interface BatchCountryRendererProps {
  countries: Record<string, { position: CountryPosition; data?: CountryData }>;
  hoveredCountry: string | null;
  selectedCountry?: CountryData | null;
  onCountryClick?: (countryCode: string) => void;
  onMouseEnter?: (countryCode: string, event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}

export function BatchCountryRenderer({
  countries,
  hoveredCountry,
  selectedCountry,
  onCountryClick,
  onMouseEnter,
  onMouseLeave
}: BatchCountryRendererProps) {
  return (
    <>
      {Object.entries(countries).map(([countryCode, { position, data }]) => (
        <CountryRenderer
          key={countryCode}
          countryCode={countryCode}
          position={position}
          country={data}
          hoveredCountry={hoveredCountry}
          selectedCountry={selectedCountry}
          onCountryClick={onCountryClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
}