// =====================================================
// Hero Video Preview Component
// =====================================================
// Interactive dashboard preview simulation
// Lazy-loaded for performance
// =====================================================

import React, { useState } from 'react';

interface HeroVideoProps {
  className?: string;
  interactive?: boolean;
  showControls?: boolean;
}

// Dashboard Preview Component
function DashboardPreview() {
  const chartData = [35, 50, 45, 70, 55, 80, 65, 45, 60, 75, 50, 85];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-dark-200 to-dark-100">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      
      {/* Mock Dashboard Preview */}
      <div className="absolute inset-4 flex flex-col gap-3">
        {/* Top Bar */}
        <div className="h-8 bg-surface-tertiary/50 rounded flex items-center px-3 gap-2">
          <div className="w-3 h-3 rounded-full bg-risk-low-base"></div>
          <div className="w-3 h-3 rounded-full bg-risk-moderate-base"></div>
          <div className="w-3 h-3 rounded-full bg-risk-high-base"></div>
          <div className="flex-1"></div>
          <div className="w-16 h-4 bg-accent-cyan/30 rounded"></div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-3 gap-3">
          <MetricCard 
            title="SI Score"
            value="73.2"
            trend="+2.1"
            color="accent-cyan"
            delay={0}
          />
          <MetricCard 
            title="Risk Level"
            value="Moderate"
            trend="Stable"
            color="risk-moderate-base"
            delay={0.1}
          />
          <MetricCard 
            title="Countries"
            value="25"
            trend="+2"
            color="accent-navy"
            delay={0.2}
          />
        </div>

        {/* Chart Area */}
        <ChartPreview data={chartData} />
      </div>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  color: string;
  delay: number;
}

function MetricCard({ title, value, trend, color, delay }: MetricCardProps) {
  return (
    <div className="bg-surface-tertiary/30 rounded p-2">
      <div className={`w-full h-3 bg-${color}/20 rounded mb-2 animate-pulse`} style={{ animationDelay: `${delay}s` }}></div>
      <div className="text-xs text-text-dim mb-1">{title}</div>
      <div className={`text-xs font-bold text-${color}`}>{value}</div>
      <div className="text-xs text-text-dim">{trend}</div>
    </div>
  );
}

// Chart Preview Component
interface ChartPreviewProps {
  data: number[];
}

function ChartPreview({ data }: ChartPreviewProps) {
  return (
    <div className="h-32 bg-surface-tertiary/30 rounded flex items-end p-3 gap-2">
      {data.map((height, i) => (
        <div 
          key={i} 
          className="flex-1 bg-accent-cyan/40 rounded-t animate-pulse" 
          style={{ 
            height: `${height}%`,
            animationDelay: `${i * 0.05}s`
          }}
        ></div>
      ))}
    </div>
  );
}

// Lightweight video preview for mobile
export function LightVideoPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`aspect-video bg-gradient-to-br from-blue-50 to-slate-100 rounded-lg border border-neutral-200 ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent-navy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="text-body font-semibold text-accent-navy">Interactive Dashboard</div>
        </div>
      </div>
    </div>
  );
}

// Static preview without animations
export function StaticVideoPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`aspect-video bg-neutral-100 border border-neutral-300 rounded-lg ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 bg-neutral-300 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="text-caption text-neutral-600">Dashboard Preview</div>
        </div>
      </div>
    </div>
  );
}