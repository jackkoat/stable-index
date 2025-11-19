// =====================================================
// Charts Component Exports
// =====================================================
// Optimized chart components for dynamic imports
// =====================================================

// Main chart components
export { HistoricalChart, LightweightChart } from './HistoricalChart';
export { SimpleHistoricalChart, TrendIndicator, MiniChart } from './SimpleHistoricalChart';

// Lazy loading exports for dynamic imports
export const LazyHistoricalChart = () => import('./HistoricalChart').then(module => ({ 
  default: module.HistoricalChart 
}));
export const LazySimpleHistoricalChart = () => import('./SimpleHistoricalChart').then(module => ({ 
  default: module.SimpleHistoricalChart 
}));