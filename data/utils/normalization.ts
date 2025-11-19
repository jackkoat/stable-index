// =====================================================
// Normalization Utilities
// =====================================================
// Functions untuk normalizing data untuk URI calculation
// Optimized for performance dengan proper memoization
// =====================================================

// Simple memoization cache untuk performance
const memoCache = new Map<string, number>();

const memoized = (key: string, compute: () => number): number => {
  if (memoCache.has(key)) {
    return memoCache.get(key)!;
  }
  const result = compute();
  memoCache.set(key, result);
  return result;
};

// Memoized normalization functions for performance
const normalizeYU = (raw: number) => memoized(`yu_${raw}`, () => {
  const norm = ((raw - 2) / (50 - 2)) * 100;
  return Math.max(0, Math.min(100, norm));
});

const normalizeFI = (raw: number) => memoized(`fi_${raw}`, () => {
  const norm = ((raw - (-5)) / (30 - (-5))) * 100;
  return Math.max(0, Math.min(100, norm));
});

const normalizePR = (raw: number) => memoized(`pr_${raw}`, () => {
  const norm = ((raw - 0.5) / (4.0 - 0.5)) * 100;
  return Math.max(0, Math.min(100, norm));
});

const normalizeCPI = (raw: number) => memoized(`cpi_${raw}`, () => 100 - raw);

// Public interface untuk normalization
export const normalizationUtils = {
  youthUnemployment: (value: number): number => parseFloat(normalizeYU(value).toFixed(2)),
  foodInflation: (value: number): number => parseFloat(normalizeFI(value).toFixed(2)),
  palmaRatio: (value: number): number => parseFloat(normalizePR(value).toFixed(2)),
  corruptionIndex: (value: number): number => parseFloat(normalizeCPI(value).toFixed(2)),
};

// Calculate composite URI score
export const calculateURIScore = (
  youthUnemploymentNorm: number,
  foodInflationNorm: number,
  palmaRatioNorm: number,
  corruptionNorm: number
): number => {
  // Weighted average dengan indicator weights
  const weights = {
    youthUnemployment: 0.35,
    foodInflation: 0.30,
    palmaRatio: 0.20,
    corruptionIndex: 0.15,
  };

  const score = (
    youthUnemploymentNorm * weights.youthUnemployment +
    foodInflationNorm * weights.foodInflation +
    palmaRatioNorm * weights.palmaRatio +
    corruptionNorm * weights.corruptionIndex
  );

  return parseFloat(score.toFixed(2));
};

// Determine risk level from URI score
export const getRiskLevel = (uriScore: number): 'Low' | 'Moderate' | 'High' | 'Critical' => {
  if (uriScore < 25) return 'Low';
  if (uriScore < 45) return 'Moderate';
  if (uriScore < 65) return 'High';
  return 'Critical';
};

// Cache untuk normalization ranges
export const normalizationRanges = {
  youthUnemployment: { min: 2, max: 50 },
  foodInflation: { min: -5, max: 30 },
  palmaRatio: { min: 0.5, max: 4.0 },
  corruptionIndex: { min: 0, max: 100 },
};