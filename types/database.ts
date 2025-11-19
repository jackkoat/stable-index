// =====================================================
// Database Types & Interfaces
// =====================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          user_name: string
          country_code: string
          country_name: string
          organization?: string
          role?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          user_name: string
          country_code: string
          country_name: string
          organization?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          user_name?: string
          country_code?: string
          country_name?: string
          organization?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: string
          code: string
          name: string
          region: string
          flag_emoji?: string
          population?: number
          gdp_per_capita?: number
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          region: string
          flag_emoji?: string
          population?: number
          gdp_per_capita?: number
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          region?: string
          flag_emoji?: string
          population?: number
          gdp_per_capita?: number
          created_at?: string
        }
        Relationships: []
      }
      stability_data: {
        Row: {
          id: string
          country_code: string
          year: number
          month: number
          youth_unemployment_raw?: number
          youth_unemployment_norm?: number
          food_inflation_raw?: number
          food_inflation_norm?: number
          palma_ratio_raw?: number
          palma_ratio_norm?: number
          cpi_raw?: number
          cpi_norm?: number
          uri_score: number
          risk_level: 'Low' | 'Moderate' | 'High' | 'Critical'
          data_source?: string
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          country_code: string
          year: number
          month: number
          youth_unemployment_raw?: number
          youth_unemployment_norm?: number
          food_inflation_raw?: number
          food_inflation_norm?: number
          palma_ratio_raw?: number
          palma_ratio_norm?: number
          cpi_raw?: number
          cpi_norm?: number
          uri_score: number
          risk_level: 'Low' | 'Moderate' | 'High' | 'Critical'
          data_source?: string
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          country_code?: string
          year?: number
          month?: number
          youth_unemployment_raw?: number
          youth_unemployment_norm?: number
          food_inflation_raw?: number
          food_inflation_norm?: number
          palma_ratio_raw?: number
          palma_ratio_norm?: number
          cpi_raw?: number
          cpi_norm?: number
          uri_score?: number
          risk_level?: 'Low' | 'Moderate' | 'High' | 'Critical'
          data_source?: string
          last_updated?: string
          created_at?: string
        }
        Relationships: []
      }
      historical_data: {
        Row: {
          id: string
          country_id: string
          date: string
          uri_score: number
          created_at: string
        }
        Insert: {
          id?: string
          country_id: string
          date: string
          uri_score: number
          created_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          date?: string
          uri_score?: number
          created_at?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          country_code: string
          alert_type: string
          title: string
          message?: string
          severity: 'Low' | 'Moderate' | 'High' | 'Critical'
          threshold_value?: number
          current_value?: number
          is_active: boolean
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          country_code: string
          alert_type: string
          title: string
          message?: string
          severity: 'Low' | 'Moderate' | 'High' | 'Critical'
          threshold_value?: number
          current_value?: number
          is_active?: boolean
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          country_code?: string
          alert_type?: string
          title?: string
          message?: string
          severity?: 'Low' | 'Moderate' | 'High' | 'Critical'
          threshold_value?: number
          current_value?: number
          is_active?: boolean
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          preferred_regions?: string[]
          alert_thresholds?: Json
          notification_channels?: string[]
          auto_export?: boolean
          export_frequency?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          preferred_regions?: string[]
          alert_thresholds?: Json
          notification_channels?: string[]
          auto_export?: boolean
          export_frequency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          preferred_regions?: string[]
          alert_thresholds?: Json
          notification_channels?: string[]
          auto_export?: boolean
          export_frequency?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}