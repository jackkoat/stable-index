// =====================================================
// Comparison Mode Component
// =====================================================
// Side-by-side multi-country comparison
// Display detailed metrics for selected countries
// =====================================================

import { CountryData } from '../types';
import { RiskBadge } from './RiskBadge';

interface ComparisonModeProps {
  countries: CountryData[];
  onRemoveCountry: (countryCode: string) => void;
  onClose: () => void;
}

export default function ComparisonMode({ 
  countries, 
  onRemoveCountry,
  onClose 
}: ComparisonModeProps) {
  if (countries.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full my-8">
        {/* Header */}
        <div className="px-8 py-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-heading-lg font-semibold text-text-primary">
              Country Comparison Mode
            </h2>
            <p className="text-body text-text-secondary mt-1">
              Comparing {countries.length} countries in detail
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-body-md font-semibold text-neutral-700 sticky left-0 bg-neutral-50">
                  Metric
                </th>
                {countries.map((country) => (
                  <th key={country.country.code} className="px-6 py-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{country.country.flag_emoji}</span>
                      <span className="text-body-md font-semibold text-neutral-900">
                        {country.country.name}
                      </span>
                      <span className="text-caption text-neutral-500">{country.country.code}</span>
                      <button
                        onClick={() => onRemoveCountry(country.country.code)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* SI Score */}
              <tr className="border-t border-surface-border bg-accent-navy/5">
                <td className="px-6 py-4 font-semibold text-text-primary sticky left-0 bg-accent-navy/5">
                  SI Score
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-display-sm font-bold text-blue-700">
                      {country.current_uri.uri_score.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Risk Level */}
              <tr className="border-t border-neutral-200">
                <td className="px-6 py-4 font-semibold text-neutral-900 sticky left-0 bg-white">
                  Risk Level
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <RiskBadge level={country.current_uri.risk_level} />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Youth Unemployment */}
              <tr className="border-t border-neutral-200 bg-neutral-50">
                <td className="px-6 py-4 sticky left-0 bg-neutral-50">
                  <div className="font-semibold text-neutral-900">Youth Unemployment</div>
                  <div className="text-caption text-neutral-500">Weight: 35%</div>
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-body font-semibold text-neutral-900">
                      {country.current_uri.youth_unemployment_raw.toFixed(2)}%
                    </div>
                    <div className="text-caption text-neutral-600">
                      Normalized: {country.current_uri.youth_unemployment_norm.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Food Inflation */}
              <tr className="border-t border-neutral-200">
                <td className="px-6 py-4 sticky left-0 bg-white">
                  <div className="font-semibold text-neutral-900">Food Inflation</div>
                  <div className="text-caption text-neutral-500">Weight: 30%</div>
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-body font-semibold text-neutral-900">
                      {country.current_uri.food_inflation_raw.toFixed(2)}%
                    </div>
                    <div className="text-caption text-neutral-600">
                      Normalized: {country.current_uri.food_inflation_norm.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Palma Ratio */}
              <tr className="border-t border-neutral-200 bg-neutral-50">
                <td className="px-6 py-4 sticky left-0 bg-neutral-50">
                  <div className="font-semibold text-neutral-900">Palma Ratio</div>
                  <div className="text-caption text-neutral-500">Weight: 20%</div>
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-body font-semibold text-neutral-900">
                      {country.current_uri.palma_ratio_raw.toFixed(2)}
                    </div>
                    <div className="text-caption text-neutral-600">
                      Normalized: {country.current_uri.palma_ratio_norm.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>

              {/* CPI */}
              <tr className="border-t border-neutral-200">
                <td className="px-6 py-4 sticky left-0 bg-white">
                  <div className="font-semibold text-neutral-900">Corruption Index</div>
                  <div className="text-caption text-neutral-500">Weight: 15%</div>
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-body font-semibold text-neutral-900">
                      {country.current_uri.cpi_raw.toFixed(0)}
                    </div>
                    <div className="text-caption text-neutral-600">
                      Normalized: {country.current_uri.cpi_norm.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Data Source */}
              <tr className="border-t border-neutral-200 bg-neutral-50">
                <td className="px-6 py-4 font-semibold text-neutral-900 sticky left-0 bg-neutral-50">
                  Data Source
                </td>
                {countries.map((country) => (
                  <td key={country.country.code} className="px-6 py-4 text-center">
                    <div className="text-caption text-neutral-600">
                      {new Date(country.current_uri.calculation_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <p className="text-body text-neutral-600">
            Tip: Click "Remove" on a country to exclude it from comparison
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors font-medium"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
