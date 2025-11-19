// =====================================================
// Map Legend Component
// =====================================================
// Risk level legend for the world map
// Split from WorldMap for better code splitting
// =====================================================

import React from 'react';
import { RiskLevel } from '../../types';
import { getRiskColor } from './ColorScheme';

interface MapLegendProps {
  riskLevels?: RiskLevel[];
  showCounts?: boolean;
  countryCounts?: Record<RiskLevel, number>;
  className?: string;
}

export function MapLegend({ 
  riskLevels = ['Low', 'Moderate', 'High', 'Critical'], 
  showCounts = false,
  countryCounts,
  className = ""
}: MapLegendProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-caption text-neutral-600 font-medium">Risk Level:</span>
      {riskLevels.map((level) => (
        <div key={level} className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded-full border border-neutral-300" 
            style={{ backgroundColor: getRiskColor(level) }}
          ></div>
          <span className="text-caption text-neutral-600">
            {level}
            {showCounts && countryCounts && (
              <span className="ml-1 text-xs bg-neutral-100 px-1.5 py-0.5 rounded-full">
                {countryCounts[level]}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// Interactive legend with hover effects
interface InteractiveLegendProps {
  riskLevels?: RiskLevel[];
  onLevelHover?: (level: RiskLevel | null) => void;
  selectedLevels?: RiskLevel[];
  className?: string;
}

export function InteractiveLegend({
  riskLevels = ['Low', 'Moderate', 'High', 'Critical'],
  onLevelHover,
  selectedLevels = [],
  className = ""
}: InteractiveLegendProps) {
  const handleMouseEnter = (level: RiskLevel) => {
    if (onLevelHover) {
      onLevelHover(level);
    }
  };

  const handleMouseLeave = () => {
    if (onLevelHover) {
      onLevelHover(null);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-caption text-neutral-600 font-medium">Filter by Risk:</span>
      {riskLevels.map((level) => {
        const isSelected = selectedLevels.includes(level);
        return (
          <button
            key={level}
            onMouseEnter={() => handleMouseEnter(level)}
            onMouseLeave={handleMouseLeave}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-caption font-medium
              transition-all duration-200 hover:scale-105
              ${isSelected 
                ? 'bg-neutral-900 text-white shadow-md' 
                : 'bg-white text-neutral-600 border border-neutral-300 hover:border-neutral-400'
              }
            `}
          >
            <div 
              className="w-2 h-2 rounded-full border border-current" 
              style={{ backgroundColor: getRiskColor(level) }}
            ></div>
            <span>{level}</span>
          </button>
        );
      })}
    </div>
  );
}

// Compact legend for small spaces
interface CompactLegendProps {
  riskLevels?: RiskLevel[];
  className?: string;
}

export function CompactLegend({ 
  riskLevels = ['Low', 'Moderate', 'High', 'Critical'], 
  className = "" 
}: CompactLegendProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {riskLevels.map((level) => (
        <div key={level} className="flex flex-col items-center">
          <div 
            className="w-3 h-3 rounded-full border border-neutral-400 mb-1" 
            style={{ backgroundColor: getRiskColor(level) }}
          ></div>
          <span className="text-xs text-neutral-600 uppercase tracking-wider">
            {level.charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
}