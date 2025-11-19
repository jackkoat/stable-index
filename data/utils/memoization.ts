// =====================================================
// Memoization Utilities
// =====================================================
// Optimized memoization untuk React components dan data operations
// Prevents unnecessary re-renders dan improves performance
// =====================================================

import React, { memo, useMemo, useCallback, ComponentType } from 'react';
import { CountryData, HistoricalData } from '../../types';

// Memoized components untuk better performance
export const MemoizedCountryCard = memo<{
  country: CountryData;
  onSelect?: (code: string) => void;
  isSelected?: boolean;
}>(({ country, onSelect, isSelected }) => {
  const { country: countryInfo, current_uri } = country;
  
  return (
    <div 
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect?.(countryInfo.code)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{countryInfo.flag_emoji}</span>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${
          current_uri.risk_level === 'Low' ? 'bg-green-100 text-green-800' :
          current_uri.risk_level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
          current_uri.risk_level === 'High' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {current_uri.risk_level}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{countryInfo.name}</h3>
      <div className="text-sm text-gray-600">
        <div>URI Score: {current_uri.uri_score}</div>
        <div>Trend: {country.trend === 'up' ? '↗' : country.trend === 'down' ? '↘' : '→'} {country.trend_value}</div>
      </div>
    </div>
  );
});

MemoizedCountryCard.displayName = 'MemoizedCountryCard';

// Memoized chart component
export const MemoizedHistoricalChart = memo<{
  data: HistoricalData[];
  height?: number;
}>(({ data, height = 300 }) => {
  const chartData = useMemo(() => {
    return data.map(item => ({
      date: new Date(item.date),
      value: item.uri_score,
    }));
  }, [data]);

  const maxValue = useMemo(() => 
    Math.max(...chartData.map(d => d.value)), 
    [chartData]
  );

  const minValue = useMemo(() => 
    Math.min(...chartData.map(d => d.value)), 
    [chartData]
  );

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {chartData.map((point, index) => {
          const x = (index / (chartData.length - 1)) * 100;
          const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 80;
          
          return (
            <g key={index}>
              <circle 
                cx={`${x}%`} 
                cy={`${y}%`} 
                r="3" 
                fill="#3B82F6" 
                opacity="0.8"
              />
              {index > 0 && (
                <line
                  x1={`${(index - 1) / (chartData.length - 1) * 100}%`}
                  y1={`${100 - ((chartData[index - 1].value - minValue) / (maxValue - minValue)) * 80}%`}
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.6"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
});

MemoizedHistoricalChart.displayName = 'MemoizedHistoricalChart';

// Memoized stats component
export const MemoizedStatsOverview = memo<{
  totalCountries: number;
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
  criticalRisk: number;
  avgUriScore: number;
}>(({ totalCountries, lowRisk, moderateRisk, highRisk, criticalRisk, avgUriScore }) => {
  const riskDistribution = useMemo(() => [
    { label: 'Low', value: lowRisk, color: 'bg-green-500' },
    { label: 'Moderate', value: moderateRisk, color: 'bg-yellow-500' },
    { label: 'High', value: highRisk, color: 'bg-orange-500' },
    { label: 'Critical', value: criticalRisk, color: 'bg-red-500' },
  ], [lowRisk, moderateRisk, highRisk, criticalRisk]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {riskDistribution.map((item) => (
        <div key={item.label} className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">{item.label}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-xs text-gray-500">
            {((item.value / totalCountries) * 100).toFixed(1)}%
          </div>
        </div>
      ))}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-600">Average URI</div>
        <div className="text-2xl font-bold text-blue-800">{avgUriScore}</div>
      </div>
    </div>
  );
});

MemoizedStatsOverview.displayName = 'MemoizedStatsOverview';

// Enhanced memoization with custom comparison
export const createMemoizedComponent = <P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  const MemoizedComponent = memo(Component, propsAreEqual);
  MemoizedComponent.displayName = `Memoized${Component.displayName || Component.name}`;
  return MemoizedComponent;
};

// Custom comparison functions
export const countryDataComparator = (prevProps: { country: CountryData }, nextProps: { country: CountryData }) => {
  return (
    prevProps.country.country.id === nextProps.country.country.id &&
    prevProps.country.current_uri.uri_score === nextProps.country.current_uri.uri_score &&
    prevProps.country.current_uri.risk_level === nextProps.country.current_uri.risk_level &&
    prevProps.country.trend === nextProps.country.trend
  );
};

export const historicalDataComparator = (prevProps: { data: HistoricalData[] }, nextProps: { data: HistoricalData[] }) => {
  if (prevProps.data.length !== nextProps.data.length) return false;
  
  return prevProps.data.every((item, index) => 
    item.date === nextProps.data[index].date && 
    item.uri_score === nextProps.data[index].uri_score
  );
};

// Performance monitoring hooks
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = React.useRef<number>();
  
  const startMeasure = useCallback(() => {
    startTime.current = performance.now();
  }, []);
  
  const endMeasure = useCallback(() => {
    if (startTime.current) {
      const duration = performance.now() - startTime.current;
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
    }
  }, [componentName]);
  
  React.useEffect(() => {
    startMeasure();
    return () => endMeasure();
  });
  
  return { startMeasure, endMeasure };
};

// Optimized data transformations
export const useMemoizedTransformations = <T, R>(
  data: T[],
  transformFn: (data: T[]) => R,
  dependencies: any[] = []
) => {
  return useMemo(() => transformFn(data), [data, ...dependencies]);
};

export const useMemoizedSorting = <T>(
  data: T[],
  sortFn: (a: T, b: T) => number,
  stableSort: boolean = true
) => {
  return useMemo(() => {
    if (stableSort) {
      return [...data].map((item, index) => ({ item, index }))
        .sort((a, b) => {
          const result = sortFn(a.item, b.item);
          return result !== 0 ? result : a.index - b.index;
        })
        .map(({ item }) => item);
    }
    return [...data].sort(sortFn);
  }, [data, sortFn, stableSort]);
};

export const useMemoizedFiltering = <T>(
  data: T[],
  filterFn: (item: T) => boolean
) => {
  return useMemo(() => data.filter(filterFn), [data, filterFn]);
};

// Debounced callbacks untuk expensive operations
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

// Virtual scrolling helpers
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    
    const visibleItems = items.slice(startIndex, endIndex + 1);
    
    return {
      items: visibleItems,
      startIndex,
      endIndex,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);
  
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);
  
  return {
    ...visibleItems,
    handleScroll,
    setScrollTop,
  };
};

export default {
  MemoizedCountryCard,
  MemoizedHistoricalChart,
  MemoizedStatsOverview,
  createMemoizedComponent,
  countryDataComparator,
  historicalDataComparator,
  usePerformanceMonitor,
  useMemoizedTransformations,
  useMemoizedSorting,
  useMemoizedFiltering,
  useDebouncedCallback,
  useVirtualScroll,
};