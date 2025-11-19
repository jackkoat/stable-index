// =====================================================
// Optimized Country Card Component
// =====================================================
// Split into smaller chunks for better code splitting
// Uses lazy-loaded subcomponents for optimal bundle size
// =====================================================

import React, { Suspense, lazy } from 'react';
import { CountryData } from '../../types';

// Lazy load heavy components
const CountryHeader = lazy(() => import('./CountryHeader').then(module => ({ 
  default: module.CountryHeader 
})));
const ScoreDisplay = lazy(() => import('./ScoreDisplay').then(module => ({ 
  default: module.ScoreDisplay 
})));
const IndicatorsList = lazy(() => import('./IndicatorsList').then(module => ({ 
  default: module.IndicatorsList 
})));

// Import components directly (lighter)
import { getTimeAgo } from '../../lib/utils';

interface CountryCardProps {
  data: CountryData;
  onClick?: (e?: React.MouseEvent) => void;
  isSelected?: boolean;
  variant?: 'default' | 'compact' | 'minimal' | 'detailed';
  showIndicators?: boolean;
  showTimestamp?: boolean;
  className?: string;
}

export function CountryCard({ 
  data, 
  onClick, 
  isSelected = false,
  variant = 'default',
  showIndicators = true,
  showTimestamp = true,
  className = "" 
}: CountryCardProps) {
  const { country, current_uri, indicators, trend, trend_value } = data;

  // Render different variants
  switch (variant) {
    case 'compact':
      return <CompactCountryCard data={data} onClick={onClick} isSelected={isSelected} className={className} />;
    case 'minimal':
      return <MinimalCountryCard data={data} onClick={onClick} className={className} />;
    case 'detailed':
      return <DetailedCountryCard data={data} onClick={onClick} isSelected={isSelected} className={className} />;
    default:
      return <DefaultCountryCard data={data} onClick={onClick} isSelected={isSelected} showIndicators={showIndicators} showTimestamp={showTimestamp} className={className} />;
  }
}

// Default Country Card
function DefaultCountryCard({ 
  data, 
  onClick, 
  isSelected = false,
  showIndicators = true,
  showTimestamp = true,
  className = "" 
}: CountryCardProps) {
  const { country, current_uri, indicators, trend, trend_value } = data;

  return (
    <div 
      onClick={onClick}
      className={`
        data-card-elevated
        hover:border-accent-navy/40 hover:shadow-lg
        transition-all duration-normal
        ${onClick ? 'cursor-pointer' : ''}
        ${isSelected ? 'border-accent-navy shadow-md' : ''}
        ${className}
      `}
    >
      <Suspense fallback={<CountryCardSkeleton />}>
        <CountryHeader
          country={country}
          trend={trend}
          trend_value={trend_value}
          onClick={onClick}
          clickable={!!onClick}
          selected={isSelected}
        />
      </Suspense>

      <Suspense fallback={<ScoreSkeleton />}>
        <ScoreDisplay
          score={current_uri.uri_score}
          riskLevel={current_uri.risk_level}
        />
      </Suspense>

      {showIndicators && (
        <Suspense fallback={<IndicatorsSkeleton />}>
          <IndicatorsList indicators={indicators} />
        </Suspense>
      )}

      {showTimestamp && (
        <div className="text-caption text-text-dim text-center pt-4 border-t border-surface-border uppercase tracking-wider">
          Updated: {getTimeAgo(current_uri.calculation_date)}
        </div>
      )}
    </div>
  );
}

