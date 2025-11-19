// =====================================================
// Simplified Data Layer - Core Exports
// =====================================================
// Optimized data layer dengan modular structure
// =====================================================

// Countries - optimized with caching
import { getAllCountriesData, mockCountriesData, getCountriesByRegion, getCountriesByRiskLevel, regions } from './countries';
export { getAllCountryCodes, getCountryByCode } from './countries';
export { getAllCountriesData, mockCountriesData, getCountriesByRegion, getCountriesByRiskLevel, regions };

// Indicators - enhanced metadata
export {
  getIndicator,
  getAllIndicators,
  getIndicatorsByCategory,
  getIndicatorMetadata,
  getAllIndicatorMetadata,
  calculateCompositeScore,
  mockIndicatorMetadata,
} from './indicators';

// Historical - efficient data management
import { mockHistoricalData, getHistoricalData } from './historical';
export {
  getHistoricalData,
  getHistoricalDataByDateRange,
  calculateTrend,
  getAggregatedDataByPeriod,
  compareCountriesHistorical,
  mockHistoricalData,
} from './historical';

// Statistics - dashboard optimized
import { dashboardStats, getDashboardStats } from './statistics';
export {
  getDashboardStats,
  calculateBasicStats,
  getRegionalStats,
  getIndicatorStats,
  getRiskDistribution,
  getPerformanceRankings,
  getGlobalTrends,
  dashboardStats,
} from './statistics';

// Utilities - performance optimized
import { normalizationUtils } from './utils/normalization';

export {
  dataCache,
  CACHE_KEYS,
  withCache,
  memoizeWithTTL,
} from './utils/cache';
import { dataCache } from './utils/cache';

export {
  MemoizedCountryCard,
  MemoizedHistoricalChart,
  MemoizedStatsOverview,
  useMemoizedSorting,
  // useMemoizedFiltering,
} from './utils/memoization';

// Hooks - efficient data fetching
import { useCountries, useHistoricalData, useDashboardStats } from './hooks/useDataHooks';

// Advanced patterns
export {
  usePagination,
  useInfiniteScroll,
  useLazyLoad,
  useBatchOperations,
  createOptimizedFetcher,
} from './hooks/useDataPatterns';

// Performance monitoring
export {
  DataErrorBoundary as EnhancedErrorBoundary,
  usePerformanceMonitor,
  useCacheMonitor,
  DataLoadingState,
} from './utils/performance';

// Legacy compatibility bridge
export const legacyMockData = {
  allCountriesData: getAllCountriesData(),
  mockCountriesData,
  mockHistoricalData,
  dashboardStats,
  regions,
  getCountriesByRegion,
  getCountriesByRiskLevel,
};

// Version and configuration
export const DATA_LAYER_VERSION = '2.0.0';

export const PERFORMANCE_CONFIG = {
  CACHE_TTL_DEFAULT: 5 * 60 * 1000, // 5 minutes
  CACHE_TTL_LONG: 15 * 60 * 1000,   // 15 minutes
  DEFAULT_HISTORICAL_MONTHS: 12,
  MAX_COMPARISON_COUNTRIES: 5,
};

// Simplified default export
export default {
  // Core functions
  getAllCountriesData,
  // getCountriesByRegion, // in legacyMockData
  getHistoricalData,
  getDashboardStats,
  
  // Utilities
  normalizationUtils,
  dataCache,
  
  // Hooks
  useCountries,
  useHistoricalData,
  useDashboardStats,
  
  // Legacy
  ...legacyMockData,
  
  // Meta
  version: DATA_LAYER_VERSION,
  config: PERFORMANCE_CONFIG,
};