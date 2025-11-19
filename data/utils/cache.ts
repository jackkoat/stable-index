// =====================================================
// Data Caching Utilities
// =====================================================
// High-performance caching untuk data operations
// Memory-efficient dengan TTL support
// =====================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class DataCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Global cache instance
export const dataCache = new DataCache();

// Cache keys constant untuk konsistensi
export const CACHE_KEYS = {
  COUNTRIES_BY_REGION: 'countries_by_region',
  COUNTRIES_BY_RISK: 'countries_by_risk',
  DASHBOARD_STATS: 'dashboard_stats',
  HISTORICAL_DATA: 'historical_data',
  INDICATOR_METADATA: 'indicator_metadata',
  NORMALIZED_DATA: 'normalized_data',
} as const;

// Cache decorator untuk functions
export const withCache = <T extends any[], R>(
  key: string,
  ttl: number = 5 * 60 * 1000,
  compute: (...args: T) => R
) => {
  return (...args: T): R => {
    const cacheKey = `${key}_${JSON.stringify(args)}`;
    const cached = dataCache.get<R>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }

    const result = compute(...args);
    dataCache.set(cacheKey, result, ttl);
    return result;
  };
};

// Memoization wrapper dengan TTL
export const memoizeWithTTL = <T extends (...args: any[]) => any>(
  func: T,
  ttl: number = 5 * 60 * 1000
): T => {
  const cache = new Map<string, { result: any; timestamp: number }>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    const entry = cache.get(key);

    if (entry && Date.now() - entry.timestamp < ttl) {
      return entry.result;
    }

    const result = func(...args);
    cache.set(key, { result, timestamp: Date.now() });
    return result;
  }) as T;
};

// Clear expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of Array.from(dataCache['cache'].entries())) {
    if (now - entry.timestamp > entry.ttl) {
      dataCache.delete(key);
    }
  }
}, 60000); // Check every minute

export default dataCache;