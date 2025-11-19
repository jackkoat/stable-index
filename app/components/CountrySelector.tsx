// =====================================================
// CountrySelector Component
// =====================================================
// Dropdown with search functionality to select country
// Display flag, country name, and URI score with risk badge
// =====================================================

import { useState, useRef, useEffect } from 'react';
import { CountryData, RiskLevel } from '../../types';

interface CountrySelectorProps {
  countries: CountryData[];
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  placeholder?: string;
}

export default function CountrySelector({
  countries,
  selectedCountry,
  onSelectCountry,
  placeholder = 'Select a country...'
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCountry = (country: CountryData) => {
    onSelectCountry(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getRiskBadgeColor = (risk: RiskLevel) => {
    const colors = {
      Low: 'bg-green-500/10 text-green-700 border-green-500/20',
      Moderate: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
      High: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      Critical: 'bg-red-500/10 text-red-700 border-red-500/20',
    };
    return colors[risk];
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Selected Country Display / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-xl 
                   hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 
                   flex items-center justify-between group shadow-sm"
      >
        {selectedCountry ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCountry.country.flag_emoji}</span>
            <div className="text-left">
              <p className="font-semibold text-neutral-900">{selectedCountry.country.name}</p>
              <p className="text-sm text-neutral-500">{selectedCountry.country.code}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getRiskBadgeColor(selectedCountry.current_uri.risk_level)}`}>
                {selectedCountry.current_uri.risk_level}
              </span>
              <span className="text-lg font-bold text-neutral-900">
                {selectedCountry.current_uri.uri_score.toFixed(1)}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-neutral-500">{placeholder}</span>
        )}
        
        {/* Dropdown Arrow */}
        <svg
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-neutral-200 bg-neutral-50">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-lg 
                           text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              <div className="py-1">
                {filteredCountries.map((country) => (
                  <button
                    key={country.country.id}
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-50 
                               transition-colors duration-150 border-l-4 ${
                                 selectedCountry?.country.code === country.country.code
                                   ? 'bg-blue-50 border-l-blue-500'
                                   : 'border-l-transparent'
                               }`}
                  >
                    <span className="text-2xl">{country.country.flag_emoji}</span>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-neutral-900 text-sm">{country.country.name}</p>
                      <p className="text-xs text-neutral-500">{country.country.code}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getRiskBadgeColor(country.current_uri.risk_level)}`}>
                        {country.current_uri.risk_level}
                      </span>
                      <span className="text-sm font-bold text-neutral-900 min-w-[40px] text-right">
                        {country.current_uri.uri_score.toFixed(1)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-neutral-500 text-sm">
                <svg className="w-12 h-12 mx-auto mb-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No countries match your search</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Showing {filteredCountries.length} of {countries.length} countries
          </div>
        </div>
      )}
    </div>
  );
}
