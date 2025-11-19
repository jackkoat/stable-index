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
    <section className="w-full">
      <div className="mx-auto">
        {/* Centered Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h3 className="text-heading-md font-bold text-text-primary mb-3 uppercase tracking-tight">
            Risk Classification Matrix
          </h3>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            Comprehensive intelligence threat level assessment framework designed for global monitoring.
          </p>
        </div>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskLevels.map((risk) => (
            <div
              key={risk.level}
              className="data-card hover:border-accent-navy/30 transition-all duration-300 p-6 bg-white shadow-sm hover:shadow-md rounded-xl flex flex-col items-center text-center"
            >
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center mb-4
                transform transition-transform duration-300 hover:scale-110 hover:-translate-y-1
                ${risk.level === 'Low' ? 'bg-risk-low/10 text-risk-low-base ring-1 ring-risk-low/20' : ''}
                ${risk.level === 'Moderate' ? 'bg-risk-moderate/10 text-risk-moderate-base ring-1 ring-risk-moderate/20' : ''}
                ${risk.level === 'High' ? 'bg-risk-high/10 text-risk-high-base ring-1 ring-risk-high/20' : ''}
                ${risk.level === 'Critical' ? 'bg-risk-critical/10 text-risk-critical-base ring-1 ring-risk-critical/20' : ''}
              `}>
                {risk.icon}
              </div>
              
              <div className="font-bold text-text-primary uppercase tracking-wide text-body-lg mb-1">
                {risk.level}
              </div>
              <div className="text-caption font-semibold text-text-dim uppercase tracking-wider mb-3 bg-surface-tertiary px-3 py-1 rounded-full">
                Score: {risk.range}
              </div>
              
              <p className="text-body text-text-secondary leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
