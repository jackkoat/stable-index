// =====================================================
// Indicators List Component
// =====================================================
// Display economic and social indicators
// Reusable across different card layouts
// =====================================================

import React from 'react';
import { CountryData } from '../../types';
import { formatNumber } from '../../lib/utils';

interface IndicatorsListProps {
  indicators: CountryData['indicators'];
  className?: string;
  compact?: boolean;
  showIcons?: boolean;
  animated?: boolean;
}

export function IndicatorsList({
  indicators,
  className = "",
  compact = false,
  showIcons = true,
  animated = true
}: IndicatorsListProps) {
  const indicatorItems = [
    {
      key: 'youth_unemployment',
      label: 'Youth Unemployment',
      value: indicators.youth_unemployment.raw_value,
      format: 'percentage',
      icon: '👥'
    },
    {
      key: 'food_inflation',
      label: 'Food Inflation',
      value: indicators.food_inflation.raw_value,
      format: 'percentage',
      icon: '🍞'
    },
    {
      key: 'palma_ratio',
      label: 'Palma Ratio',
      value: indicators.palma_ratio.raw_value,
      format: 'number',
      icon: '📊'
    },
    {
      key: 'corruption_index',
      label: 'Corruption Index',
      value: indicators.corruption_index.raw_value,
      format: 'score',
      icon: '⚖️'
    }
  ];

  if (compact) {
    return <CompactIndicatorsList items={indicatorItems} className={className} />;
  }

  return (
    <div className={`space-y-3 mb-6 ${className}`}>
      {indicatorItems.map((item, index) => (
        <IndicatorItem
          key={item.key}
          item={item}
          showIcon={showIcons}
          animated={animated}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

// Individual Indicator Item
interface IndicatorItemProps {
  item: {
    key: string;
    label: string;
    value: number;
    format: 'percentage' | 'number' | 'score';
    icon: string;
  };
  showIcon: boolean;
  animated: boolean;
  delay: number;
}

function IndicatorItem({ item, showIcon, animated, delay }: IndicatorItemProps) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'percentage':
        return `${formatNumber(value, 1)}%`;
      case 'score':
        return `${formatNumber(value, 0)}/100`;
      default:
        return formatNumber(value, 1);
    }
  };

  return (
    <div className={`
      bg-surface-tertiary/50 rounded px-4 py-3
      ${animated ? 'animate-fade-in-left' : ''}
    `} style={{ animationDelay: `${delay}s` }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showIcon && <span className="text-lg">{item.icon}</span>}
          <span className="text-body-md text-text-secondary">{item.label}</span>
        </div>
        <span className="text-body font-bold text-text-primary">
          {formatValue(item.value, item.format)}
        </span>
      </div>
    </div>
  );
}

// Compact indicators list for smaller spaces
interface CompactIndicatorsListProps {
  items: Array<{
    key: string;
    label: string;
    value: number;
    format: string;
    icon: string;
  }>;
  className?: string;
}

function CompactIndicatorsList({ items, className = "" }: CompactIndicatorsListProps) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {items.map((item) => (
        <div key={item.key} className="bg-surface-tertiary/30 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{item.icon}</span>
            <span className="text-micro text-text-secondary">{item.label}</span>
          </div>
          <div className="text-body font-bold text-text-primary">
            {item.format === 'percentage' ? `${formatNumber(item.value, 1)}%` :
             item.format === 'score' ? `${formatNumber(item.value, 0)}/100` :
             formatNumber(item.value, 1)}
          </div>
        </div>
      ))}
    </div>
  );
}

// Horizontal indicators list
export function HorizontalIndicatorsList({
  indicators,
  className = ""
}: IndicatorsListProps) {
  const indicatorItems = [
    {
      key: 'youth_unemployment',
      label: 'Youth Unemployment',
      value: indicators.youth_unemployment.raw_value,
      format: 'percentage',
      color: 'bg-blue-500'
    },
    {
      key: 'food_inflation',
      label: 'Food Inflation',
      value: indicators.food_inflation.raw_value,
      format: 'percentage',
      color: 'bg-orange-500'
    },
    {
      key: 'palma_ratio',
      label: 'Palma Ratio',
      value: indicators.palma_ratio.raw_value,
      format: 'number',
      color: 'bg-green-500'
    },
    {
      key: 'corruption_index',
      label: 'Corruption Index',
      value: indicators.corruption_index.raw_value,
      format: 'score',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {indicatorItems.map((item) => (
        <div key={item.key} className="flex items-center gap-4">
          <div className="w-24 text-body-sm text-text-secondary truncate">
            {item.label}
          </div>
          <div className="flex-1 bg-neutral-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
              style={{ 
                width: `${Math.min((item.value / (item.format === 'score' ? 100 : 50)) * 100, 100)}%` 
              }}
            ></div>
          </div>
          <div className="w-16 text-body font-bold text-text-primary text-right">
            {item.format === 'percentage' ? `${formatNumber(item.value, 1)}%` :
             item.format === 'score' ? `${formatNumber(item.value, 0)}` :
             formatNumber(item.value, 1)}
          </div>
        </div>
      ))}
    </div>
  );
}

// Key metrics summary
export function KeyMetricsSummary({
  indicators,
  className = ""
}: IndicatorsListProps) {
  const keyMetrics = [
    {
      label: 'Youth Unemployment',
      value: indicators.youth_unemployment.raw_value,
      unit: '%',
      status: getIndicatorStatus(indicators.youth_unemployment.raw_value, 'unemployment'),
      icon: '👥'
    },
    {
      label: 'Food Inflation',
      value: indicators.food_inflation.raw_value,
      unit: '%',
      status: getIndicatorStatus(indicators.food_inflation.raw_value, 'inflation'),
      icon: '🍞'
    },
    {
      label: 'Gini Coefficient',
      value: indicators.palma_ratio.raw_value,
      unit: '',
      status: getIndicatorStatus(indicators.palma_ratio.raw_value, 'inequality'),
      icon: '📈'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {keyMetrics.map((metric) => (
        <div key={metric.label} className="bg-white rounded-lg p-4 border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg">{metric.icon}</span>
            <StatusIndicator status={metric.status} />
          </div>
          <div className="text-body-sm text-text-secondary mb-1">{metric.label}</div>
          <div className="text-heading-sm font-bold text-text-primary">
            {formatNumber(metric.value, 1)}{metric.unit}
          </div>
        </div>
      ))}
    </div>
  );
}

// Status indicator component
function StatusIndicator({ status }: { status: 'good' | 'warning' | 'critical' }) {
  const statusConfig = {
    good: { color: 'bg-green-500', text: 'Good' },
    warning: { color: 'bg-yellow-500', text: 'Warning' },
    critical: { color: 'bg-red-500', text: 'Critical' }
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-xs text-text-muted">{config.text}</span>
    </div>
  );
}

// Helper function to determine indicator status
function getIndicatorStatus(value: number, type: string): 'good' | 'warning' | 'critical' {
  switch (type) {
    case 'unemployment':
      if (value < 10) return 'good';
      if (value < 20) return 'warning';
      return 'critical';
    case 'inflation':
      if (value < 3) return 'good';
      if (value < 8) return 'warning';
      return 'critical';
    case 'inequality':
      if (value < 2) return 'good';
      if (value < 4) return 'warning';
      return 'critical';
    default:
      return 'warning';
  }
}