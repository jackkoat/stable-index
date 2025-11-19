'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { WorldMap } from '@/components/WorldMap';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface DashboardStats {
  totalCountries: number;
  avgStabilityScore: number;
  highRiskCountries: number;
  lowRiskCountries: number;
  lastUpdated: string;
}

export default function DashboardPage() {
  const [countriesData, setCountriesData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);

  useEffect(() => {
    // Load dashboard data
    const loadDashboardData = async () => {
      try {
        // TODO: Replace with actual data loading from Supabase
        setDashboardStats({
          totalCountries: 195,
          avgStabilityScore: 72.5,
          highRiskCountries: 23,
          lowRiskCountries: 89,
          lastUpdated: new Date().toISOString()
        });
        
        setCountriesData([]);
        setDataLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setDataLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
      <div className="min-h-screen stable-gradient">
        <Navigation />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-stable-navy-800 mb-4">
                Dashboard Analisis Risiko Global
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Pantau dan analisis tingkat stabilitas negara secara real-time dengan data komprehensif dan visualisasi interaktif.
              </p>
            </motion.div>

            {/* World Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="stable-card p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-stable-navy-800">
                  Peta Interaktif Dunia
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleComparisonToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      comparisonMode
                        ? 'bg-stable-navy-800 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                <div className="stable-card p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-stable-navy-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-stable-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Negara</p>
                      <p className="text-2xl font-bold text-stable-navy-800">
                        {dashboardStats.totalCountries}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="stable-card p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Skor Stabilitas Rata-rata</p>
                      <p className="text-2xl font-bold text-green-800">
                        {dashboardStats.avgStabilityScore}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="stable-card p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Negara Risiko Tinggi</p>
                      <p className="text-2xl font-bold text-red-800">
                        {dashboardStats.highRiskCountries}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="stable-card p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Negara Risiko Rendah</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {dashboardStats.lowRiskCountries}
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