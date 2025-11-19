// =====================================================
// Country Header Component
// =====================================================
// Country name, flag, and trend display
// Reusable across different card layouts
// =====================================================

import React from 'react';
import { CountryData } from '../../../types';
import { getTrendIcon, getTrendColor, formatNumber } from '@/lib/utils';

interface CountryHeaderProps {
  country: CountryData['country'];
  trend: CountryData['trend'];
  trend_value: CountryData['trend_value'];
  onClick?: (e?: React.MouseEvent) => void;
  clickable?: boolean;
  selected?: boolean;
  className?: string;
}

export function CountryHeader({
  country,
  trend,
  trend_value,
  onClick,
  clickable = false,
  selected = false,
  className = ""
}: CountryHeaderProps) {
  const trendColorClass = getTrendColor(trend);
  const trendIcon = getTrendIcon(trend);

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between mb-6 pb-4 border-b border-surface-border
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{country.flag_emoji}</span>
        <div>
          <h3 className="text-heading-sm font-bold text-text-primary tracking-tight">
            {country.name.toUpperCase()}
          </h3>
          <p className="text-micro text-text-dim uppercase tracking-wider">
            {country.code}
          </p>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 text-body-md font-semibold ${trendColorClass}`}>
        <span className="text-lg">{trendIcon}</span>
        <span>{formatNumber(Math.abs(trend_value), 1)}</span>
      </div>
    </div>
  );
}

// Compact header for smaller cards
export function CompactCountryHeader({
  country,
  trend,
  trend_value,
  onClick,
  clickable = false,
  className = ""
}: CountryHeaderProps) {
  const trendColorClass = getTrendColor(trend);
  const trendIcon = getTrendIcon(trend);

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between mb-4 pb-2 border-b border-surface-border
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{country.flag_emoji}</span>
        <div>
          <h3 className="text-body font-bold text-text-primary tracking-tight">
            {country.name.toUpperCase()}
          </h3>
          <p className="text-micro text-text-dim uppercase tracking-wider">
            {country.code}
          </p>
        </div>
      </div>
      <div className={`flex items-center gap-1 text-body font-semibold ${trendColorClass}`}>
        <span className="text-sm">{trendIcon}</span>
        <span>{formatNumber(Math.abs(trend_value), 1)}</span>
      </div>
    </div>
  );
}

// Minimal header for list view
export function MinimalCountryHeader({
  country,
  onClick,
  clickable = false,
  className = ""
}: Omit<CountryHeaderProps, 'trend' | 'trend_value'>) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3
        ${clickable ? 'cursor-pointer hover:bg-surface-tertiary/30 p-2 -m-2 rounded transition-colors' : ''}
        ${className}
      `}
    >
      <span className="text-xl">{country.flag_emoji}</span>
      <div>
        <div className="text-body font-semibold text-text-primary">
          {country.name}
        </div>
        <div className="text-micro text-text-dim uppercase tracking-wider">
          {country.code}
        </div>
      </div>
    </div>
  );
}

// Header with score preview
export function CountryHeaderWithScore({
  country,
  trend,
  trend_value,
  score,
  onClick,
  clickable = false,
  className = ""
}: CountryHeaderProps & { score: number }) {
  const trendColorClass = getTrendColor(trend);
  const trendIcon = getTrendIcon(trend);

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between mb-4
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{country.flag_emoji}</span>
        <div>
          <h3 className="text-heading-sm font-bold text-text-primary tracking-tight">
            {country.name.toUpperCase()}
          </h3>
          <p className="text-micro text-text-dim uppercase tracking-wider">
            {country.code}
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-heading-sm font-bold text-accent-navy">
          {formatNumber(score)}
        </div>
        <div className={`flex items-center gap-1 text-body-sm font-semibold ${trendColorClass}`}>
          <span className="text-sm">{trendIcon}</span>
          <span>{formatNumber(Math.abs(trend_value), 1)}</span>
        </div>
      </div>
    </div>
  );
}

// Selected state with highlight
export function SelectedCountryHeader({
  country,
  trend,
  trend_value,
  onClick,
  clickable = true,
  className = ""
}: CountryHeaderProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between mb-6 pb-4 border-b-2 border-accent-navy
        bg-accent-navy/5 -mx-4 px-4 py-2 rounded-t-lg
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="text-3xl">{country.flag_emoji}</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-cyan rounded-full animate-pulse"></div>
        </div>
        <div>
          <h3 className="text-heading-sm font-bold text-text-primary tracking-tight">
            {country.name.toUpperCase()}
          </h3>
          <p className="text-micro text-accent-navy font-semibold uppercase tracking-wider">
            {country.code} • SELECTED
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-body-md font-semibold text-accent-cyan">
        <span className="text-lg">{getTrendIcon(trend)}</span>
        <span>{formatNumber(Math.abs(trend_value), 1)}</span>
      </div>
    </div>
  );
}