import React, { Suspense, lazy } from 'react';

// Lazy load heavy components
const HeroHeader = lazy(() => import('./HeroHeader').then(module => ({ 
  default: module.HeroHeader 
})));
const HeroStats = lazy(() => import('./HeroStats').then(module => ({ 
  default: module.HeroStats 
})));
const RiskDistributionStats = lazy(() => import('./HeroStats').then(module => ({ 
  default: module.RiskDistributionStats 
})));

export function HeroSection() {
  return (
    // Added 'min-h-full' to ensure it fills the parent h-screen container
    // Added 'justify-center items-center text-center' for global centering
    <div className="min-h-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-12">
      
      {/* Main Hero Content - Centered */}
      <div className="w-full mb-8 flex flex-col items-center">
        <Suspense fallback={<div className="h-64 w-full animate-pulse bg-neutral-100 rounded-xl" />}>
          <HeroHeader />
        </Suspense>
      </div>

      {/* Hero Statistics */}
      <div className="w-full mb-8">
        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-neutral-100 rounded-xl" />}>
          <HeroStats />
        </Suspense>
      </div>

      {/* Risk Level Distribution */}
      <div className="w-full mb-6">
        <Suspense fallback={<div className="h-48 w-full animate-pulse bg-neutral-100 rounded-xl" />}>
          <RiskDistributionStats />
        </Suspense>
      </div>

      {/* System Status Bar */}
      <div className="w-full max-w-2xl">
        <SystemStatusBar />
      </div>
    </div>
  );
}// Skeleton components for loading states
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
    <div className="bg-surface-tertiary border border-surface-border rounded-lg p-4 mx-auto shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6 mx-auto sm:mx-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-risk-low-base animate-pulse"></div>
            <span className="text-caption text-text-muted uppercase tracking-wider font-semibold">System Online</span>
          </div>
          <div className="text-caption text-text-dim hidden sm:block">
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
        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <span className="text-caption text-text-muted font-medium">Data Freshness:</span>
          <div className="w-32 h-2 bg-surface-border rounded-full overflow-hidden">
            <div className="w-5/6 h-full bg-accent-navy rounded-full"></div>
          </div>
          <span className="text-caption text-accent-navy font-bold">98.2%</span>
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