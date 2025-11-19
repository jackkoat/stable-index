// =====================================================
// Statistics & Dashboard Data
// =====================================================
// Optimized dashboard statistics dengan caching
// Real-time calculations dengan performance optimization
// =====================================================

import { RiskLevel, CountryData } from '../../types';
import { getAllCountriesData, getCountriesByRiskLevel, getCountriesByRegion } from '../countries';
import { getHistoricalData } from '../historical';
import { dataCache, CACHE_KEYS } from '../utils/cache';

// Core statistics dengan memoization
const calculateBasicStats = () => {
  const cacheKey = CACHE_KEYS.DASHBOARD_STATS;
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const allCountries = getAllCountriesData();
  const totalCountries = allCountries.length;
  
  const stats = {
    total_countries: totalCountries,
    low_risk: allCountries.filter(c => c.current_uri.risk_level === 'Low').length,
    moderate_risk: allCountries.filter(c => c.current_uri.risk_level === 'Moderate').length,
    high_risk: allCountries.filter(c => c.current_uri.risk_level === 'High').length,
    critical_risk: allCountries.filter(c => c.current_uri.risk_level === 'Critical').length,
    avg_uri_score: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.uri_score, 0) / totalCountries).toFixed(2)),
  };
  
  dataCache.set(cacheKey, stats, 5 * 60 * 1000); // 5 minutes cache
  return stats;
};

// Regional statistics
const getRegionalStats = () => {
  const cacheKey = 'regional_stats';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const regions = ['Asia-Pacific', 'Europe', 'Americas', 'MENA', 'Other'];
  const stats = regions.map(regionName => {
    const countries = getCountriesByRegion(regionName);
    const total = countries.length;
    
    return {
      region: regionName,
      total_countries: total,
      low_risk: countries.filter(c => c.current_uri.risk_level === 'Low').length,
      moderate_risk: countries.filter(c => c.current_uri.risk_level === 'Moderate').length,
      high_risk: countries.filter(c => c.current_uri.risk_level === 'High').length,
      critical_risk: countries.filter(c => c.current_uri.risk_level === 'Critical').length,
      avg_uri_score: total > 0 ? 
        parseFloat((countries.reduce((sum, c) => sum + c.current_uri.uri_score, 0) / total).toFixed(2)) : 0,
      highest_risk_country: countries.length > 0 ? 
        countries.reduce((max, country) => 
          country.current_uri.uri_score > max.current_uri.uri_score ? country : max
        ) : null,
      lowest_risk_country: countries.length > 0 ? 
        countries.reduce((min, country) => 
          country.current_uri.uri_score < min.current_uri.uri_score ? country : min
        ) : null,
    };
  });
  
  dataCache.set(cacheKey, stats, 10 * 60 * 1000); // 10 minutes cache
  return stats;
};

// Indicator performance statistics
const getIndicatorStats = () => {
  const cacheKey = 'indicator_stats';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const allCountries = getAllCountriesData();
  
  const indicatorData = {
    youth_unemployment: {
      avg_raw: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.youth_unemployment_raw, 0) / allCountries.length).toFixed(2)),
      avg_norm: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.youth_unemployment_norm, 0) / allCountries.length).toFixed(2)),
      min_value: Math.min(...allCountries.map(c => c.current_uri.youth_unemployment_raw)),
      max_value: Math.max(...allCountries.map(c => c.current_uri.youth_unemployment_raw)),
      top_countries: [...allCountries]
        .sort((a, b) => b.current_uri.youth_unemployment_raw - a.current_uri.youth_unemployment_raw)
        .slice(0, 5),
    },
    food_inflation: {
      avg_raw: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.food_inflation_raw, 0) / allCountries.length).toFixed(2)),
      avg_norm: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.food_inflation_norm, 0) / allCountries.length).toFixed(2)),
      min_value: Math.min(...allCountries.map(c => c.current_uri.food_inflation_raw)),
      max_value: Math.max(...allCountries.map(c => c.current_uri.food_inflation_raw)),
      top_countries: [...allCountries]
        .sort((a, b) => b.current_uri.food_inflation_raw - a.current_uri.food_inflation_raw)
        .slice(0, 5),
    },
    palma_ratio: {
      avg_raw: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.palma_ratio_raw, 0) / allCountries.length).toFixed(2)),
      avg_norm: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.palma_ratio_norm, 0) / allCountries.length).toFixed(2)),
      min_value: Math.min(...allCountries.map(c => c.current_uri.palma_ratio_raw)),
      max_value: Math.max(...allCountries.map(c => c.current_uri.palma_ratio_raw)),
      top_countries: [...allCountries]
        .sort((a, b) => b.current_uri.palma_ratio_raw - a.current_uri.palma_ratio_raw)
        .slice(0, 5),
    },
    corruption_index: {
      avg_raw: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.cpi_raw, 0) / allCountries.length).toFixed(2)),
      avg_norm: parseFloat((allCountries.reduce((sum, c) => sum + c.current_uri.cpi_norm, 0) / allCountries.length).toFixed(2)),
      min_value: Math.min(...allCountries.map(c => c.current_uri.cpi_raw)),
      max_value: Math.max(...allCountries.map(c => c.current_uri.cpi_raw)),
      top_countries: [...allCountries]
        .sort((a, b) => b.current_uri.cpi_raw - a.current_uri.cpi_raw)
        .slice(0, 5),
    },
  };
  
  dataCache.set(cacheKey, indicatorData, 15 * 60 * 1000); // 15 minutes cache
  return indicatorData;
};

