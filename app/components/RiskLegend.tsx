// =====================================================
// Palantir-Style Risk Legend
// =====================================================
// Professional Risk Classification Reference
// Dark Theme with Clear Visual Hierarchy
// =====================================================

import { RiskBadge } from './RiskBadge';

export const RiskLegend = () => {
  const riskLevels = [
    {
      level: 'Low' as const,
      range: '0-40',
      description: 'Minimal threat indicators, stable conditions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      level: 'Moderate' as const,
      range: '41-60',
      description: 'Elevated indicators requiring monitoring',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      level: 'High' as const,
      range: '61-80',
      description: 'Significant threat, active surveillance required',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      level: 'Critical' as const,
      range: '81-100',
      description: 'Imminent threat, immediate action protocols',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-surface-secondary py-12 border-y border-surface-border">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-6">
          <h3 className="text-heading-md font-bold text-text-primary mb-2 uppercase tracking-tight">
            Risk Classification Matrix
          </h3>
          <p className="text-body-md text-text-secondary">
            Intelligence threat level assessment framework
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskLevels.map((risk) => (
            <div
              key={risk.level}
              className="data-card hover:border-accent-cyan/30 transition-colors duration-normal"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-md flex items-center justify-center
                  ${risk.level === 'Low' ? 'bg-risk-low-base/20 text-risk-low-text' : ''}
                  ${risk.level === 'Moderate' ? 'bg-risk-moderate-base/20 text-risk-moderate-text' : ''}
                  ${risk.level === 'High' ? 'bg-risk-high-base/20 text-risk-high-text' : ''}
                  ${risk.level === 'Critical' ? 'bg-risk-critical-base/20 text-risk-critical-text' : ''}
                `}>
                  {risk.icon}
                </div>
                <div>
                  <div className="font-bold text-text-primary uppercase tracking-wide text-body">
                    {risk.level}
                  </div>
                  <div className="text-caption text-text-dim uppercase tracking-wider">
                    Score: {risk.range}
                  </div>
                </div>
              </div>
              <p className="text-body-md text-text-secondary leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
