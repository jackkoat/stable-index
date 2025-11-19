// =====================================================
// CountryCard Component Exports
// =====================================================
// Optimized exports for code splitting
// =====================================================

// Main components
export { CountryCard } from './CountryCard';

// Sub-components for flexible imports
export { 
  CountryHeader, 
  CompactCountryHeader, 
  MinimalCountryHeader, 
  CountryHeaderWithScore, 
  SelectedCountryHeader 
} from './CountryHeader';
export { 
  ScoreDisplay, 
  CompactScoreDisplay, 
  LargeScoreDisplay, 
  ScoreWithTrend, 
  ScoreRing 
} from './ScoreDisplay';
export { 
  IndicatorsList, 
  HorizontalIndicatorsList, 
  KeyMetricsSummary 
} from './IndicatorsList';

// Lazy loading exports for dynamic imports
export const LazyCountryCard = () => import('./CountryCard').then(module => ({ 
  default: module.CountryCard 
}));