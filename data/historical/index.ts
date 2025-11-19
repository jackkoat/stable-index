// =====================================================
// Historical Data
// =====================================================
// Optimized historical data dengan better structure
// Memory-efficient dengan streaming support
// =====================================================

import { HistoricalData } from '../../types';
import { dataCache } from '../utils/cache';
import { getAllCountryCodes } from '../countries';

// Configuration untuk historical data
const HISTORICAL_CONFIG = {
  DEFAULT_MONTHS: 12,
  MAX_MONTHS: 60,
  CACHE_TTL: 15 * 60 * 1000, // 15 minutes
} as const;

// Generate realistic historical data dengan trend
const generateHistoricalDataForCountry = (
  countryCode: string,
  currentURI: number,
  months: number = HISTORICAL_CONFIG.DEFAULT_MONTHS
): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = new Date();
  
  // Create realistic trend dengan random variation
  const trend = (Math.random() - 0.5) * 2; // -1 to 1 trend
  const volatility = Math.random() * 3 + 2; // 2-5 volatility
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Calculate trend effect
    const monthsFromStart = months - 1 - i;
    const trendEffect = trend * (monthsFromStart / months) * 10;
    
    // Add seasonal variation (higher volatility in recent months)
    const seasonalEffect = Math.sin((monthsFromStart / months) * Math.PI * 2) * volatility * 0.5;
    
    // Add random noise
    const randomNoise = (Math.random() - 0.5) * volatility;
    
    // Calculate historical URI score
    const historicalURI = Math.max(0, Math.min(100, 
      currentURI + trendEffect + seasonalEffect + randomNoise
    ));
    
    data.push({
      date: dateStr,
      uri_score: parseFloat(historicalURI.toFixed(2)),
      country_code: countryCode,
    });
  }
  
  return data;
};

// Cache untuk historical data
const historicalDataCache = new Map<string, HistoricalData[]>();

export const getHistoricalData = (
  countryCode?: string,
  months: number = HISTORICAL_CONFIG.DEFAULT_MONTHS
): HistoricalData[] => {
  // Validate input
  if (months > HISTORICAL_CONFIG.MAX_MONTHS) {
    months = HISTORICAL_CONFIG.MAX_MONTHS;
  }
  
  if (countryCode) {
    // Single country data
    const cacheKey = `hist_${countryCode}_${months}`;
    
    if (historicalDataCache.has(cacheKey)) {
      return historicalDataCache.get(cacheKey)!;
    }
    
    const country = getAllCountryCodes().includes(countryCode) ? 
      countryCode : 'IDN'; // Default to Indonesia if invalid
    
    // Get current URI score (simplified - in real app would be from API)
    const currentURI = 46.1; // Indonesia's current URI as example
    
    const data = generateHistoricalDataForCountry(country, currentURI, months);
    historicalDataCache.set(cacheKey, data);
    
    // Cache invalidation after TTL
    setTimeout(() => {
      historicalDataCache.delete(cacheKey);
    }, HISTORICAL_CONFIG.CACHE_TTL);
    
    return data;
  } else {
    // All countries data
    const cacheKey = `hist_all_${months}`;
    const cached = dataCache.get<HistoricalData[]>(cacheKey);
    
    if (cached) return cached;
    
    const countries = getAllCountryCodes();
    const allData: HistoricalData[] = [];
    
    countries.forEach(code => {
      const countryData = generateHistoricalDataForCountry(code, 30, months); // Using 30 as avg URI
      allData.push(...countryData);
    });
    
    dataCache.set(cacheKey, allData, HISTORICAL_CONFIG.CACHE_TTL);
    return allData;
  }
};

// Get historical data by date range
export const getHistoricalDataByDateRange = (
  countryCode: string,
  startDate: string,
  endDate: string
): HistoricalData[] => {
  const allData = getHistoricalData(countryCode);
  
  return allData.filter(item => {
    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return itemDate >= start && itemDate <= end;
  });
};

// Calculate trend data
export const calculateTrend = (
  data: HistoricalData[]
): { trend: 'up' | 'down' | 'stable'; change: number; changePercent: number } => {
  if (data.length < 2) {
    return { trend: 'stable', change: 0, changePercent: 0 };
  }
  
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const firstValue = sortedData[0].uri_score;
  const lastValue = sortedData[sortedData.length - 1].uri_score;
  
  const change = lastValue - firstValue;
  const changePercent = ((change / firstValue) * 100);
  
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (changePercent > 2) trend = 'up';
  else if (changePercent < -2) trend = 'down';
  
  return {
    trend,
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
  };
};

// Get aggregated data by month/year
export const getAggregatedDataByPeriod = (
  countryCode?: string,
  period: 'month' | 'year' = 'month'
): Array<{
  period: string;
  avg_uri: number;
  min_uri: number;
  max_uri: number;
  data_points: number;
}> => {
  const data = getHistoricalData(countryCode);
  const grouped = new Map<string, HistoricalData[]>();
  
  data.forEach(item => {
    const date = new Date(item.date);
    let periodKey: string;
    
    if (period === 'month') {
      periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } else {
      periodKey = date.getFullYear().toString();
    }
    
    if (!grouped.has(periodKey)) {
      grouped.set(periodKey, []);
    }
    grouped.get(periodKey)!.push(item);
  });
  
  return Array.from(grouped.entries()).map(([periodKey, periodData]) => {
    const scores = periodData.map(d => d.uri_score);
    
    return {
      period: periodKey,
      avg_uri: parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)),
      min_uri: parseFloat(Math.min(...scores).toFixed(2)),
      max_uri: parseFloat(Math.max(...scores).toFixed(2)),
      data_points: periodData.length,
    };
  }).sort((a, b) => a.period.localeCompare(b.period));
};

// Compare historical data between countries
export const compareCountriesHistorical = (
  countryCodes: string[],
  months: number = HISTORICAL_CONFIG.DEFAULT_MONTHS
): Record<string, HistoricalData[]> => {
  const result: Record<string, HistoricalData[]> = {};
  
  countryCodes.forEach(code => {
    result[code] = getHistoricalData(code, months);
  });
  
  return result;
};

// Export for backward compatibility
export const mockHistoricalData = getHistoricalData();