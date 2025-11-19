// =====================================================
// Performance Monitor & Error Boundaries
// =====================================================
// Advanced performance monitoring dan error handling
// untuk data layer optimization
// =====================================================

import React, { Component, ErrorInfo, ReactNode, useEffect, useRef, useState } from 'react';
import { dataCache } from '../utils/cache';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: MemoryInfo;
  cacheHitRate: number;
  dataSize: number;
  lastUpdate: Date;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableRetry?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Enhanced Error Boundary
export class DataErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutRef: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to analytics/monitoring service
    console.error('Data layer error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    this.props.onError?.(error, errorInfo);
  }

  componentWillUnmount() {
    if (this.retryTimeoutRef) {
      clearTimeout(this.retryTimeoutRef);
    }
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback;

      return (
        <Fallback 
          error={this.state.error} 
          retry={this.retry}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{
  error: Error;
  retry: () => void;
  errorInfo?: ErrorInfo | null;
}> = ({ error, retry, errorInfo }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          retry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retry]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-md mx-auto">
      <div className="text-red-600 text-xl font-bold mb-2">Data Loading Error</div>
      <div className="text-red-500 text-sm mb-4 text-center">
        <p className="mb-2">{error.message}</p>
        {process.env.NODE_ENV === 'development' && errorInfo?.componentStack && (
          <details className="text-left">
            <summary className="cursor-pointer">Component Stack</summary>
            <pre className="text-xs mt-2 bg-red-100 p-2 rounded overflow-auto">
              {errorInfo.componentStack}
            </pre>
          </details>
        )}
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Auto-retry in {countdown} seconds...
      </div>
      <button
        onClick={retry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Retry Now
      </button>
    </div>
  );
};

// Performance Monitor Hook
export const usePerformanceMonitor = (componentName: string, enabled: boolean = true) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef<number>(0);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    cacheHitRate: 0,
    dataSize: 0,
    lastUpdate: new Date(),
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    renderCount.current += 1;

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      lastRenderTime.current = renderTime;

      // Update metrics
      const cacheStats = dataCache.getStats();
      setMetrics({
        renderTime,
        memoryUsage: (performance as any).memory,
        cacheHitRate: cacheStats.size > 0 ? 0.85 : 0, // Simplified calculation
        dataSize: cacheStats.size * 100, // Estimated size
        lastUpdate: new Date(),
      });

      // Log slow renders
      if (renderTime > 16) { // > 16ms (60fps)
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  useEffect(() => {
    if (!enabled || process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      console.group(`Performance: ${componentName}`);
      console.log('Render count:', renderCount.current);
      console.log('Last render time:', `${lastRenderTime.current.toFixed(2)}ms`);
      console.log('Cache stats:', dataCache.getStats());
      console.log('Memory usage:', (performance as any).memory?.usedJSHeapSize);
      console.groupEnd();
    }, 30000); // Log every 30 seconds

    return () => clearInterval(interval);
  }, [componentName, enabled]);

  return {
    metrics,
    renderCount: renderCount.current,
  };
};

// Memory usage monitor
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);

  useEffect(() => {
    if (!('memory' in performance)) {
      console.warn('Memory API not available');
      return;
    }

    const updateMemoryInfo = () => {
      setMemoryInfo((performance as any).memory);
    };

    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds
    updateMemoryInfo();

    return () => clearInterval(interval);
  }, []);

  const getMemoryUsage = () => {
    if (!memoryInfo) return null;
    
    return {
      used: `${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      usage: `${((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100).toFixed(1)}%`,
    };
  };

  return {
    memoryInfo,
    memoryUsage: getMemoryUsage(),
  };
};

// Cache performance monitor
export const useCacheMonitor = () => {
  const [cacheStats, setCacheStats] = useState(dataCache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(dataCache.getStats());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const clearCache = () => {
    dataCache.clear();
    setCacheStats({ size: 0, keys: [] });
  };

  const getCacheEfficiency = () => {
    if (cacheStats.size === 0) return 0;
    // Simplified efficiency calculation
    return Math.min(100, cacheStats.size * 10);
  };

  return {
    cacheStats,
    clearCache,
    efficiency: getCacheEfficiency(),
  };
};

// Network request monitor
export const useNetworkMonitor = () => {
  const [requestStats, setRequestStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    averageResponseTime: 0,
  });

  const addRequest = (responseTime: number, success: boolean) => {
    setRequestStats(prev => {
      const total = prev.total + 1;
      const successful = success ? prev.successful + 1 : prev.successful;
      const failed = success ? prev.failed : prev.failed + 1;
      const averageResponseTime = (
        (prev.averageResponseTime * prev.total + responseTime) / total
      );

      return {
        total,
        successful,
        failed,
        averageResponseTime,
      };
    });
  };

  const getSuccessRate = () => {
    if (requestStats.total === 0) return 0;
    return (requestStats.successful / requestStats.total) * 100;
  };

  return {
    requestStats,
    addRequest,
    successRate: getSuccessRate(),
  };
};

// Global performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: Map<string, PerformanceObserver> = new Map();
  private metrics: Map<string, any> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMonitoring(componentName: string) {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'measure') {
            this.metrics.set(`${componentName}_${entry.name}`, entry.duration);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });
      this.observers.set(componentName, observer);
    }
  }

  stopMonitoring(componentName: string) {
    const observer = this.observers.get(componentName);
    if (observer) {
      observer.disconnect();
      this.observers.delete(componentName);
    }
  }

  getMetrics(componentName?: string) {
    if (componentName) {
      return this.metrics.get(`${componentName}_render`) || 0;
    }
    return Object.fromEntries(this.metrics);
  }

  measureRender(componentName: string, renderFn: () => void) {
    if ('performance' in window && 'measure' in performance) {
      performance.mark(`${componentName}_start`);
      renderFn();
      performance.mark(`${componentName}_end`);
      performance.measure(`${componentName}_render`, `${componentName}_start`, `${componentName}_end`);
    } else {
      renderFn();
    }
  }
}

// Loading state component dengan skeleton
export const DataLoadingState: React.FC<{
  isLoading: boolean;
  error?: string | null;
  skeleton?: ReactNode;
  children: ReactNode;
  errorRetry?: () => void;
}> = ({ isLoading, error, skeleton, children, errorRetry }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Data</div>
        <div className="text-red-500 text-sm mb-4">{error}</div>
        {errorRetry && (
          <button
            onClick={errorRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {skeleton || (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-16 rounded"></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default {
  DataErrorBoundary,
  usePerformanceMonitor,
  useMemoryMonitor,
  useCacheMonitor,
  useNetworkMonitor,
  PerformanceMonitor,
  DataLoadingState,
};