// =====================================================
// Efficient Data Fetching Patterns
// =====================================================
// Advanced data fetching patterns dengan optimization
// Includes pagination, lazy loading, dan streaming support
// =====================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { CountryData, HistoricalData } from '../../types';
import { getAllCountriesData, getHistoricalData } from '../index';
import { dataCache } from '../utils/cache';

// Pagination hook untuk large datasets
export const usePagination = <T>(
  data: T[],
  itemsPerPage: number = 10,
  initialPage: number = 1
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);
  
  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);
  
  return {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};

// Infinite scrolling hook
export const useInfiniteScroll = <T>(
  fetchMore: (page: number) => Promise<T[]>,
  hasMore: boolean = true,
  pageSize: number = 10
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadData = useCallback(async (pageNum: number) => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const newData = await fetchMore(pageNum);
      setData(prev => [...prev, ...newData]);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetchMore, hasMore, loading]);

  useEffect(() => {
    loadData(1);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadData(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadData, hasMore, loading, page]);

  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    loadData(1);
  }, [loadData]);

  return {
    data,
    loading,
    error,
    hasMore,
    refresh,
    loadMoreRef,
  };
};

// Lazy loading hook
export const useLazyLoad = <T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded || loading) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchFn();
      setData(result);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, loaded, loading]);

  useEffect(() => {
    // Auto-load after component mounts
    load();
  }, dependencies);

  return { data, loading, error, loaded, load };
};

// Streaming data hook
export const useStreamingData = <T>(
  streamFn: (onData: (chunk: T) => void) => () => void,
  initialData: T[] = []
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<(() => void) | null>(null);

  const startStreaming = useCallback(() => {
    if (streamRef.current) return;

    try {
      setLoading(true);
      setError(null);

      streamRef.current = streamFn((chunk: T) => {
        setData(prev => [...prev, chunk]);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Streaming failed');
      setLoading(false);
    }
  }, [streamFn]);

  const stopStreaming = useCallback(() => {
    if (streamRef.current) {
      streamRef.current();
      streamRef.current = null;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, [stopStreaming]);

  return {
    data,
    loading,
    error,
    startStreaming,
    stopStreaming,
  };
};

// Data prefetching hook
export const useDataPrefetch = () => {
  const prefetchCache = useRef(new Map<string, Promise<any>>());

  const prefetch = useCallback(<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 5 * 60 * 1000
  ): Promise<T> => {
    // Return cached promise if exists
    if (prefetchCache.current.has(key)) {
      return prefetchCache.current.get(key)!;
    }

    // Create and cache new promise
    const promise = fetchFn().then(result => {
      dataCache.set(key, result, ttl);
      // Clean up cache after TTL
      setTimeout(() => {
        prefetchCache.current.delete(key);
      }, ttl);
      return result;
    });

    prefetchCache.current.set(key, promise);
    return promise;
  }, []);

  const prefetchMultiple = useCallback(async <T>(
    requests: Array<{ key: string; fetchFn: () => Promise<T>; ttl?: number }>
  ) => {
    const promises = requests.map(req => 
      prefetch(req.key, req.fetchFn, req.ttl)
    );
    
    return Promise.all(promises);
  }, [prefetch]);

  return { prefetch, prefetchMultiple };
};

// Batch operations hook
export const useBatchOperations = <T, R>(
  operation: (batch: T[]) => Promise<R[]>
) => {
  const [queue, setQueue] = useState<T[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<R[]>([]);

  const addToQueue = useCallback((items: T[]) => {
    setQueue(prev => [...prev, ...items]);
  }, []);

  const processQueue = useCallback(async (batchSize: number = 10) => {
    if (processing || queue.length === 0) return;

    try {
      setProcessing(true);
      const batches = [];
      
      for (let i = 0; i < queue.length; i += batchSize) {
        batches.push(queue.slice(i, i + batchSize));
      }

      const results: R[] = [];
      for (const batch of batches) {
        const batchResults = await operation(batch);
        results.push(...batchResults);
        setResults(prev => [...prev, ...batchResults]);
      }

      setQueue([]);
    } catch (error) {
      console.error('Batch operation failed:', error);
    } finally {
      setProcessing(false);
    }
  }, [queue, processing, operation]);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  return {
    queue,
    processing,
    results,
    addToQueue,
    processQueue,
    clearQueue,
    queueLength: queue.length,
  };
};

// Real-time data sync hook
export const useRealtimeSync = <T>(
  fetchFn: () => Promise<T>,
  syncInterval: number = 30000,
  maxRetries: number = 3
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async (isRetry: boolean = false) => {
    try {
      if (!isRetry) setLoading(true);
      setError(null);

      const result = await fetchFn();
      setData(result);
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sync failed';
      setError(errorMessage);

      if (!isRetry && retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        // Exponential backoff
        setTimeout(() => fetchData(true), Math.pow(2, retryCount) * 1000);
      }
    } finally {
      if (!isRetry) setLoading(false);
    }
  }, [fetchFn, retryCount, maxRetries]);

  const startSync = useCallback(() => {
    if (intervalRef.current) return;

    fetchData();
    intervalRef.current = setInterval(fetchData, syncInterval);
  }, [fetchData, syncInterval]);

  const stopSync = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const forceRefresh = useCallback(() => {
    stopSync();
    fetchData();
    startSync();
  }, [stopSync, fetchData, startSync]);

  useEffect(() => {
    startSync();
    return () => stopSync();
  }, [startSync, stopSync]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    retryCount,
    startSync,
    stopSync,
    forceRefresh,
  };
};

// Optimized data fetcher dengan caching
export const createOptimizedFetcher = <T, P extends any[]>(
  fetchFn: (...args: P) => Promise<T>,
  cacheKey: (...args: P) => string,
  ttl: number = 5 * 60 * 1000
) => {
  return async (...args: P): Promise<T> => {
    const key = cacheKey(...args);
    
    // Check cache first
    const cached = dataCache.get<T>(key);
    if (cached) {
      return cached;
    }

    // Fetch fresh data
    const result = await fetchFn(...args);
    
    // Cache the result
    dataCache.set(key, result, ttl);
    
    return result;
  };
};

export default {
  usePagination,
  useInfiniteScroll,
  useLazyLoad,
  useStreamingData,
  useDataPrefetch,
  useBatchOperations,
  useRealtimeSync,
  createOptimizedFetcher,
};