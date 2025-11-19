// =====================================================
// Map Tooltip Component
// =====================================================
// Handles tooltip display for country interactions
// Split from WorldMap for better code splitting
// =====================================================

import React from 'react';
import { CountryData } from '../../types';

interface TooltipData {
  x: number;
  y: number;
  content: string;
}

interface MapTooltipProps {
  tooltip: TooltipData | null;
  className?: string;
}

export function MapTooltip({ tooltip, className = "" }: MapTooltipProps) {
  if (!tooltip) return null;

  return (
    <div 
      className={`absolute z-50 bg-neutral-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none ${className}`}
      style={{ 
        left: tooltip.x + 10, 
        top: tooltip.y - 10,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="text-sm font-medium whitespace-pre-line">
        {tooltip.content}
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
      </div>
    </div>
  );
}

// Tooltip content generator
interface TooltipContentProps {
  country: CountryData;
  showDetailed?: boolean;
}

export function TooltipContent({ country, showDetailed = false }: TooltipContentProps) {
  const { country: countryInfo, current_uri } = country;
  
  const baseContent = `${countryInfo.name} (${countryInfo.code})
SI Score: ${current_uri.uri_score.toFixed(1)}
Risk Level: ${current_uri.risk_level}`;

  if (showDetailed) {
    const { indicators } = country;
    return `${baseContent}
Youth Unemployment: ${indicators.youth_unemployment.raw_value.toFixed(1)}%
Food Inflation: ${indicators.food_inflation.raw_value.toFixed(2)}%
Corruption Index: ${indicators.corruption_index.raw_value.toFixed(0)}/100`;
  }

  return baseContent;
}

// Tooltip position calculator
interface TooltipPosition {
  x: number;
  y: number;
}

export function calculateTooltipPosition(
  event: React.MouseEvent,
  containerRect: DOMRect
): TooltipPosition {
  const x = event.clientX - containerRect.left;
  const y = event.clientY - containerRect.top;
  
  return { x, y };
}

// Smart tooltip positioning to avoid viewport overflow
export function getSmartTooltipPosition(
  x: number,
  y: number,
  containerWidth: number,
  containerHeight: number,
  tooltipWidth = 200,
  tooltipHeight = 100
): TooltipPosition {
  let adjustedX = x;
  let adjustedY = y;

  // Adjust horizontal position
  if (x + tooltipWidth > containerWidth) {
    adjustedX = x - tooltipWidth;
  }
  
  // Adjust vertical position
  if (y - tooltipHeight < 0) {
    adjustedY = y + tooltipHeight;
  }

  return { x: adjustedX, y: adjustedY };
}