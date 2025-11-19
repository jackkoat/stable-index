// =====================================================
// Map Statistics Component
// =====================================================
// Statistics display for the world map
// Split from WorldMap for better code splitting
// =====================================================

import React from 'react';
import { CountryData, RiskLevel } from '../../../types';
import { getRiskColor } from './ColorScheme';

interface MapStatisticsProps {
  countries: CountryData[];
  className?: string;
}

export function MapStatistics({ countries, className = "" }: MapStatisticsProps) {
  const calculateStats = () => {
    const stats: Record<RiskLevel, number> = {
      'Low': 0,
      'Moderate': 0,
      'High': 0,
      'Critical': 0
    };

    countries.forEach(country => {
      if (country?.current_uri?.risk_level && stats.hasOwnProperty(country.current_uri.risk_level)) {
        stats[country.current_uri.risk_level]++;
      }
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className={`px-6 py-4 bg-neutral-50 border-t border-neutral-200 ${className}`}>
      <div className="grid grid-cols-4 gap-4 text-center">
        {(['Low', 'Moderate', 'High', 'Critical'] as RiskLevel[]).map((level) => (
          <div key={level} className="flex flex-col items-center">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
              style={{ backgroundColor: getRiskColor(level) }}
            >
            </div>
            <div className="text-heading-md font-bold text-neutral-900 mt-1">
              {stats[level]}
            </div>
            <div className="text-caption text-neutral-600 uppercase tracking-wider">
              {level} Risk
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Detailed statistics with percentages
interface DetailedMapStatisticsProps {
  countries: CountryData[];
  className?: string;
}

export function DetailedMapStatistics({ countries, className = "" }: DetailedMapStatisticsProps) {
  const calculateDetailedStats = () => {
    const stats: Record<RiskLevel, { count: number; percentage: number }> = {
      'Low': { count: 0, percentage: 0 },
      'Moderate': { count: 0, percentage: 0 },
      'High': { count: 0, percentage: 0 },
      'Critical': { count: 0, percentage: 0 }
    };

    const totalCountries = countries.length;

    countries.forEach(country => {
      if (country?.current_uri?.risk_level && stats.hasOwnProperty(country.current_uri.risk_level)) {
        stats[country.current_uri.risk_level].count++;
      }
    });

    // Calculate percentages
    Object.keys(stats).forEach(level => {
      const riskLevel = level as RiskLevel;
      stats[riskLevel].percentage = totalCountries > 0 
        ? (stats[riskLevel].count / totalCountries) * 100 
        : 0;
    });

    return { stats, totalCountries };
  };

  const { stats, totalCountries } = calculateDetailedStats();

  return (
    <div className={`bg-neutral-50 border-t border-neutral-200 ${className}`}>
      {/* Summary Header */}
      <div className="px-6 py-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h4 className="text-body-lg font-bold text-neutral-900">Risk Distribution</h4>
          <span className="text-caption text-neutral-600">
            {totalCountries} countries analyzed
          </span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['Low', 'Moderate', 'High', 'Critical'] as RiskLevel[]).map((level) => (
            <div key={level} className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getRiskColor(level) }}
                ></div>
                <span className="text-caption text-neutral-600 uppercase tracking-wider">
                  {level}
                </span>
              </div>
              <div className="text-heading-md font-bold text-neutral-900 mb-1">
                {stats[level].count}
              </div>
              <div className="text-caption text-neutral-600">
                {stats[level].percentage.toFixed(1)}% of total
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ 
                    backgroundColor: getRiskColor(level),
                    width: `${stats[level].percentage}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Live statistics that update with interactions
interface LiveMapStatisticsProps {
  countries: CountryData[];
  highlightedCountries?: string[];
  className?: string;
}

export function LiveMapStatistics({ 
  countries, 
  highlightedCountries = [], 
  className = "" 
}: LiveMapStatisticsProps) {
  const calculateLiveStats = () => {
    const stats: Record<RiskLevel, { count: number; highlighted: number }> = {
      'Low': { count: 0, highlighted: 0 },
      'Moderate': { count: 0, highlighted: 0 },
      'High': { count: 0, highlighted: 0 },
      'Critical': { count: 0, highlighted: 0 }
    };

    countries.forEach(country => {
      if (country?.current_uri?.risk_level && stats.hasOwnProperty(country.current_uri.risk_level)) {
        stats[country.current_uri.risk_level].count++;
        
        if (highlightedCountries.includes(country.country.code)) {
          stats[country.current_uri.risk_level].highlighted++;
        }
      }
    });

    return stats;
  };

  const stats = calculateLiveStats();

  return (
    <div className={`px-6 py-4 bg-neutral-50 border-t border-neutral-200 ${className}`}>
      <div className="grid grid-cols-4 gap-4 text-center">
        {(['Low', 'Moderate', 'High', 'Critical'] as RiskLevel[]).map((level) => (
          <div key={level} className="flex flex-col items-center">
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
                style={{ backgroundColor: getRiskColor(level) }}
              >
              </div>
              {highlightedCountries.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-cyan rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {stats[level].highlighted}
                  </span>
                </div>
              )}
            </div>
            <div className="text-heading-md font-bold text-neutral-900 mt-1">
              {stats[level].count}
            </div>
            <div className="text-caption text-neutral-600 uppercase tracking-wider">
              {level} Risk
            </div>
            {highlightedCountries.length > 0 && (
              <div className="text-xs text-accent-cyan mt-1">
                {stats[level].highlighted} selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}