// =====================================================
// Countries Data
// =====================================================
// Optimized country data dengan better structure
// Split by regions untuk faster lookups
// =====================================================

import { Country, CountryData, RiskLevel } from '../../types';
import { normalizationUtils, getRiskLevel } from '../utils/normalization';
import { dataCache, CACHE_KEYS } from '../utils/cache';

// Regional groupings dengan optimization
export const regions = Object.freeze({
  'Asia-Pacific': ['IDN', 'JPN', 'CHN', 'IND', 'AUS', 'KOR'],
  'Europe': ['DEU', 'GBR', 'FRA', 'ITA', 'ESP', 'NLD', 'CHE', 'SWE', 'BEL', 'POL'],
  'Americas': ['USA', 'CAN', 'MEX', 'BRA', 'ARG'],
  'MENA': ['SAU', 'TUR'],
  'Other': ['RUS'],
} as const);

// Raw country data - optimized structure
const rawCountriesData = Object.freeze({
  'ARG': { name: 'Argentina', flag: '🇦🇷', yu: 21.188, fi: 32.3, pr: 2.95, cpi: 34, uri: 67.9, risk: 'High', region: 'Americas' },
  'AUS': { name: 'Australia', flag: '🇦🇺', yu: 9.471, fi: 4.2, pr: 1.75, cpi: 77, uri: 23.9, risk: 'Low', region: 'Asia-Pacific' },
  'BEL': { name: 'Belgium', flag: '🇧🇪', yu: 16.752, fi: 4.8, pr: 1.4, cpi: 69, uri: 28.9, risk: 'Low', region: 'Europe' },
  'BRA': { name: 'Brazil', flag: '🇧🇷', yu: 17.95, fi: 6.66, pr: 3.25, cpi: 34, uri: 47.2, risk: 'Moderate', region: 'Americas' },
  'CAN': { name: 'Canada', flag: '🇨🇦', yu: 12.965, fi: 3.8, pr: 1.85, cpi: 75, uri: 27.0, risk: 'Low', region: 'Americas' },
  'CHE': { name: 'Switzerland', flag: '🇨🇭', yu: 7.94, fi: 2.1, pr: 1.3, cpi: 81, uri: 17.8, risk: 'Low', region: 'Europe' },
  'CHN': { name: 'China', flag: '🇨🇳', yu: 15.226, fi: -2.9, pr: 2.25, cpi: 43, uri: 30.0, risk: 'Low', region: 'Asia-Pacific' },
  'DEU': { name: 'Germany', flag: '🇩🇪', yu: 6.7, fi: 3.8, pr: 1.25, cpi: 75, uri: 19.0, risk: 'Low', region: 'Europe' },
  'ESP': { name: 'Spain', flag: '🇪🇸', yu: 27.009, fi: 4.1, pr: 1.55, cpi: 56, uri: 38.6, risk: 'Low', region: 'Europe' },
  'FRA': { name: 'France', flag: '🇫🇷', yu: 16.57, fi: 3.5, pr: 1.45, cpi: 67, uri: 28.3, risk: 'Low', region: 'Europe' },
  'GBR': { name: 'United Kingdom', flag: '🇬🇧', yu: 12.444, fi: 4.2, pr: 1.65, cpi: 71, uri: 26.4, risk: 'Low', region: 'Europe' },
  'IDN': { name: 'Indonesia', flag: '🇮🇩', yu: 13.141, fi: 4.99, pr: 5.1, cpi: 37, uri: 46.1, risk: 'Moderate', region: 'Asia-Pacific' },
  'IND': { name: 'India', flag: '🇮🇳', yu: 16.028, fi: 5.0, pr: 2.85, cpi: 38, uri: 41.5, risk: 'Moderate', region: 'Asia-Pacific' },
  'ITA': { name: 'Italy', flag: '🇮🇹', yu: 21.801, fi: 3.7, pr: 1.35, cpi: 54, uri: 33.7, risk: 'Low', region: 'Europe' },
  'JPN': { name: 'Japan', flag: '🇯🇵', yu: 3.925, fi: 6.7, pr: 1.15, cpi: 71, uri: 19.5, risk: 'Low', region: 'Asia-Pacific' },
  'KOR': { name: 'Korea, Rep.', flag: '🇰🇷', yu: 5.897, fi: 4.9, pr: 1.45, cpi: 64, uri: 22.2, risk: 'Low', region: 'Asia-Pacific' },
  'MEX': { name: 'Mexico', flag: '🇲🇽', yu: 5.545, fi: 6.0, pr: 2.65, cpi: 26, uri: 35.4, risk: 'Low', region: 'Americas' },
  'NLD': { name: 'Netherlands', flag: '🇳🇱', yu: 8.17, fi: 4.3, pr: 1.2, cpi: 78, uri: 19.8, risk: 'Low', region: 'Europe' },
  'NPL': { name: 'Nepal', flag: '🇳🇵', yu: 20.819, fi: -1.34, pr: 3.0, cpi: 34, uri: 41.0, risk: 'Moderate', region: 'Asia-Pacific' },
  'POL': { name: 'Poland', flag: '🇵🇱', yu: 9.875, fi: 5.0, pr: 1.75, cpi: 53, uri: 28.5, risk: 'Low', region: 'Europe' },
  'RUS': { name: 'Russian Federation', flag: '🇷🇺', yu: 9.252, fi: 11.91, pr: 2.45, cpi: 22, uri: 42.6, risk: 'Moderate', region: 'Other' },
  'SAU': { name: 'Saudi Arabia', flag: '🇸🇦', yu: 13.773, fi: 3.5, pr: 2.15, cpi: 68, uri: 30.1, risk: 'Low', region: 'MENA' },
  'SWE': { name: 'Sweden', flag: '🇸🇪', yu: 23.766, fi: 4.9, pr: 1.15, cpi: 80, uri: 31.1, risk: 'Low', region: 'Europe' },
  'TUR': { name: 'Turkiye', flag: '🇹🇷', yu: 15.567, fi: 30.2, pr: 2.85, cpi: 34, uri: 63.2, risk: 'High', region: 'MENA' },
  'USA': { name: 'United States', flag: '🇺🇸', yu: 9.389, fi: 3.1, pr: 2.45, cpi: 65, uri: 28.7, risk: 'Low', region: 'Americas' },
} as const);

