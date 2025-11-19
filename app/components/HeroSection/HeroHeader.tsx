// =====================================================
// Hero Header Component
// =====================================================
// Main messaging and call-to-action section
// Optimized for lazy loading
// =====================================================

import React, { lazy, Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { smoothScrollTo } from '@/lib/utils';

interface HeroHeaderProps {
  className?: string;
}

// Lazy load heavy components
const Button = lazy(() => import('../shared/Button').then(module => ({ default: module.Button })));
const VideoPreview = lazy(() => import('./HeroVideo').then(module => ({ default: module.HeroVideo })));

export function HeroHeader({ className = "" }: HeroHeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-accent-navy/10 border border-accent-navy/30 rounded text-caption 
                      text-accent-navy uppercase tracking-wider font-semibold">
          Live Intelligence Platform
        </div>
        
        <h1 className="text-heading-xl font-bold text-text-primary leading-tight">
          Real-Time Global Risk Intelligence
        </h1>
        
        <p className="text-body-lg text-text-secondary leading-relaxed">
          Monitor social stability indicators across 25 countries with professional analysis 
          and predictive threat detection.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Suspense fallback={<ButtonSkeleton />}>
          {user ? (
            <Link href="/dashboard">
              <Button
                variant="primary"
                icon="chart"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                variant="primary"
                icon="arrow"
              >
                Get Started
              </Button>
            </Link>
          )}
        </Suspense>
      </div>
    </div>
  );
}

// Button skeleton for loading state
function ButtonSkeleton() {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-neutral-200 rounded-lg animate-pulse">
      <div className="w-5 h-5 bg-neutral-300 rounded"></div>
      <div className="w-32 h-4 bg-neutral-300 rounded"></div>
    </div>
  );
}

// Simplified header for mobile
export function MobileHeroHeader({ className = "" }: HeroHeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-3">
        <div className="inline-block px-2 py-1 bg-accent-navy/10 border border-accent-navy/30 rounded text-micro 
                      text-accent-navy uppercase tracking-wider font-semibold">
          Live Intelligence
        </div>
        
        <h1 className="text-heading-lg font-bold text-text-primary leading-tight">
          Global Risk Intelligence
        </h1>
        
        <p className="text-body text-text-secondary leading-relaxed">
          Monitor stability indicators across 25 countries
        </p>
      </div>

      {/* Simplified Action Buttons */}
      <div className="flex flex-col gap-3">
        {user ? (
          <Link href="/dashboard">
            <button className="btn-primary w-full">
              Go to Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="btn-primary w-full">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Compact header for small spaces
export function CompactHeroHeader({ className = "" }: HeroHeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-heading-md font-bold text-text-primary">
        Risk Intelligence Platform
      </h1>
      
      <p className="text-body text-text-secondary">
        Real-time stability monitoring across 25 countries
      </p>

      {user ? (
        <Link href="/dashboard">
          <button className="btn-primary">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className="btn-primary">
            Get Started
          </button>
        </Link>
      )}
    </div>
  );
}