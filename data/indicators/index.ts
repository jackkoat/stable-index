// =====================================================
// Indicators Metadata
// =====================================================
// Optimized indicator definitions dan metadata
// Pre-computed values untuk better performance
// =====================================================

import { Indicator, IndicatorValue } from '../../types';
import { dataCache } from '../utils/cache';

export interface IndicatorMetadata {
  code: string;
  name: string;
  weight: number;
  description: string;
  category: string;
  unit: string;
  dataSource: string;
  updateFrequency: string;
}

// Enhanced indicator metadata dengan more information
const indicatorMetadata: IndicatorMetadata[] = [
  {
    code: 'YU',
    name: 'Youth Unemployment Rate (15-24)',
    weight: 35,
    description: 'Percentage of youth labor force that is unemployed',
    category: 'Economic',
    unit: '%',
    dataSource: 'World Bank / ILO',
    updateFrequency: 'Annual',
  },
  {
    code: 'FI',
    name: 'Food Inflation Rate',
    weight: 30,
    description: 'Annual percentage change in food prices',
    category: 'Economic',
    unit: '%',
    dataSource: 'Trading Economics / World Bank',
    updateFrequency: 'Monthly',
  },
  {
    code: 'PR',
    name: 'Palma Ratio',
    weight: 20,
    description: 'Income share of top 10% divided by bottom 40%',
    category: 'Social',
    unit: 'Ratio',
    dataSource: 'WID.world / OECD',
    updateFrequency: 'Annual',
  },
  {
    code: 'CPI',
    name: 'Corruption Perception Index',
    weight: 15,
    description: 'Transparency International CPI score (inverted)',
    category: 'Governance',
    unit: 'Score',
    dataSource: 'Transparency International',
    updateFrequency: 'Annual',
  },
];

// Pre-computed indicator lookup maps
const indicatorMap = new Map<string, IndicatorMetadata>();
const indicatorCodeToFull = new Map<string, IndicatorMetadata>();

indicatorMetadata.forEach(indicator => {
  indicatorMap.set(indicator.code, indicator);
  indicatorCodeToFull.set(indicator.code, indicator);
});

// Generate Indicator objects untuk database compatibility
export const getIndicator = (code: string): Indicator | null => {
  const metadata = indicatorMap.get(code);
  if (!metadata) return null;

  const ranges = {
    'YU': { min: 2, max: 50 },
    'FI': { min: -5, max: 30 },
    'PR': { min: 0.5, max: 4.0 },
    'CPI': { min: 0, max: 100 },
  }[code] || { min: 0, max: 100 };

  return {
    id: `ind-${code.toLowerCase()}`,
    code: code,
    name: metadata.name,
    weight: metadata.weight,
    min_value: ranges.min,
    max_value: ranges.max,
    description: metadata.description,
    is_inverse: code === 'CPI', // CPI is inverse (lower score = more corruption = higher risk)
    created_at: new Date().toISOString(),
  };
};

// Get all indicators
export const getAllIndicators = (): Indicator[] => {
  const cacheKey = 'all_indicators';
  const cached = dataCache.get<Indicator[]>(cacheKey);
  
  if (cached) return cached;
  
  const result = ['YU', 'FI', 'PR', 'CPI']
    .map(code => getIndicator(code))
    .filter((indicator): indicator is Indicator => indicator !== null);
  
  dataCache.set(cacheKey, result, 30 * 60 * 1000); // 30 minutes cache
  return result;
};

// Get indicators by category
export const getIndicatorsByCategory = (category: string): Indicator[] => {
  const cacheKey = `indicators_by_category_${category}`;
  const cached = dataCache.get<Indicator[]>(cacheKey);
  
  if (cached) return cached;
  
  const result = indicatorMetadata
    .filter(indicator => indicator.category === category)
    .map(indicator => getIndicator(indicator.code)!)
    .filter(Boolean);
  
  dataCache.set(cacheKey, result, 30 * 60 * 1000); // 30 minutes cache
  return result;
};

// Get indicator metadata
export const getIndicatorMetadata = (code: string): IndicatorMetadata | null => {
  return indicatorMap.get(code) || null;
};

// Get all indicator metadata
export const getAllIndicatorMetadata = (): IndicatorMetadata[] => {
  const cacheKey = 'all_indicator_metadata';
  const cached = dataCache.get<IndicatorMetadata[]>(cacheKey);
  
  if (cached) return cached;
  
  dataCache.set(cacheKey, indicatorMetadata, 30 * 60 * 1000); // 30 minutes cache
  return indicatorMetadata;
};

// Calculate composite score dari multiple indicators
export const calculateCompositeScore = (
  indicatorValues: Record<string, number>,
  weights?: Record<string, number>
): number => {
  const defaultWeights = {
    'YU': 0.35,
    'FI': 0.30,
    'PR': 0.20,
    'CPI': 0.15,
  };

  const weightsToUse = weights || defaultWeights;
  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(indicatorValues).forEach(([code, value]) => {
    const weight = (weightsToUse as Record<string, number>)[code] || 0;
    if (weight > 0) {
      totalScore += value * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
};

// Validate indicator value
export const isValidIndicatorValue = (code: string, value: number): boolean => {
  const ranges = {
    'YU': { min: 0, max: 100 },
    'FI': { min: -10, max: 50 },
    'PR': { min: 0, max: 10 },
    'CPI': { min: 0, max: 100 },
  }[code] || { min: 0, max: 100 };

  return value >= ranges.min && value <= ranges.max;
};

// Normalize indicator value
export const normalizeIndicatorValue = (code: string, rawValue: number): number => {
  const ranges = {
    'YU': { min: 2, max: 50 },
    'FI': { min: -5, max: 30 },
    'PR': { min: 0.5, max: 4.0 },
    'CPI': { min: 0, max: 100 },
  }[code] || { min: 0, max: 100 };

  const normalized = ((rawValue - ranges.min) / (ranges.max - ranges.min)) * 100;
  return Math.max(0, Math.min(100, normalized));
};

// Denormalize indicator value
export const denormalizeIndicatorValue = (code: string, normalizedValue: number): number => {
  const ranges = {
    'YU': { min: 2, max: 50 },
    'FI': { min: -5, max: 30 },
    'PR': { min: 0.5, max: 4.0 },
    'CPI': { min: 0, max: 100 },
  }[code] || { min: 0, max: 100 };

  const denormalized = ranges.min + (normalizedValue / 100) * (ranges.max - ranges.min);
  return denormalized;
};

// Get indicator statistics
export const getIndicatorStatistics = () => {
  const cacheKey = 'indicator_statistics';
  const cached = dataCache.get(cacheKey);
  
  if (cached) return cached;
  
  const stats = {
    total_indicators: indicatorMetadata.length,
    categories: Array.from(new Set(indicatorMetadata.map(i => i.category))),
    total_weight: indicatorMetadata.reduce((sum, i) => sum + i.weight, 0),
    average_weight: indicatorMetadata.reduce((sum, i) => sum + i.weight, 0) / indicatorMetadata.length,
    data_sources: Array.from(new Set(indicatorMetadata.map(i => i.dataSource))),
    update_frequencies: Array.from(new Set(indicatorMetadata.map(i => i.updateFrequency))),
  };
  
  dataCache.set(cacheKey, stats, 60 * 60 * 1000); // 1 hour cache
  return stats;
};

// Export for backward compatibility
export const mockIndicatorMetadata = indicatorMetadata.map(meta => ({
  code: meta.code,
  name: meta.name,
  weight: meta.weight,
  description: meta.description,
}));