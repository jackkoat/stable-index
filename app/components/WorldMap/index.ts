// =====================================================
// WorldMap Component Exports
// =====================================================
// Optimized exports for code splitting
// =====================================================

// Main component
export { WorldMap } from './WorldMap';

// Sub-components for flexible imports
export { CountryCoordinates } from './CountryCoordinates';
export { ColorScheme } from './ColorScheme';
export { CountryRenderer } from './CountryRenderer';
export { MapTooltip, TooltipContent } from './MapTooltip';
export { MapLegend, InteractiveLegend, CompactLegend } from './MapLegend';
export { MapStatistics, DetailedMapStatistics, LiveMapStatistics } from './MapStatistics';

// Lazy loading exports for dynamic imports
export const LazyWorldMap = () => import('./WorldMap').then(module => ({ default: module.WorldMap }));