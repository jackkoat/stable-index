'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { WorldMap } from '@/components/WorldMap';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { allCountriesData, dashboardStats as mockDashboardStats } from '@/data/mockData';
import { CountryData } from '@/types/index';

interface DashboardStats {
  total_countries: number;
  low_risk: number;
  moderate_risk: number;
  high_risk: number;
  critical_risk: number;
  avg_uri_score: number;
}

export default function DashboardPage() {
  console.log('DashboardPage render, allCountriesData type:', typeof allCountriesData, 'length:', allCountriesData?.length);
  const [countriesData, setCountriesData] = useState<CountryData[]>(allCountriesData);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(mockDashboardStats as DashboardStats);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
  };

  const handleComparisonToggle = () => {
    setComparisonMode(!comparisonMode);
    if (comparisonMode) {
      setSelectedCountry(null);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-surface-tertiary">
        <Navigation />
        
        <main className="pt-20">
          <div className="max-w-[1600px] mx-auto px-8 py-12">
            {/* Dashboard Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="inline-block px-4 py-2 bg-accent-navy/10 border border-accent-navy/30 rounded text-caption 
                           text-accent-navy uppercase tracking-wider font-semibold mb-6">
                Risk Intelligence Dashboard
              </div>
              <h1 className="text-heading-2xl font-bold text-text-primary mb-6 leading-tight">
                Dashboard Analisis Risiko Global
              </h1>
              <p className="text-body-lg text-text-secondary max-w-4xl leading-relaxed">
                Pantau dan analisis tingkat stabilitas negara secara real-time dengan data komprehensif dan visualisasi interaktif yang professional.
              </p>
            </motion.div>

            {/* World Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="data-card mb-12"
            >
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-heading-lg font-semibold text-text-primary">
                  Peta Interaktif Dunia
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleComparisonToggle}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      comparisonMode
                        ? 'bg-accent-navy text-white shadow-md'
                        : 'bg-surface-tertiary text-text-secondary hover:bg-surface-border border border-surface-border'
                    }`}
                  >
                    Mode Perbandingan
                  </button>
                </div>
              </div>
              
              <WorldMap
                countries={countriesData}
                onCountrySelect={handleCountrySelect}
                selectedCountry={selectedCountry}
              />
            </motion.div>

            {/* Dashboard Stats */}
            {dashboardStats && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
              >
                <div className="data-card border-l-4 border-accent-navy">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-accent-navy/10 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-accent-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-caption text-text-muted uppercase tracking-wider mb-1">Total Negara</p>
                      <p className="text-heading-lg font-bold text-text-primary">
                        {dashboardStats.total_countries}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="data-card border-l-4 border-risk-low-base">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-risk-low/10 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-risk-low-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-caption text-text-muted uppercase tracking-wider mb-1">Skor Stabilitas Rata-rata</p>
                      <p className="text-heading-lg font-bold text-risk-low-base">
                        {dashboardStats.avg_uri_score}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="data-card border-l-4 border-risk-critical-base">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-risk-critical/10 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-risk-critical-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-caption text-text-muted uppercase tracking-wider mb-1">Negara Risiko Tinggi</p>
                      <p className="text-heading-lg font-bold text-risk-critical-base">
                        {dashboardStats.high_risk}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="data-card border-l-4 border-risk-low">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-risk-moderate/10 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-risk-moderate-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-caption text-text-muted uppercase tracking-wider mb-1">Negara Risiko Rendah</p>
                      <p className="text-heading-lg font-bold text-risk-moderate-base">
                        {dashboardStats.low_risk}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}