// =====================================================
// HeroSection Component Exports
// =====================================================
// Optimized exports for code splitting
// =====================================================

// Main components
export { HeroSection, MobileHeroSection, CompactHeroSection } from './HeroSection';

// Sub-components for flexible imports
export { HeroHeader, MobileHeroHeader, CompactHeroHeader } from './HeroHeader';
export { HeroStats, DetailedHeroStats, RiskDistributionStats } from './HeroStats';
export { HeroVideo, LightVideoPreview, StaticVideoPreview } from './HeroVideo';

// Lazy loading exports for dynamic imports
export const LazyHeroSection = () => import('./HeroSection').then(module => ({ 
  default: module.HeroSection 
}));
export const LazyHeroVideo = () => import('./HeroVideo').then(module => ({ 
  default: module.HeroVideo 
}));