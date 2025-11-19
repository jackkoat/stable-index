// =====================================================
// BackgroundMap Component Exports
// =====================================================
// Optimized exports for code splitting
// =====================================================

// Main components
export { BackgroundMap, LightBackgroundMap, MinimalBackgroundMap } from './BackgroundMap';

// Lazy loading exports for dynamic imports
export const LazyBackgroundMap = () => import('./BackgroundMap').then(module => ({ 
  default: module.BackgroundMap 
}));