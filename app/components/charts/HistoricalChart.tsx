// =====================================================
// Historical Chart Component
// =====================================================
// Optimized chart component with lazy loading
// =====================================================

import React, { useState, useMemo } from 'react';
import { CountryData } from '../../types';
import { LoadingSpinner, ChartLoader } from '../shared/LoadingSpinner';

interface HistoricalChartProps {
  data?: CountryData[];
  countryCode?: string;
  height?: number;
  className?: string;
  interactive?: boolean;
}

export function HistoricalChart({ 
  data = [], 
  countryCode,
  height = 300,
  className = "",
  interactive = true
}: HistoricalChartProps) {
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Simulate loading for demo
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    if (!data.length) return [];
    
    // Generate mock historical data based on current data
    return generateHistoricalData(data, countryCode);
  }, [data, countryCode]);

  if (loading) {
    return <ChartLoader height={height} className={className} />;
  }

  if (!chartData.length) {
    return (
      <div className="bg-neutral-50 rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="text-body text-text-muted mb-2">No historical data available</div>
          <button 
            onClick={() => setLoading(true)}
            className="btn-secondary btn-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg ${className}`}>
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h3 className="text-heading-sm font-semibold text-text-primary">
            Historical Risk Trends
          </h3>
          {countryCode && (
            <span className="text-caption text-text-muted uppercase tracking-wider">
              {countryCode}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative" style={{ height }}>
          <ResponsiveChart 
            data={chartData}
            height={height}
            selectedPoint={selectedPoint}
            onPointSelect={setSelectedPoint}
            interactive={interactive}
          />
        </div>
        
        {selectedPoint !== null && (
          <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
            <div className="text-body-sm font-semibold text-text-primary">
              {chartData[selectedPoint]?.date}
            </div>
            <div className="text-body text-text-muted">
              SI Score: {chartData[selectedPoint]?.score.toFixed(1)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Chart Renderer
interface ChartRendererProps {
  data: Array<{ date: string; score: number }>;
  height: number;
  selectedPoint: number | null;
  onPointSelect: (index: number | null) => void;
  interactive: boolean;
}

function ResponsiveChart({ 
  data, 
  height, 
  selectedPoint, 
  onPointSelect, 
  interactive 
}: ChartRendererProps) {
  const padding = 40;
  const chartHeight = height - padding * 2;
  const chartWidth = '100%';
  
  const minScore = Math.min(...data.map(d => d.score));
  const maxScore = Math.max(...data.map(d => d.score));
  const scoreRange = maxScore - minScore || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((item.score - minScore) / scoreRange) * chartHeight;
    return { ...item, x, y, index };
  });
  
  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  return (
    <svg className="w-full h-full" viewBox={`0 0 100 ${chartHeight}`}>
      {/* Grid lines */}
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height={chartHeight} fill="url(#grid)" />
      
      {/* Chart area */}
      <g transform={`translate(0, ${padding})`}>
        {/* Area under curve */}
        <path
          d={`${pathData} L 100 ${chartHeight} L 0 ${chartHeight} Z`}
          fill="url(#areaGradient)"
          opacity="0.3"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {points.map((point) => (
          <circle
            key={point.index}
            cx={point.x}
            cy={point.y}
            r={selectedPoint === point.index ? "4" : "2"}
            fill={selectedPoint === point.index ? "#1D4ED8" : "#3B82F6"}
            stroke="white"
            strokeWidth="2"
            className={interactive ? "cursor-pointer hover:r-3 transition-all" : ""}
            onClick={() => interactive && onPointSelect(point.index)}
          />
        ))}
        
        {/* X-axis labels */}
        <g className="text-xs text-text-muted">
          {points.filter((_, i) => i % Math.ceil(points.length / 5) === 0).map((point) => (
            <text
              key={point.index}
              x={point.x}
              y={chartHeight + 15}
              textAnchor="middle"
              dominantBaseline="hanging"
            >
              {point.date.split('-')[1]}/{point.date.split('-')[0].slice(-2)}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}

// Generate mock historical data
function generateHistoricalData(data: CountryData[], countryCode?: string) {
  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', 
                  '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
  
  // Use the first country's score as base
  const baseScore = data[0]?.current_uri.uri_score || 65;
  
  return months.map(month => ({
    date: month,
    score: baseScore + (Math.random() - 0.5) * 20 // Add some variation
  }));
}

// Lightweight chart for mobile
export function LightweightChart({ 
  data = [], 
  height = 200,
  className = "" 
}: Omit<HistoricalChartProps, 'interactive'>) {
  if (!data.length) {
    return (
      <div className={`bg-neutral-50 rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-body text-text-muted">No data available</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.current_uri.uri_score));
  const minValue = Math.min(...data.map(d => d.current_uri.uri_score));

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 p-4 ${className}`}>
      <h4 className="text-body font-semibold text-text-primary mb-4">Risk Scores</h4>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((item, index) => {
          const heightPercent = ((item.current_uri.uri_score - minValue) / (maxValue - minValue)) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-accent-cyan/60 rounded-t transition-all duration-500 hover:bg-accent-cyan/80"
                style={{ height: `${heightPercent}%` }}
              ></div>
              <div className="text-xs text-text-muted mt-1 text-center">
                {item.country.code}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}