// =====================================================
// Optimized Mock Data - Simplified Interface
// =====================================================
// Bridge file untuk backward compatibility
// Uses optimized modular structure internally
// =====================================================

import { 
  getAllCountriesData,
  mockCountriesData as optimizedMockCountries,
  getHistoricalData as getOptimizedHistoricalData,
  getDashboardStats as getOptimizedDashboardStats,
  regions as optimizedRegions,
  mockIndicatorMetadata,
} from './index';

// Backward compatibility exports
export const allCountriesData = getAllCountriesData();
export const mockCountriesData = optimizedMockCountries;
export const mockHistoricalData = getOptimizedHistoricalData();
export const dashboardStats = getOptimizedDashboardStats().basic;
export const regions = optimizedRegions;

// Legacy helper functions dengan optimized implementation
export const getCountriesByRegion = (region: string) => {
  const countryCodes = optimizedRegions[region] || [];
  return getAllCountriesData().filter(c => countryCodes.includes(c.country.code));
};

export const getCountriesByRiskLevel = (riskLevel: string) => {
  return getAllCountriesData().filter(c => c.current_uri.risk_level === riskLevel);
};

// Performance note
console.info('Data layer optimized: Using modular structure with caching for better performance');