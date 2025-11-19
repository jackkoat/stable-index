// =====================================================
// Map Color Schemes
// =====================================================
// Shared color logic for risk levels
// Split from WorldMap for better code splitting
// =====================================================

import { RiskLevel } from '../../types';

// Risk level colors
export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return '#10B981'; // Green-500
    case 'Moderate':
      return '#F59E0B'; // Amber-500
    case 'High':
      return '#F97316'; // Orange-500
    case 'Critical':
      return '#EF4444'; // Red-500
    default:
      return '#E5E7EB'; // Gray-300
  }
};

export const getRiskHoverColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return '#059669'; // Green-600
    case 'Moderate':
      return '#D97706'; // Amber-600
    case 'High':
      return '#DC2626'; // Red-600
    case 'Critical':
      return '#B91C1C'; // Red-700
    default:
      return '#D1D5DB'; // Gray-400
  }
};

// Color utilities for gradients and animations
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Generate gradient colors for background elements
export const generateGradientColors = (riskLevel: RiskLevel) => {
  const baseColor = getRiskColor(riskLevel);
  const hoverColor = getRiskHoverColor(riskLevel);
  
  return {
    base: baseColor,
    hover: hoverColor,
    gradient: `linear-gradient(135deg, ${getColorWithOpacity(baseColor, 0.8)}, ${getColorWithOpacity(hoverColor, 0.6)})`,
    background: getColorWithOpacity(baseColor, 0.1)
  };
};

// Get color for selected state
export const getSelectedRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return '#047857'; // Green-700
    case 'Moderate':
      return '#B45309'; // Amber-700
    case 'High':
      return '#EA580C'; // Orange-600
    case 'Critical':
      return '#DC2626'; // Red-600
    default:
      return '#374151'; // Gray-700
  }
};