// =====================================================
// Hero Statistics Component
// =====================================================
// Live statistics display with animations
// Optimized for performance
// =====================================================

import React from 'react';
import { dashboardStats } from '@/data/mockData';

interface DashboardStats {
  total_countries: number;
  low_risk: number;
  moderate_risk: number;
  high_risk: number;
  critical_risk: number;
  avg_uri_score: number;
}

interface HeroStatsProps {
  className?: string;
  animated?: boolean;
  compact?: boolean;
}

export function HeroStats({ className = "", animated = true, compact = false }: HeroStatsProps) {
  if (compact) {
    return <CompactHeroStats className={className} />;
  }

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <StatCard
        label="Countries"
        value={(dashboardStats as DashboardStats).total_countries}
        color="accent-navy"
        animated={animated}
        delay={0}
      />
      <StatCard
        label="Average Score"
        value={(dashboardStats as DashboardStats).avg_uri_score.toFixed(1)}
        color="accent-navy"
        animated={animated}
        delay={0.1}
      />
      <StatCard
        label="High Risk"
        value={(dashboardStats as DashboardStats).high_risk}
        color="risk-high-text"
        animated={animated}
        delay={0.2}
      />
    </div>
  );
}

// Individual Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  animated?: boolean;
  delay?: number;
}

function StatCard({ label, value, color, animated = true, delay = 0 }: StatCardProps) {
  return (
    <div className="data-card text-center">
      <div className={`text-heading-lg font-bold text-${color} mb-1 ${animated ? 'animate-fade-in-up' : ''}`} 
           style={{ animationDelay: `${delay}s` }}>
        {value}
      </div>
      <div className="text-caption text-text-muted uppercase tracking-wider">{label}</div>
    </div>
  );
}

// Compact Stats for mobile
function CompactHeroStats({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-around items-center py-4 bg-surface-tertiary/30 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="text-heading-sm font-bold text-accent-navy">{(dashboardStats as DashboardStats).total_countries}</div>
        <div className="text-micro text-text-muted uppercase tracking-wider">Countries</div>
      </div>
      <div className="text-center">
        <div className="text-heading-sm font-bold text-accent-navy">{(dashboardStats as DashboardStats).avg_uri_score.toFixed(1)}</div>
        <div className="text-micro text-text-muted uppercase tracking-wider">Avg Score</div>
      </div>
      <div className="text-center">
        <div className="text-heading-sm font-bold text-risk-high-text">{(dashboardStats as DashboardStats).high_risk}</div>
        <div className="text-micro text-text-muted uppercase tracking-wider">High Risk</div>
      </div>
    </div>
  );
}

// Detailed Stats with trends
interface DetailedHeroStatsProps {
  className?: string;
  showTrends?: boolean;
}

export function DetailedHeroStats({ className = "", showTrends = true }: DetailedHeroStatsProps) {
  const statsData = [
    {
      label: 'Total Countries',
      value: (dashboardStats as DashboardStats).total_countries,
      trend: '+2',
      color: 'accent-navy',
      icon: 'globe'
    },
    {
      label: 'Average Score',
      value: (dashboardStats as DashboardStats).avg_uri_score.toFixed(1),
      trend: '-0.3',
      color: 'accent-navy',
      icon: 'chart'
    },
    {
      label: 'High Risk',
      value: (dashboardStats as DashboardStats).high_risk,
      trend: '+1',
      color: 'risk-high-text',
      icon: 'warning'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {statsData.map((stat, index) => (
        <div key={stat.label} className="flex items-center justify-between p-4 bg-white rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
              <StatIcon icon={stat.icon} />
            </div>
            <div>
              <div className="text-body text-text-secondary">{stat.label}</div>
              <div className={`text-heading-sm font-bold text-${stat.color}`}>{stat.value}</div>
            </div>
          </div>
          {showTrends && (
            <div className="flex items-center gap-1 text-body font-medium">
              <TrendIcon trend={stat.trend} />
              <span className={stat.trend.startsWith('+') ? 'text-risk-high-text' : 'text-risk-low-text'}>
                {stat.trend}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Risk Level Distribution Stats
interface RiskDistributionStatsProps {
  className?: string;
}

export function RiskDistributionStats({ className = "" }: RiskDistributionStatsProps) {
  const riskStats = [
    {
      level: 'Low Risk',
      count: (dashboardStats as DashboardStats).low_risk,
      color: 'risk-low-base',
      icon: 'check'
    },
    {
      level: 'Moderate Risk', 
      count: (dashboardStats as DashboardStats).moderate_risk,
      color: 'risk-moderate-base',
      icon: 'alert'
    },
    {
      level: 'High Risk',
      count: (dashboardStats as DashboardStats).high_risk,
      color: 'risk-high-base', 
      icon: 'warning'
    },
    {
      level: 'Critical Risk',
      count: (dashboardStats as DashboardStats).critical_risk,
      color: 'risk-critical-base',
      icon: 'critical'
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {riskStats.map((risk) => (
        <div key={risk.level} className="data-card border-l-4 border-l-current" style={{ borderLeftColor: `var(--color-${risk.color})` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-text-muted uppercase tracking-wider">{risk.level}</span>
            <div className={`w-6 h-6 rounded bg-${risk.color}/20 flex items-center justify-center`}>
              <RiskIcon icon={risk.icon} />
            </div>
          </div>
          <div className={`text-heading-md font-bold text-${risk.color}`}>
            {risk.count}
          </div>
          <div className="text-micro text-text-dim">Countries</div>
        </div>
      ))}
    </div>
  );
}

// Icon components (simplified for bundle size)
function StatIcon({ icon }: { icon: string }) {
  const iconMap = {
    globe: '🌍',
    chart: '📊', 
    warning: '⚠️'
  };
  return <span className="text-lg">{iconMap[icon as keyof typeof iconMap] || '📈'}</span>;
}

function TrendIcon({ trend }: { trend: string }) {
  return trend.startsWith('+') ? '↗️' : '↘️';
}

function RiskIcon({ icon }: { icon: string }) {
  const iconMap = {
    check: '✓',
    alert: '⚠️',
    warning: '⚡',
    critical: '🔥'
  };
  return <span className="text-sm">{iconMap[icon as keyof typeof iconMap] || '📊'}</span>;
}