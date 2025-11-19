// =====================================================
// HeroSection Component Exports
// =====================================================
// Optimized exports for code splitting
// =====================================================

// Main components
export { HeroSection } from './HeroSection';

// Sub-components for flexible imports
export { HeroHeader } from './HeroHeader';
export { HeroStats, DetailedHeroStats, RiskDistributionStats } from './HeroStats';
export { LightVideoPreview, StaticVideoPreview } from './HeroVideo';

// Lazy loading exports for dynamic imports
export const LazyHeroSection = () => import('./HeroSection').then(module => ({ 
  default: module.HeroSection 
}));