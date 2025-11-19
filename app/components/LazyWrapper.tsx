import { Suspense, lazy, ComponentType } from 'react';

// Loading component for heavy components
export const ComponentLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1C2D3C]"></div>
    </div>
  </div>
);

// Error boundary for lazy loaded components
export class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component failed to load:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">Failed to load component</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy wrapper for heavy components
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<any>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <LazyErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback || <ComponentLoader />}>
          <LazyComponent {...props} />
        </Suspense>
      </LazyErrorBoundary>
    );
  };
}

// Predefined lazy components for heavy chart libraries
export const LazyHistoricalChart = createLazyComponent(
  () => import('./HistoricalChart').then(module => ({ default: module.HistoricalChart })),
  <div className="p-4 bg-gray-50 rounded-lg">
    <p className="text-gray-500">Loading chart...</p>
  </div>
);

export const LazyWorldMap = createLazyComponent(
  () => import('./WorldMap').then(module => ({ default: module.WorldMap || module })),
  <div className="p-4 bg-gray-50 rounded-lg">
    <p className="text-gray-500">Loading map...</p>
  </div>
);

export const LazyCryptoCommunitySection = createLazyComponent(
  () => import('./CryptoCommunitySection').then(module => ({ default: module.CryptoCommunitySection || module })),
  <div className="p-4 bg-gray-50 rounded-lg">
    <p className="text-gray-500">Loading crypto section...</p>
  </div>
);

// Import React for the error boundary
import React from 'react';