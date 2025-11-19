// =====================================================
// TypeScript Types & Interfaces
// =====================================================

export interface Country {
  id: string;
  code: string;
  name: string;
  flag_emoji: string;
  created_at: string;
}

export interface Indicator {
  id: string;
  code: string;
  name: string;
  weight: number;
  min_value: number;
  max_value: number;
  description: string;
  is_inverse: boolean;
  created_at: string;
}

export interface IndicatorValue {
  id: string;
  country_id: string;
  indicator_id: string;
  raw_value: number;
  normalized_value?: number;
  measurement_date: string;
  data_source: string;
  created_at: string;
}

export interface URICalculation {
  id: string;
  country_id: string;
  uri_score: number;
  risk_level: RiskLevel;
  youth_unemployment_raw: number;
  youth_unemployment_norm: number;
  food_inflation_raw: number;
  food_inflation_norm: number;
  palma_ratio_raw: number;
  palma_ratio_norm: number;
  cpi_raw: number;
  cpi_norm: number;
  calculation_date: string;
  created_at: string;
}

export interface UserAlert {
  id: string;
  user_id: string;
  country_id: string;
  threshold_score: number;
  notification_channel: string;
  notification_endpoint: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface CountryData {
  country: Country;
  current_uri: URICalculation;
  indicators: {
    youth_unemployment: IndicatorValue;
    food_inflation: IndicatorValue;
    palma_ratio: IndicatorValue;
    corruption_index: IndicatorValue;
  };
  trend: 'up' | 'down' | 'stable';
  trend_value: number;
}

export interface HistoricalData {
  date: string;
  uri_score: number;
  country_code: string;
}

export interface IndicatorHistoricalData {
  date: string;
  value: number;
  country_code: string;
  indicator_code: string;
}
