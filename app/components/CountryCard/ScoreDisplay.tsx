// =====================================================
// Score Display Component
// =====================================================
// SI Score and risk level display
// Reusable component for different layouts
// =====================================================

import React from 'react';
import { CountryData } from '../../types';
import { RiskBadge } from '../ui/RiskBadge';
import { formatNumber } from '../../lib/utils';

interface ScoreDisplayProps {
  score: CountryData['current_uri']['uri_score'];
  riskLevel: CountryData['current_uri']['risk_level'];
  className?: string;
  size?: 'small' | 'regular' | 'large';
  showBadge?: boolean;
  animated?: boolean;
}

export function ScoreDisplay({
  score,
  riskLevel,
  className = "",
  size = 'regular',
  showBadge = true,
  animated = true
}: ScoreDisplayProps) {
  const sizeClasses = {
    small: {
      container: 'text-center mb-4',
      score: 'text-heading-sm font-bold text-accent-navy mb-2',
      badge: 'scale-75'
    },
    regular: {
      container: 'text-center mb-8',
      score: 'text-display-lg font-bold text-accent-navy mb-4',
      badge: 'scale-100'
    },
    large: {
      container: 'text-center mb-8',
      score: 'text-display-xl font-bold text-accent-navy mb-6',
      badge: 'scale-125'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`${currentSize.container} ${className}`}>
      <div className="label-uppercase mb-2">SI Score</div>
      <div className={`${currentSize.score} ${animated ? 'animate-fade-in-up' : ''}`}>
        {formatNumber(score)}
      </div>
      {showBadge && (
        <div className={`${currentSize.badge} ${animated ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
          <RiskBadge level={riskLevel} size={size === 'small' ? 'small' : 'regular'} />
        </div>
      )}
    </div>
  );
}

// Compact score display for lists
export function CompactScoreDisplay({
  score,
  riskLevel,
  className = ""
}: Omit<ScoreDisplayProps, 'size' | 'showBadge'>) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="text-heading-sm font-bold text-accent-navy">
        {formatNumber(score)}
      </div>
      <RiskBadge level={riskLevel} size="small" />
    </div>
  );
}

// Large score display for detail views
export function LargeScoreDisplay({
  score,
  riskLevel,
  className = ""
}: Omit<ScoreDisplayProps, 'size'>) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <div className="text-micro text-text-muted uppercase tracking-wider mb-2">Stable Index Score</div>
      <div className="text-display-2xl font-bold text-accent-navy mb-4">
        {formatNumber(score)}
      </div>
      <div className="flex justify-center">
        <RiskBadge level={riskLevel} size="large" />
      </div>
      
      {/* Score interpretation */}
      <div className="mt-4 text-body text-text-secondary">
        {getScoreInterpretation(score)}
      </div>
    </div>
  );
}

// Score with trend indicator
export function ScoreWithTrend({
  score,
  riskLevel,
  trend,
  trendValue,
  className = ""
}: ScoreDisplayProps & { 
  trend: CountryData['trend']; 
  trendValue: CountryData['trend_value']; 
}) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➖';
    }
  };

  const getTrendColor = (trend: string, trendValue: number) => {
    if (trend === 'up') return 'text-risk-low-text';
    if (trend === 'down') return 'text-risk-high-text';
    return 'text-text-muted';
  };

  return (
    <div className={`text-center mb-6 ${className}`}>
      <div className="text-micro text-text-muted uppercase tracking-wider mb-2">SI Score</div>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="text-display-xl font-bold text-accent-navy">
          {formatNumber(score)}
        </span>
        <div className={`flex items-center gap-1 text-body font-semibold ${getTrendColor(trend, trendValue)}`}>
          <span>{getTrendIcon(trend)}</span>
          <span>{formatNumber(Math.abs(trendValue), 1)}</span>
        </div>
      </div>
      <RiskBadge level={riskLevel} size="regular" />
    </div>
  );
}

// Score progress ring
interface ScoreRingProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function ScoreRing({ score, maxScore = 100, className = "" }: ScoreRingProps) {
  const percentage = (score / maxScore) * 100;
  const radius = 50;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRingColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Amber
    if (score >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke={getRingColor(score)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-heading-lg font-bold text-text-primary">
            {formatNumber(score)}
          </div>
          <div className="text-micro text-text-muted">
            SI Score
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get score interpretation
function getScoreInterpretation(score: number): string {
  if (score >= 80) return 'Very Stable';
  if (score >= 60) return 'Stable';
  if (score >= 40) return 'Moderately Stable';
  if (score >= 20) return 'Unstable';
  return 'Highly Unstable';
}