// =====================================================
// Optimized World Map Component
// =====================================================
// Split into smaller chunks for better code splitting
// Uses lazy-loaded subcomponents for optimal bundle size
// =====================================================

import { useState, useMemo } from 'react';
import { CountryData } from '../../../types';

// Import split components
import { countryCoordinates, getAvailableCountries } from './CountryCoordinates';
import { CountryRenderer } from './CountryRenderer';
import { MapTooltip, TooltipContent } from './MapTooltip';
import { MapLegend } from './MapLegend';
import { MapStatistics } from './MapStatistics';

interface WorldMapProps {
  countries: CountryData[];
  selectedCountry?: CountryData | null;
  onCountrySelect?: (country: CountryData) => void;
  className?: string;
}

export function WorldMap({ 
  countries, 
  selectedCountry, 
  onCountrySelect, 
  className = "" 
}: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  // Create optimized map data for rendering
  const mapData = useMemo(() => {
    try {
      const countryMap = new Map<string, CountryData>();
      console.log('WorldMap: Processing countries:', countries?.length || 0);
      
      if (countries && countries.length > 0) {
        countries.forEach(country => {
          if (country && country.country && country.country.code) {
            countryMap.set(country.country.code, country);
            console.log('WorldMap: Added country:', country.country.code, country.country.name);
          }
        });
      }
      
      console.log('WorldMap: Total mapped countries:', countryMap.size);
      return countryMap;
    } catch (error) {
      console.error('WorldMap: Error creating map data:', error);
      return new Map<string, CountryData>();
    }
  }, [countries]);

  const handleCountryClick = (countryCode: string) => {
    const country = mapData.get(countryCode);
    if (country && onCountrySelect) {
      onCountrySelect(country);
    }
  };

  const handleMouseEnter = (countryCode: string, event: React.MouseEvent) => {
    const country = mapData.get(countryCode);
    if (country) {
      setHoveredCountry(countryCode);
      setTooltip({
        x: event.clientX,
        y: event.clientY,
        content: TooltipContent({ country })
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip(null);
  };

  // Render fallback when no data
  if (!countries || countries.length === 0) {
    return (
      <div className={`relative bg-white rounded-xl border border-neutral-200 overflow-hidden ${className}`}>
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-heading-md font-bold text-neutral-900 mb-2">
            Global Risk Distribution Map
          </h3>
          <p className="text-body text-neutral-600">
            No country data available for map display
          </p>
        </div>
        <div className="p-6 h-96 flex items-center justify-center bg-neutral-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neutral-300 border-t-accent-navy rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-body text-neutral-600">Loading country data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-white rounded-xl border border-neutral-200 overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-md font-bold text-neutral-900 mb-2">
              Global Risk Distribution Map
            </h3>
            <p className="text-body text-neutral-600">
              Click on countries to view detailed risk analysis
            </p>
          </div>
          <div className="flex items-center gap-4">
            <MapLegend />
          </div>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative p-6">
        <svg 
          viewBox="0 0 900 500" 
          className="w-full h-96 border border-neutral-200 rounded-lg bg-neutral-50"
          style={{ maxHeight: '400px', minHeight: '384px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <rect width="900" height="500" fill="#F8FAFC" />
          
          {/* Debug info */}
          <text x="10" y="20" className="text-xs fill-gray-600">
            Debug: {getAvailableCountries().length} countries, {mapData.size} mapped
          </text>
          
          {/* Render countries using optimized batch rendering */}
          {Object.entries(countryCoordinates).filter(([code]) => mapData.has(code)).map(([countryCode, coords]) => (
            <CountryRenderer
              key={countryCode}
              countryCode={countryCode}
              position={coords}
              country={mapData.get(countryCode)}
              hoveredCountry={hoveredCountry}
              selectedCountry={selectedCountry}
              onCountryClick={handleCountryClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          
          {/* Title */}
          <text
            x="450"
            y="30"
            textAnchor="middle"
            className="text-lg font-bold fill-neutral-700"
          >
            Stable Index Global Risk Map
          </text>
        </svg>
        
        {/* Tooltip */}
        <MapTooltip tooltip={tooltip} />
      </div>
      
      {/* Map Statistics */}
      <MapStatistics countries={countries} />
    </div>
  );
}