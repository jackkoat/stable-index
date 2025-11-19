// =====================================================
// Stub for backward compatibility
// =====================================================
// This file provides backward compatibility for the old component structure
// while using the new optimized modular components
// =====================================================

// Re-export from new modular structure
export { 
  WorldMap,
  LazyWorldMap
} from './WorldMap/';

export { 
  BackgroundMap,
  LightBackgroundMap,
  MinimalBackgroundMap,
  LazyBackgroundMap
} from './BackgroundMap';