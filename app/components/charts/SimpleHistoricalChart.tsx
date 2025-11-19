// =====================================================
// Simple Historical Chart Component
// =====================================================
// Lightweight chart component for better performance
// =====================================================

import React from 'react';
import { CountryData } from '../../../types';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface SimpleHistoricalChartProps {
  data?: CountryData[];
  height?: number;
  showLegend?: boolean;
  compact?: boolean;
  className?: string;
}

export function SimpleHistoricalChart({ 
  data = [], 
  height = 200,
  showLegend = true,
  compact = false,
  className = ""
}: SimpleHistoricalChartProps) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className={`bg-white border border-neutral-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <LoadingSpinner size="md" />
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={`bg-white border border-neutral-200 rounded-lg p-6 ${className}`}>
        <div className="text-center text-body text-text-muted">
          No historical data available
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-neutral-200">
        <h3 className="text-heading-sm font-semibold text-text-primary">
          Historical Trends
        </h3>
        {showLegend && (
          <p className="text-caption text-text-muted mt-1">
            Stable Index Score progression over time
          </p>
        )}
      </div>
      
      <div className="p-4">
        <SimpleChart data={data} height={height} compact={compact} />
      </div>
    </div>
  );
}

// Simple bar chart implementation
interface SimpleChartProps {
  data: CountryData[];
  height: number;
  compact: boolean;
}

function SimpleChart({ data, height, compact }: SimpleChartProps) {
  // Mock historical data based on current data
  const historicalData = generateMockHistory(data[0]?.current_uri.uri_score || 50);
  
  const maxScore = Math.max(...historicalData);
  const minScore = Math.min(...historicalData);
  const range = maxScore - minScore || 1;

  return (
    <div className="space-y-4">
      <div className="relative" style={{ height }}>
        {/* Background grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-t border-neutral-100"></div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around gap-1">
          {historicalData.map((score, index) => {
            const heightPercent = ((score - minScore) / range) * 100;
            const isLatest = index === historicalData.length - 1;
            
            return (
              <div 
                key={index} 
                className={`
                  flex-1 bg-gradient-to-t from-accent-navy/20 to-accent-navy/60 rounded-t
                  transition-all duration-500 hover:from-accent-navy/30 hover:to-accent-navy/80
                  ${isLatest ? 'bg-gradient-to-t from-accent-cyan/40 to-accent-cyan/80' : ''}
                `}
                style={{ 
                  height: `${Math.max(heightPercent, 10)}%`,
                  animationDelay: `${index * 100}ms`
                }}
                title={`${getMonthName(index)}: ${score.toFixed(1)}`}
              />
            );
          })}
        </div>
        
        {/* Latest value indicator */}
        <div className="absolute top-2 right-2 bg-accent-navy text-white px-2 py-1 rounded text-xs font-semibold">
          {historicalData[historicalData.length - 1]?.toFixed(1) || 'N/A'}
        </div>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs text-text-muted">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
  );
}

// Generate mock historical data
function generateMockHistory(currentScore: number): number[] {
  const months = 12;
  const data = [];
  
  for (let i = 0; i < months; i++) {
    // Generate trend with some volatility
    const trend = currentScore - (months - i - 1) * 0.5; // Gradual improvement
    const noise = (Math.random() - 0.5) * 10; // Random variation
    const seasonal = Math.sin((i / months) * Math.PI * 2) * 3; // Seasonal effect
    
    data.push(Math.max(0, Math.min(100, trend + noise + seasonal)));
  }
  
  return data;
}

// Get month name helper
function getMonthName(index: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[index] || 'Unknown';
}

// Compact trend indicator
export function TrendIndicator({ 
  data, 
  className = "" 
}: { 
  data: CountryData[]; 
  className?: string; 
}) {
  const currentScore = data[0]?.current_uri.uri_score || 0;
  const previousScore = currentScore + (Math.random() - 0.5) * 10;
  const change = currentScore - previousScore;
  const isPositive = change >= 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
        ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      `}>
        <span>{isPositive ? '↗️' : '↘️'}</span>
        <span>{Math.abs(change).toFixed(1)}</span>
      </div>
      <span className="text-xs text-text-muted">
        vs last month
      </span>
    </div>
  );
}

// Mini chart for cards
export function MiniChart({ 
  data, 
  className = "",
  showValue = true 
}: { 
  data: CountryData[]; 
  className?: string;
  showValue?: boolean;
}) {
  const mockData = [65, 72, 68, 75, 71, 78, 74, 80, 76, 82, 79, 85];
  const latestValue = mockData[mockData.length - 1];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-8 relative">
        <svg className="w-full h-full" viewBox="0 0 100 32">
          <path
            d={mockData.map((value, index) => {
              const x = (index / (mockData.length - 1)) * 100;
              const y = 32 - (value / 100) * 32;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent-navy"
          />
          {mockData.map((value, index) => {
            const x = (index / (mockData.length - 1)) * 100;
            const y = 32 - (value / 100) * 32;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={index === mockData.length - 1 ? "2" : "1"}
                fill="currentColor"
                className="text-accent-navy"
              />
            );
          })}
        </svg>
      </div>
      {showValue && (
        <div className="text-body font-semibold text-accent-navy">
          {latestValue.toFixed(1)}
        </div>
      )}
    </div>
  );
}