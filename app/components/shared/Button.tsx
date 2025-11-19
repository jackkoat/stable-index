// =====================================================
// Shared Button Component
// =====================================================
// Reusable button with multiple variants
// Optimized for bundle size
// =====================================================

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'chart' | 'trending' | 'download' | 'external' | 'arrow';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-accent-navy text-white hover:bg-accent-navy/90 focus:ring-accent-navy shadow-sm",
    secondary: "bg-surface-tertiary text-text-primary hover:bg-surface-tertiary/80 focus:ring-text-muted border border-surface-border",
    outline: "border-2 border-accent-navy text-accent-navy hover:bg-accent-navy/10 focus:ring-accent-navy bg-white/50",
    ghost: "text-text-secondary hover:bg-surface-tertiary/50 hover:text-text-primary focus:ring-text-muted",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-caption gap-1.5",
    md: "px-4 py-2 text-body gap-2",
    lg: "px-6 py-3 text-body-lg gap-2.5"
  };
  
  const stateClasses = `
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
  `;

  const IconComponent = icon ? getIconComponent(icon) : null;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size={size} />
      ) : (
        <>
          {IconComponent && <IconComponent />}
          {children}
        </>
      )}
    </button>
  );
}

// Loading spinner component
function LoadingSpinner({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  
  return (
    <div className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`}></div>
  );
}

// Icon components
function getIconComponent(icon: string) {
  const iconMap = {
    chart: ChartIcon,
    trending: TrendingIcon,
    download: DownloadIcon,
    external: ExternalIcon,
    arrow: ArrowIcon
  };
  
  return iconMap[icon as keyof typeof iconMap] || null;
}

function ChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function TrendingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  );
}

function DownloadIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function ExternalIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}