// Compact Country Card
function CompactCountryCard({ data, onClick, isSelected = false, className = "" }: CountryCardProps) {
  const { country, current_uri, trend, trend_value } = data;

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white border border-neutral-200 rounded-lg p-4 hover:border-accent-navy/40 hover:shadow-md
        transition-all duration-normal
        ${onClick ? 'cursor-pointer' : ''}
        ${isSelected ? 'border-accent-navy shadow-md bg-accent-navy/5' : ''}
        ${className}
      `}
    >
      <Suspense fallback={<CompactHeaderSkeleton />}>
        <CountryHeader.CompactCountryHeader
          country={country}
          trend={trend}
          trend_value={trend_value}
          onClick={onClick}
          clickable={!!onClick}
        />
      </Suspense>

      <Suspense fallback={<CompactScoreSkeleton />}>
        <ScoreDisplay.CompactScoreDisplay
          score={current_uri.uri_score}
          riskLevel={current_uri.risk_level}
        />
      </Suspense>
    </div>
  );
}

// Minimal Country Card
function MinimalCountryCard({ data, onClick, className = "" }: CountryCardProps) {
  const { country, current_uri } = data;

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 hover:bg-surface-tertiary/30 rounded
        transition-all duration-normal
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <Suspense fallback={<MinimalHeaderSkeleton />}>
        <CountryHeader.MinimalCountryHeader
          country={country}
          onClick={onClick}
          clickable={!!onClick}
        />
      </Suspense>

      <Suspense fallback={<MinimalScoreSkeleton />}>
        <ScoreDisplay.CompactScoreDisplay
          score={current_uri.uri_score}
          riskLevel={current_uri.risk_level}
        />
      </Suspense>
    </div>
  );
}

// Detailed Country Card
function DetailedCountryCard({ data, onClick, isSelected = false, className = "" }: CountryCardProps) {
  const { country, current_uri, indicators, trend, trend_value } = data;

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white border border-neutral-200 rounded-xl p-6 hover:border-accent-navy/40 hover:shadow-lg
        transition-all duration-normal
        ${onClick ? 'cursor-pointer' : ''}
        ${isSelected ? 'border-accent-navy shadow-md bg-accent-navy/5' : ''}
        ${className}
      `}
    >
      <Suspense fallback={<DetailedHeaderSkeleton />}>
        <CountryHeader.SelectedCountryHeader
          country={country}
          trend={trend}
          trend_value={trend_value}
          onClick={onClick}
          clickable={!!onClick}
        />
      </Suspense>

      <Suspense fallback={<LargeScoreSkeleton />}>
        <ScoreDisplay.LargeScoreDisplay
          score={current_uri.uri_score}
          riskLevel={current_uri.risk_level}
        />
      </Suspense>

      <Suspense fallback={<DetailedIndicatorsSkeleton />}>
        <IndicatorsList.HorizontalIndicatorsList indicators={indicators} />
      </Suspense>
    </div>
  );
}

// Skeleton components for loading states
function CountryCardSkeleton() {
  return (
    <div className="data-card animate-pulse">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 bg-neutral-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-neutral-200 rounded"></div>
            <div className="h-3 w-8 bg-neutral-200 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-12 bg-neutral-200 rounded"></div>
      </div>
      
      <div className="text-center mb-8">
        <div className="h-6 w-16 bg-neutral-200 rounded mx-auto mb-4"></div>
        <div className="h-8 w-20 bg-neutral-200 rounded mx-auto"></div>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-neutral-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

function ScoreSkeleton() {
  return (
    <div className="text-center mb-8 animate-pulse">
      <div className="h-4 w-16 bg-neutral-200 rounded mx-auto mb-2"></div>
      <div className="h-12 w-24 bg-neutral-200 rounded mx-auto"></div>
    </div>
  );
}

function IndicatorsSkeleton() {
  return (
    <div className="space-y-3 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 bg-neutral-200 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

// Compact skeletons
function CompactHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-200 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-6 h-4 bg-neutral-200 rounded"></div>
        <div className="space-y-1">
          <div className="h-3 w-12 bg-neutral-200 rounded"></div>
          <div className="h-2 w-6 bg-neutral-200 rounded"></div>
        </div>
      </div>
      <div className="h-4 w-8 bg-neutral-200 rounded"></div>
    </div>
  );
}

function CompactScoreSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="h-5 w-10 bg-neutral-200 rounded"></div>
      <div className="w-4 h-4 bg-neutral-200 rounded-full"></div>
    </div>
  );
}

function MinimalHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-6 h-4 bg-neutral-200 rounded"></div>
      <div className="space-y-1">
        <div className="h-3 w-16 bg-neutral-200 rounded"></div>
        <div className="h-2 w-6 bg-neutral-200 rounded"></div>
      </div>
    </div>
  );
}

function MinimalScoreSkeleton() {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="h-4 w-8 bg-neutral-200 rounded"></div>
      <div className="w-3 h-3 bg-neutral-200 rounded-full"></div>
    </div>
  );
}

function DetailedHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-neutral-200 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-6 bg-neutral-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-neutral-200 rounded"></div>
          <div className="h-3 w-16 bg-neutral-200 rounded"></div>
        </div>
      </div>
      <div className="h-6 w-12 bg-neutral-200 rounded"></div>
    </div>
  );
}

function LargeScoreSkeleton() {
  return (
    <div className="text-center mb-8 animate-pulse">
      <div className="h-4 w-20 bg-neutral-200 rounded mx-auto mb-2"></div>
      <div className="h-16 w-32 bg-neutral-200 rounded mx-auto mb-4"></div>
      <div className="h-8 w-24 bg-neutral-200 rounded mx-auto"></div>
    </div>
  );
}

function DetailedIndicatorsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          <div className="w-20 h-4 bg-neutral-200 rounded"></div>
          <div className="flex-1 h-2 bg-neutral-200 rounded-full"></div>
          <div className="w-12 h-4 bg-neutral-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}