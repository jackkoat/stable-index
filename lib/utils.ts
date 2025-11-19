import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// =====================================================
// Risk Level Utilities
// =====================================================

import { RiskLevel } from '../types';

export const getRiskLevelColor = (level: RiskLevel) => {
  const colors = {
    Low: {
      bg: 'bg-risk-low-light',
      text: 'text-risk-low-dark',
      border: 'border-risk-low-dark',
    },
    Moderate: {
      bg: 'bg-risk-moderate-light',
      text: 'text-risk-moderate-dark',
      border: 'border-risk-moderate-dark',
    },
    High: {
      bg: 'bg-risk-high-light',
      text: 'text-risk-high-dark',
      border: 'border-risk-high-dark',
    },
    Critical: {
      bg: 'bg-risk-critical-light',
      text: 'text-risk-critical-dark',
      border: 'border-risk-critical-dark',
    },
  };
  
  return colors[level];
};

export const getRiskLevelIcon = (level: RiskLevel) => {
  const icons = {
    Low: '✓',
    Moderate: '⚠',
    High: '⚠',
    Critical: '⛔',
  };
  
  return icons[level];
};

export const formatNumber = (value: number, decimals: number = 2) => {
  return value.toFixed(decimals);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} days ago`;
  
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} months ago`;
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  const icons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };
  
  return icons[trend];
};

export const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
  const colors = {
    up: 'text-risk-high-dark',
    down: 'text-risk-low-dark',
    stable: 'text-neutral-500',
  };
  
  return colors[trend];
};

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 72; // Navigation bar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
