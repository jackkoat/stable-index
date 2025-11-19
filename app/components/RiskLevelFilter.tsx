// =====================================================
// Risk Level Filter - Clean & Professional
// =====================================================
// Professional risk classification filters (no emojis)
// =====================================================

import { RiskLevel } from '../types';

interface RiskLevelFilterProps {
  selectedRiskLevels: RiskLevel[];
  onToggleRiskLevel: (riskLevel: RiskLevel) => void;
  riskCounts?: Record<RiskLevel, number>;
}

export default function RiskLevelFilter({
  selectedRiskLevels,
  onToggleRiskLevel,
  riskCounts = { Low: 0, Moderate: 0, High: 0, Critical: 0 }
}: RiskLevelFilterProps) {
  const riskLevels: RiskLevel[] = ['Low', 'Moderate', 'High', 'Critical'];

  const riskConfig = {
    Low: { label: 'Low', range: '0-40' },
    Moderate: { label: 'Moderate', range: '41-60' },
    High: { label: 'High', range: '61-80' },
    Critical: { label: 'Critical', range: '81-100' }
  };

  const getRiskClasses = (risk: RiskLevel, isActive: boolean) => {
    const classes = {
      Low: isActive 
        ? 'bg-risk-low-base/30 border-risk-low-base text-risk-low-text' 
        : 'bg-risk-low-base/10 border-risk-low-base/30 text-risk-low-text hover:bg-risk-low-base/20',
      Moderate: isActive 
        ? 'bg-risk-moderate-base/30 border-risk-moderate-base text-risk-moderate-text' 
        : 'bg-risk-moderate-base/10 border-risk-moderate-base/30 text-risk-moderate-text hover:bg-risk-moderate-base/20',
      High: isActive 
        ? 'bg-risk-high-base/30 border-risk-high-base text-risk-high-text' 
        : 'bg-risk-high-base/10 border-risk-high-base/30 text-risk-high-text hover:bg-risk-high-base/20',
      Critical: isActive 
        ? 'bg-risk-critical-base/30 border-risk-critical-base text-risk-critical-text' 
        : 'bg-risk-critical-base/10 border-risk-critical-base/30 text-risk-critical-text hover:bg-risk-critical-base/20',
    };
    return classes[risk];
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-body font-bold text-text-primary uppercase tracking-wider">Filter by Risk Level</h3>
        {selectedRiskLevels.length > 0 && (
          <button
            onClick={() => riskLevels.forEach(level => {
              if (selectedRiskLevels.includes(level)) {
                onToggleRiskLevel(level);
              }
            })}
            className="text-caption text-accent-navy hover:text-accent-navy/80 font-semibold uppercase tracking-wider"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Risk Level Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {riskLevels.map((risk) => {
          const config = riskConfig[risk];
          const count = riskCounts[risk];
          const isActive = selectedRiskLevels.includes(risk);

          return (
            <button
              key={risk}
              onClick={() => onToggleRiskLevel(risk)}
              disabled={count === 0}
              className={`
                px-4 py-4 rounded-md border-2 font-semibold text-body-md transition-all duration-normal 
                flex flex-col items-center justify-center gap-2
                ${count === 0
                  ? 'opacity-30 cursor-not-allowed bg-surface-tertiary/30 border-surface-border text-text-dim'
                  : getRiskClasses(risk, isActive)
                }
                ${isActive ? 'shadow-glow-sm scale-105' : 'hover:scale-102'}
              `}
            >
              {/* Count Badge */}
              <div className={`
                w-10 h-10 rounded-md flex items-center justify-center font-bold text-heading-sm
                ${isActive ? 'bg-surface-primary/40' : 'bg-surface-primary/20'}
              `}>
                {count}
              </div>

              {/* Risk Label */}
              <div className="flex flex-col items-center">
                <span className="font-bold uppercase tracking-wide">{config.label}</span>
                <span className="text-micro uppercase tracking-wider opacity-80">
                  {config.range}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filters Summary */}
      {selectedRiskLevels.length > 0 && (
        <div className="mt-4 px-4 py-3 bg-accent-navy/5 border border-accent-navy/20 rounded-md">
          <p className="text-body-md text-text-secondary">
            <span className="font-semibold text-accent-navy uppercase tracking-wider">Active:</span>{' '}
            {selectedRiskLevels.join(', ')} ({selectedRiskLevels.length} filter{selectedRiskLevels.length > 1 ? 's' : ''})
          </p>
        </div>
      )}
    </div>
  );
}
