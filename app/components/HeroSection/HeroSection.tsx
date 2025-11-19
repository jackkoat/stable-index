// =====================================================
// Optimized Hero Section Component
// =====================================================
// Split into smaller chunks for better code splitting
// Implements lazy loading and progressive enhancement
// =====================================================

import React, { Suspense, lazy } from 'react';
import { dashboardStats } from '@/data/mockData';

// Lazy load heavy components
const HeroHeader = lazy(() => import('./HeroHeader').then(module => ({ 
  default: module.HeroHeader 
})));
const MobileHeroHeader = lazy(() => import('./HeroHeader').then(module => ({ 
  default: module.MobileHeroHeader 
})));
const CompactHeroHeader = lazy(() => import('./HeroHeader').then(module => ({ 
  default: module.CompactHeroHeader 
})));
const HeroStats = lazy(() => import('./HeroStats').then(module => ({ 
  default: module.HeroStats 
})));
const LightVideoPreview = lazy(() => import('./HeroVideo').then(module => ({ 
  default: module.LightVideoPreview 
})));
const StaticVideoPreview = lazy(() => import('./HeroVideo').then(module => ({ 
  default: module.StaticVideoPreview 
})));
const RiskDistributionStats = lazy(() => import('./HeroStats').then(module => ({ 
  default: module.RiskDistributionStats 
})));

export function HeroSection() {
  return (
    <div className="h-full flex flex-col justify-center">
      {/* Main Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        {/* Left - Messaging */}
        <Suspense fallback={<HeroHeaderSkeleton />}>
          <HeroHeader />
        </Suspense>
      </div>

      {/* Hero Statistics */}
      <div className="mb-12">
        <Suspense fallback={<StatsSkeleton />}>
          <HeroStats />
        </Suspense>
      </div>

      {/* Risk Level Distribution */}
      <div className="mb-12">
        <Suspense fallback={<RiskStatsSkeleton />}>
          <RiskDistributionStats />
        </Suspense>
      </div>

      {/* System Status Bar */}
      <SystemStatusBar />
    </div>
  );
}

// Skeleton components for loading states
function HeroHeaderSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 w-48 bg-neutral-200 rounded"></div>
        <div className="h-12 w-full bg-neutral-200 rounded"></div>
        <div className="h-16 w-full bg-neutral-200 rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-12 w-40 bg-neutral-200 rounded"></div>
        <div className="h-12 w-40 bg-neutral-200 rounded"></div>
      </div>
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="aspect-video bg-neutral-200 rounded-lg animate-pulse">
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 bg-neutral-300 rounded-full"></div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="data-card text-center animate-pulse">
          <div className="h-8 w-16 bg-neutral-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-20 bg-neutral-200 rounded mx-auto"></div>
        </div>
      ))}
    </div>
  );
}

function RiskStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="data-card border-l-4 border-neutral-200 animate-pulse">
          <div className="h-4 w-16 bg-neutral-200 rounded mb-2"></div>
          <div className="h-6 w-8 bg-neutral-200 rounded mb-1"></div>
          <div className="h-3 w-20 bg-neutral-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// System Status Bar Component
function SystemStatusBar() {
  return (
    <div className="bg-surface-tertiary border border-surface-border rounded-lg p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-risk-low-base animate-pulse"></div>
            <span className="text-caption text-text-muted uppercase tracking-wider">System Online</span>
          </div>
          <div className="text-caption text-text-dim">
            Last Update: {new Date().toLocaleString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false,
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-caption text-text-muted">Data Freshness:</span>
          <div className="w-32 h-2 bg-surface-border rounded-full overflow-hidden">
            <div className="w-5/6 h-full bg-accent-navy rounded-full"></div>
          </div>
          <span className="text-caption text-accent-navy font-semibold">83%</span>
        </div>
      </div>
    </div>
  );
}

// Mobile-optimized Hero Section
export function MobileHeroSection() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<HeroHeaderSkeleton />}>
        <MobileHeroHeader />
      </Suspense>

      <Suspense fallback={<VideoSkeleton />}>
        <LightVideoPreview />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <HeroStats compact />
      </Suspense>
    </div>
  );
}

// Compact version for small spaces
export function CompactHeroSection() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<HeroHeaderSkeleton />}>
        <CompactHeroHeader />
      </Suspense>

      <div className="flex justify-center">
        <Suspense fallback={<VideoSkeleton />}>
          <StaticVideoPreview />
        </Suspense>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <HeroStats compact />
      </Suspense>
    </div>
  );
}