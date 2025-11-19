'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { allCountriesData } from '@/data/mockData';
import { CountryData } from '@/types/index';

export default function DataPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-surface-tertiary">
        <Navigation />

        <main className="pt-20">
          <div className="max-w-[1600px] mx-auto px-8 py-12">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="inline-block px-4 py-2 bg-accent-navy/10 border border-accent-navy/30 rounded text-caption
                           text-accent-navy uppercase tracking-wider font-semibold mb-6">
                Country Data Table
              </div>
              <h1 className="text-heading-2xl font-bold text-text-primary mb-6 leading-tight">
                Comprehensive Country Risk Database
              </h1>
              <p className="text-body-lg text-text-secondary max-w-4xl leading-relaxed">
                Detailed tabular view of all country risk assessments with complete indicator data for in-depth analysis.
              </p>
            </motion.div>

            {/* Data Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="data-card overflow-x-auto"
            >
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Country</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Code</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Risk Level</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">URI Score</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Youth Unemployment (%)</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Food Inflation (%)</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Palma Ratio</th>
                    <th className="text-left py-4 px-6 text-heading-sm font-semibold text-text-primary">Corruption Index</th>
                  </tr>
                </thead>
                <tbody>
                  {allCountriesData.map((country: CountryData) => (
                    <tr key={country.country.code} className="border-b border-surface-border hover:bg-surface-secondary/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{country.country.flag_emoji}</span>
                          <span className="text-body font-medium text-text-primary">{country.country.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-body text-text-secondary">{country.country.code}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          country.current_uri.risk_level === 'Low' ? 'bg-risk-low/10 text-risk-low-base' :
                          country.current_uri.risk_level === 'Moderate' ? 'bg-risk-moderate/10 text-risk-moderate-base' :
                          country.current_uri.risk_level === 'High' ? 'bg-risk-high/10 text-risk-high-base' :
                          'bg-risk-critical/10 text-risk-critical-base'
                        }`}>
                          {country.current_uri.risk_level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-body font-semibold text-text-primary">{country.current_uri.uri_score}</td>
                      <td className="py-4 px-6 text-body text-text-secondary">{country.current_uri.youth_unemployment_raw}%</td>
                      <td className="py-4 px-6 text-body text-text-secondary">{country.current_uri.food_inflation_raw}%</td>
                      <td className="py-4 px-6 text-body text-text-secondary">{country.current_uri.palma_ratio_raw}</td>
                      <td className="py-4 px-6 text-body text-text-secondary">{country.current_uri.cpi_raw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}