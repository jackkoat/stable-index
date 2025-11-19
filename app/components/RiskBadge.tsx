// =====================================================
// Stable Index Risk Badge
// =====================================================
// Professional Risk Level Indicators
// Light Theme with Enhanced Visual Hierarchy
// =====================================================

import { RiskLevel } from '../../types';
import { getRiskLevelColor, getRiskLevelIcon } from '../../lib/utils';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'regular' | 'large';
}

export const RiskBadge = ({ level, size = 'regular' }: RiskBadgeProps) => {
  const colors = getRiskLevelColor(level);
  const icon = getRiskLevelIcon(level);
  
  // Get specific risk badge styling
  const getRiskBadgeClass = (level: RiskLevel) => {
    switch(level) {
      case 'Low':
        return 'risk-low';
      case 'Moderate':
        return 'risk-moderate';
      case 'High':
        return 'risk-high';
      case 'Critical':
        return 'risk-critical';
      default:
        return 'risk-moderate';
    }
  };

  // Get English text for risk level
  const getRiskLevelText = (level: RiskLevel) => {
    switch(level) {
      case 'Low':
        return 'LOW';
      case 'Moderate':
        return 'MODERATE';
      case 'High':
        return 'HIGH';
      case 'Critical':
        return 'CRITICAL';
      default:
        return 'MODERATE';
    }
  };

  const sizeClasses = size === 'large' 
    ? 'px-4 py-2 text-body-md' 
    : 'px-3 py-1.5 text-caption';
  
  return (
    <div className={`
      risk-badge
      ${sizeClasses}
      ${getRiskBadgeClass(level)}
    `}>
      <span className="text-base">{icon}</span>
      <span>{getRiskLevelText(level)}</span>
    </div>
  );
};
