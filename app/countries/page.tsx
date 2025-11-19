'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { allCountriesData } from '@/data/mockData';
import { CountryData } from '@/types/index';

export default function CountriesPage() {
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
                Country Database
              </div>
              <h1 className="text-heading-2xl font-bold text-text-primary mb-6 leading-tight">
                Global Country Risk Database
              </h1>
              <p className="text-body-lg text-text-secondary max-w-4xl leading-relaxed">
                Comprehensive database of country risk assessments with detailed stability indicators and risk levels.
              </p>
            </motion.div>

            {/* Countries Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {allCountriesData.map((country: CountryData) => (
                <motion.div
                  key={country.country.code}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="data-card cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{country.country.flag_emoji}</span>
                    <div>
                      <h3 className="text-heading-md font-semibold text-text-primary">
                        {country.country.name}
                      </h3>
                      <p className="text-caption text-text-muted">{country.country.code}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        country.current_uri.risk_level === 'Low' ? 'bg-risk-low/10 text-risk-low-base' :
                        country.current_uri.risk_level === 'Moderate' ? 'bg-risk-moderate/10 text-risk-moderate-base' :
                        country.current_uri.risk_level === 'High' ? 'bg-risk-high/10 text-risk-high-base' :
                        'bg-risk-critical/10 text-risk-critical-base'
                      }`}>
                        {country.current_uri.risk_level}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">URI Score:</span>
                      <span className="text-body-sm font-semibold text-text-primary">
                        {country.current_uri.uri_score}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">Youth Unemployment:</span>
                      <span className="text-body-sm font-semibold text-text-primary">
                        {country.current_uri.youth_unemployment_raw}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">Food Inflation:</span>
                      <span className="text-body-sm font-semibold text-text-primary">
                        {country.current_uri.food_inflation_raw}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">Palma Ratio:</span>
                      <span className="text-body-sm font-semibold text-text-primary">
                        {country.current_uri.palma_ratio_raw}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-text-secondary">Corruption Index:</span>
                      <span className="text-body-sm font-semibold text-text-primary">
                        {country.current_uri.cpi_raw}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}