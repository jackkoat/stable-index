// =====================================================
// Data Hooks
// =====================================================
// Custom hooks untuk data fetching dengan loading states
// Error boundaries dan efficient data management
// =====================================================

import { useState, useEffect, useCallback, useMemo, ComponentType } from 'react';
import { CountryData, RiskLevel } from '../../types';
import { 
  getAllCountriesData, 
  getCountryByCode, 
  getCountriesByRegion, 
  getCountriesByRiskLevel 
} from '../countries';
import { getHistoricalData } from '../historical';
import { getDashboardStats } from '../statistics';
import { dataCache, CACHE_KEYS } from '../utils/cache';

// Generic data hook dengan loading states
function useDataState<T>(
  dataFn: () => T,
  dependencies: any[] = [],
  cacheKey?: string
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (cacheKey && dataCache.has(cacheKey)) {
        const cachedData = dataCache.get<T>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const result = dataFn();
      setData(result);

      // Cache the result
      if (cacheKey) {
        dataCache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes cache
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook untuk countries data
export const useCountries = (region?: string) => {
  const { data, loading, error, refetch } = useDataState(
    () => region ? getCountriesByRegion(region) : getAllCountriesData(),
    [region],
    region ? `countries_${region}` : CACHE_KEYS.NORMALIZED_DATA
  );

  return {
    countries: data || [],
    loading,
    error,
    refetch,
  };
};

// Hook untuk single country
export const useCountry = (countryCode: string) => {
  const { data, loading, error, refetch } = useDataState(
    () => getCountryByCode(countryCode),
    [countryCode],
    `country_${countryCode}`
  );

  return {
    country: data,
    loading,
    error,
    refetch,
  };
};

// Hook untuk countries by risk level
export const useCountriesByRisk = (riskLevel: RiskLevel) => {
  const { data, loading, error, refetch } = useDataState(
    () => getCountriesByRiskLevel(riskLevel),
    [riskLevel],
    `${CACHE_KEYS.COUNTRIES_BY_RISK}_${riskLevel}`
  );

  return {
    countries: data || [],
    loading,
    error,
    refetch,
  };
};

// Hook untuk historical data
export const useHistoricalData = (countryCode?: string, months: number = 12) => {
  const { data, loading, error, refetch } = useDataState(
    () => getHistoricalData(countryCode, months),
    [countryCode, months],
    countryCode ? `hist_${countryCode}_${months}` : `hist_all_${months}`
  );

  return {
    data: data || [],
    loading,
    error,
    refetch,
  };
};

// Hook untuk dashboard statistics
export const useDashboardStats = () => {
  const { data, loading, error, refetch } = useDataState(
    () => getDashboardStats(),
    [],
    CACHE_KEYS.DASHBOARD_STATS
  );

  return {
    stats: data,
    loading,
    error,
    refetch,
  };
};

// Hook dengan filtering dan searching
export const useCountriesWithFilters = (
  region?: string,
  riskLevel?: RiskLevel,
  searchTerm?: string
) => {
  const { countries, loading, error } = useCountries(region);
  
  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (riskLevel) {
      filtered = filtered.filter(c => c.current_uri.risk_level === riskLevel);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.country.name.toLowerCase().includes(term) ||
        c.country.code.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [countries, riskLevel, searchTerm]);

  return {
    countries: filteredCountries,
    loading,
    error,
    totalCount: countries.length,
    filteredCount: filteredCountries.length,
  };
};

// Hook untuk comparison mode
export const useCountryComparison = (countryCodes: string[]) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(countryCodes);
  const [comparisonData, setComparisonData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComparisonData = useCallback(async () => {
    if (selectedCountries.length === 0) {
      setComparisonData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = selectedCountries
        .map(code => getCountryByCode(code))
        .filter((country): country is CountryData => country !== null);

      setComparisonData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedCountries]);

  useEffect(() => {
    fetchComparisonData();
  }, [fetchComparisonData]);

  const addCountry = useCallback((countryCode: string) => {
    if (!selectedCountries.includes(countryCode) && selectedCountries.length < 5) {
      setSelectedCountries(prev => [...prev, countryCode]);
    }
  }, [selectedCountries]);

  const removeCountry = useCallback((countryCode: string) => {
    setSelectedCountries(prev => prev.filter(code => code !== countryCode));
  }, []);

  const clearCountries = useCallback(() => {
    setSelectedCountries([]);
  }, []);

  return {
    selectedCountries,
    comparisonData,
    loading,
    error,
    addCountry,
    removeCountry,
    clearCountries,
    refetch: fetchComparisonData,
  };
};

// Hook untuk real-time data updates
export const useDataSync = (intervalMs: number = 60000) => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [syncEnabled, setSyncEnabled] = useState(true);

  useEffect(() => {
    if (!syncEnabled) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Clear relevant caches to force fresh data
      dataCache.clear();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, syncEnabled]);

  const toggleSync = useCallback(() => {
    setSyncEnabled(prev => !prev);
  }, []);

  const forceRefresh = useCallback(() => {
    setLastUpdated(new Date());
    dataCache.clear();
  }, []);

  return {
    lastUpdated,
    syncEnabled,
    toggleSync,
    forceRefresh,
  };
};

// Error boundary component
export const DataErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: ComponentType<{ error: string; retry: () => void }>;
}> = ({ children, fallback: Fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.message);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const retry = useCallback(() => {
    setHasError(false);
    setError(null);
    window.location.reload();
  }, []);

  if (hasError && error) {
    if (Fallback) {
      return <Fallback error={error} retry={retry} />;
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-600 text-lg font-semibold mb-2">Data Loading Error</div>
        <div className="text-red-500 text-sm mb-4">{error}</div>
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

// Loading skeleton component
export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
      </div>
    ))}
  </div>
);