// Risk level distribution
const getRiskDistribution = () => {
  const cacheKey = 'risk_distribution';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const allCountries = getAllCountriesData();
  const total = allCountries.length;
  
  const distribution = {
    Low: allCountries.filter(c => c.current_uri.risk_level === 'Low').length,
    Moderate: allCountries.filter(c => c.current_uri.risk_level === 'Moderate').length,
    High: allCountries.filter(c => c.current_uri.risk_level === 'High').length,
    Critical: allCountries.filter(c => c.current_uri.risk_level === 'Critical').length,
  };
  
  const percentage = {
    Low: parseFloat((distribution.Low / total * 100).toFixed(1)),
    Moderate: parseFloat((distribution.Moderate / total * 100).toFixed(1)),
    High: parseFloat((distribution.High / total * 100).toFixed(1)),
    Critical: parseFloat((distribution.Critical / total * 100).toFixed(1)),
  };
  
  const result = {
    counts: distribution,
    percentages: percentage,
    total,
    most_common: Object.entries(distribution).reduce((a, b) => 
      distribution[a[0] as RiskLevel] > distribution[b[0] as RiskLevel] ? a : b
    )[0] as RiskLevel,
    least_common: Object.entries(distribution).reduce((a, b) => 
      distribution[a[0] as RiskLevel] < distribution[b[0] as RiskLevel] ? a : b
    )[0] as RiskLevel,
  };
  
  dataCache.set(cacheKey, result, 10 * 60 * 1000); // 10 minutes cache
  return result;
};

// Top/bottom performers
const getPerformanceRankings = () => {
  const cacheKey = 'performance_rankings';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const allCountries = getAllCountriesData();
  
  const rankings = {
    highest_risk: [...allCountries]
      .sort((a, b) => b.current_uri.uri_score - a.current_uri.uri_score)
      .slice(0, 10),
    lowest_risk: [...allCountries]
      .sort((a, b) => a.current_uri.uri_score - b.current_uri.uri_score)
      .slice(0, 10),
    most_improved: [...allCountries]
      .sort((a, b) => b.trend_value - a.trend_value)
      .slice(0, 5),
    most_declining: [...allCountries]
      .sort((a, b) => a.trend_value - b.trend_value)
      .slice(0, 5),
  };
  
  dataCache.set(cacheKey, rankings, 10 * 60 * 1000); // 10 minutes cache
  return rankings;
};

// Global trends
const getGlobalTrends = () => {
  const cacheKey = 'global_trends';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const allCountries = getAllCountriesData();
  const improving = allCountries.filter(c => c.trend === 'up');
  const declining = allCountries.filter(c => c.trend === 'down');
  const stable = allCountries.filter(c => c.trend === 'stable');
  
  const trends = {
    improving: {
      count: improving.length,
      percentage: parseFloat((improving.length / allCountries.length * 100).toFixed(1)),
      countries: improving,
    },
    declining: {
      count: declining.length,
      percentage: parseFloat((declining.length / allCountries.length * 100).toFixed(1)),
      countries: declining,
    },
    stable: {
      count: stable.length,
      percentage: parseFloat((stable.length / allCountries.length * 100).toFixed(1)),
      countries: stable,
    },
  };
  
  dataCache.set(cacheKey, trends, 15 * 60 * 1000); // 15 minutes cache
  return trends;
};

// Main dashboard data
export const getDashboardStats = () => {
  return {
    basic: calculateBasicStats(),
    regional: getRegionalStats(),
    indicators: getIndicatorStats(),
    riskDistribution: getRiskDistribution(),
    rankings: getPerformanceRankings(),
    trends: getGlobalTrends(),
  };
};

// Export individual functions
export {
  calculateBasicStats,
  getRegionalStats,
  getIndicatorStats,
  getRiskDistribution,
  getPerformanceRankings,
  getGlobalTrends,
};

// Export for backward compatibility
export const dashboardStats = calculateBasicStats();