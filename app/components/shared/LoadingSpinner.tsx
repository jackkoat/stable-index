// =====================================================
// Shared Loading Components
// =====================================================
// Reusable loading states and spinners
// Optimized for bundle size
// =====================================================

import React from 'react';

// Basic loading spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const colorClasses = {
    primary: 'border-accent-navy',
    secondary: 'border-text-muted',
    white: 'border-white'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        border-2 border-solid border-t-transparent rounded-full animate-spin
        ${colorClasses[color]}
        ${className}
      `}
    ></div>
  );
}

// Loading state for cards
interface CardLoaderProps {
  rows?: number;
  className?: string;
}

export function CardLoader({ rows = 3, className = "" }: CardLoaderProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-6 bg-neutral-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-neutral-200 rounded"></div>
          <div className="h-3 w-12 bg-neutral-200 rounded"></div>
        </div>
      </div>
      
      {/* Content rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-neutral-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

// Loading state for charts
interface ChartLoaderProps {
  height?: number;
  className?: string;
}

export function ChartLoader({ height = 200, className = "" }: ChartLoaderProps) {
  return (
    <div 
      className={`bg-neutral-100 rounded-lg flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" color="secondary" />
        <div className="mt-2 text-body text-text-muted">Loading chart...</div>
      </div>
    </div>
  );
}

// Loading state for maps
interface MapLoaderProps {
  className?: string;
}

export function MapLoader({ className = "" }: MapLoaderProps) {
  return (
    <div className={`relative bg-neutral-50 rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" color="primary" />
          <div className="mt-4 text-heading-sm font-semibold text-text-primary">Loading Map</div>
          <div className="mt-1 text-body text-text-muted">Preparing global risk data...</div>
        </div>
      </div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-accent-navy/20 to-accent-cyan/20 animate-pulse"></div>
      </div>
    </div>
  );
}

// Loading state for tables
interface TableLoaderProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableLoader({ rows = 5, columns = 4, className = "" }: TableLoaderProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header */}
      <div className="flex gap-4 mb-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-neutral-200 rounded flex-1"></div>
        ))}
      </div>
      
      {/* Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <div 
                key={j} 
                className={`
                  h-8 bg-neutral-200 rounded
                  ${j === 0 ? 'w-24' : j === columns - 1 ? 'w-16' : 'flex-1'}
                `}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton text component
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 2, className = "" }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`
            h-4 bg-neutral-200 rounded
            ${i === lines - 1 ? 'w-3/4' : 'w-full'}
          `}
        ></div>
      ))}
    </div>
  );
}

// Skeleton avatar
interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SkeletonAvatar({ size = 'md', className = "" }: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} bg-neutral-200 rounded-full animate-pulse ${className}`}></div>
  );
}

// Inline loading indicator
interface InlineLoaderProps {
  text?: string;
  className?: string;
}

export function InlineLoader({ text = "Loading...", className = "" }: InlineLoaderProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LoadingSpinner size="sm" color="secondary" />
      <span className="text-body text-text-muted">{text}</span>
    </div>
  );
}

// Full page loader
interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({ message = "Loading...", className = "" }: PageLoaderProps) {
  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="xl" color="primary" />
        <div className="mt-4 text-heading-md font-semibold text-text-primary">{message}</div>
        <div className="mt-2 text-body text-text-muted">Please wait while we load the content</div>
      </div>
    </div>
  );
}

// Pulse animation utility
export function PulseAnimation({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
}