// Precomputed data untuk better performance
const countryCodeToCountry = new Map<string, Country>();
const countryCodeToRawData = new Map<string, typeof rawCountriesData[keyof typeof rawCountriesData]>();

// Initialize lookup maps
Object.entries(rawCountriesData).forEach(([code, data]) => {
  const country: Country = {
    id: `${code.toLowerCase()}-id`,
    code,
    name: data.name,
    flag_emoji: data.flag,
    created_at: new Date().toISOString(),
  };
  
  countryCodeToCountry.set(code, country);
  countryCodeToRawData.set(code, data);
});

// Create CountryData dengan memoization
const createCountryData = (code: string): CountryData => {
  const rawData = countryCodeToRawData.get(code)!;
  const country = countryCodeToCountry.get(code)!;
  
  const yuNorm = normalizationUtils.youthUnemployment(rawData.yu);
  const fiNorm = normalizationUtils.foodInflation(rawData.fi);
  const prNorm = normalizationUtils.palmaRatio(rawData.pr);
  const cpiNorm = normalizationUtils.corruptionIndex(rawData.cpi);
  
  const uriScore = rawData.uri;
  const riskLevel = rawData.risk as RiskLevel;

  return {
    country,
    current_uri: {
      id: `uri-${code.toLowerCase()}`,
      country_id: `${code.toLowerCase()}-id`,
      uri_score: uriScore,
      risk_level: riskLevel,
      youth_unemployment_raw: rawData.yu,
      youth_unemployment_norm: yuNorm,
      food_inflation_raw: rawData.fi,
      food_inflation_norm: fiNorm,
      palma_ratio_raw: rawData.pr,
      palma_ratio_norm: prNorm,
      cpi_raw: rawData.cpi,
      cpi_norm: cpiNorm,
      calculation_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    indicators: {
      youth_unemployment: {
        id: `iv-${code.toLowerCase()}-yu`,
        country_id: `${code.toLowerCase()}-id`,
        indicator_id: 'ind-yu',
        raw_value: rawData.yu,
        normalized_value: yuNorm,
        measurement_date: '2024-01-01',
        data_source: 'World Bank / ILO',
        created_at: new Date().toISOString(),
      },
      food_inflation: {
        id: `iv-${code.toLowerCase()}-fi`,
        country_id: `${code.toLowerCase()}-id`,
        indicator_id: 'ind-fi',
        raw_value: rawData.fi,
        normalized_value: fiNorm,
        measurement_date: '2024-10-01',
        data_source: 'Trading Economics / WB',
        created_at: new Date().toISOString(),
      },
      palma_ratio: {
        id: `iv-${code.toLowerCase()}-pr`,
        country_id: `${code.toLowerCase()}-id`,
        indicator_id: 'ind-pr',
        raw_value: rawData.pr,
        normalized_value: prNorm,
        measurement_date: '2023-01-01',
        data_source: 'WID.world / OECD',
        created_at: new Date().toISOString(),
      },
      corruption_index: {
        id: `iv-${code.toLowerCase()}-cpi`,
        country_id: `${code.toLowerCase()}-id`,
        indicator_id: 'ind-cpi',
        raw_value: rawData.cpi,
        normalized_value: cpiNorm,
        measurement_date: '2024-01-01',
        data_source: 'Transparency International',
        created_at: new Date().toISOString(),
      },
    },
    trend: Math.random() > 0.5 ? 'up' : 'down',
    trend_value: parseFloat((Math.random() * 3).toFixed(1)),
  };
};

// Cache country data creation
const createCountryDataCached = (code: string): CountryData => {
  const cacheKey = `country_data_${code}`;
  const cached = dataCache.get<CountryData>(cacheKey);
  
  if (cached) return cached;
  
  const result = createCountryData(code);
  dataCache.set(cacheKey, result, 10 * 60 * 1000); // 10 minutes cache
  return result;
};

// Public API
export const getAllCountryCodes = (): string[] => Object.keys(rawCountriesData);

export const getCountryByCode = (code: string): CountryData | null => {
  if (!rawCountriesData[code as keyof typeof rawCountriesData]) {
    return null;
  }
  return createCountryDataCached(code);
};

export const getCountriesByRegion = (region: string): CountryData[] => {
  const cacheKey = `${CACHE_KEYS.COUNTRIES_BY_REGION}_${region}`;
  const cached = dataCache.get<CountryData[]>(cacheKey);
  
  if (cached) return cached;
  
  const countryCodes = regions[region as keyof typeof regions] || [];
  const result = countryCodes
    .map(code => getCountryByCode(code))
    .filter((country): country is CountryData => country !== null);
  
  dataCache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes cache
  return result;
};

export const getCountriesByRiskLevel = (riskLevel: RiskLevel): CountryData[] => {
  const cacheKey = `${CACHE_KEYS.COUNTRIES_BY_RISK}_${riskLevel}`;
  const cached = dataCache.get<CountryData[]>(cacheKey);
  
  if (cached) return cached;
  
  const result = getAllCountryCodes()
    .map(code => getCountryByCode(code))
    .filter((country): country is CountryData => 
      country !== null && country.current_uri.risk_level === riskLevel
    );
  
  dataCache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes cache
  return result;
};

// Export all countries data (lazy loaded)
export const getAllCountriesData = (): CountryData[] => {
  const cacheKey = CACHE_KEYS.NORMALIZED_DATA;
  const cached = dataCache.get<CountryData[]>(cacheKey);
  
  if (cached) return cached;
  
  const result = getAllCountryCodes()
    .map(code => getCountryByCode(code))
    .filter((country): country is CountryData => country !== null);
  
  dataCache.set(cacheKey, result, 10 * 60 * 1000); // 10 minutes cache
  return result;
};

// Backward compatibility
export const mockCountriesData = getCountriesByRegion('Asia-Pacific').filter(c => 
  ['IDN', 'NPL', 'JPN'].includes(c.country.code)
);

export { countryCodeToCountry, countryCodeToRawData };