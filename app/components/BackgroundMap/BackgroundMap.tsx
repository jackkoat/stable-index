// =====================================================
// Background Map Component
// =====================================================
// Decorative background with world map elements
// Optimized for minimal bundle size
// =====================================================

import React from 'react';

interface BackgroundMapProps {
  className?: string;
  animated?: boolean;
  showGrid?: boolean;
  showDecorativePoints?: boolean;
  opacity?: number;
}

export function BackgroundMap({ 
  className = "", 
  animated = true,
  showGrid = true,
  showDecorativePoints = true,
  opacity = 0.4
}: BackgroundMapProps) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-slate-200"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/30 via-transparent to-teal-300/25"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-200/20 via-transparent to-blue-200/25"></div>
      
      {/* World Map SVG */}
      <WorldMapSVG 
        animated={animated}
        opacity={opacity}
        showDecorativePoints={showDecorativePoints}
      />
      
      {/* Grid Overlay */}
      {showGrid && <GridOverlay />}
      
      {/* Floating Elements */}
      <FloatingElements />
    </div>
  );
}

// World Map SVG Component
interface WorldMapSVGProps {
  animated: boolean;
  opacity: number;
  showDecorativePoints: boolean;
}

function WorldMapSVG({ animated, opacity, showDecorativePoints }: WorldMapSVGProps) {
  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <svg 
        viewBox="0 0 1000 500" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="worldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Major continents simplified */}
        <ContinentPaths animated={animated} />
        
        {/* Decorative Points */}
        {showDecorativePoints && <DecorativePoints animated={animated} />}
      </svg>
    </div>
  );
}

// Continent Paths Component
interface ContinentPathsProps {
  animated: boolean;
}

function ContinentPaths({ animated }: ContinentPathsProps) {
  const continents = [
    // North America
    { d: "M120,120 L220,110 L280,140 L260,200 L200,220 L140,200 L110,160 Z" },
    // South America  
    { d: "M200,240 L240,250 L260,290 L250,320 L220,310 L200,280 Z" },
    // Europe
    { d: "M480,100 L550,95 L580,130 L560,160 L500,165 L470,140 Z" },
    // Europe extended
    { d: "M480,180 L540,175 L560,220 L550,260 L520,280 L480,260 L470,220 Z" },
    // Asia
    { d: "M650,90 L850,100 L900,180 L880,260 L750,270 L680,220 L650,160 Z" },
    // Australia
    { d: "M800,350 L860,345 L875,380 L850,400 L820,395 L805,375 Z" }
  ];

  return (
    <>
      {continents.map((continent, index) => (
        <path 
          key={index}
          d={continent.d}
          fill="url(#worldGradient)" 
          className={animated ? "transition-all duration-500 hover:opacity-60" : ""}
        />
      ))}
    </>
  );
}

// Decorative Points Component
interface DecorativePointsProps {
  animated: boolean;
}

function DecorativePoints({ animated }: DecorativePointsProps) {
  const points = [
    { cx: 200, cy: 150, r: 3, color: "#3B82F6", duration: "3s" },
    { cx: 600, cy: 120, r: 2.5, color: "#0EA5E9", duration: "4s" },
    { cx: 500, cy: 200, r: 2, color: "#06B6D4", duration: "5s" }
  ];

  if (!animated) {
    return (
      <>
        {points.map((point, index) => (
          <circle 
            key={index}
            cx={point.cx} 
            cy={point.cy} 
            r={point.r} 
            fill={point.color} 
            opacity="0.6"
          />
        ))}
      </>
    );
  }

  return (
    <>
      {points.map((point, index) => (
        <circle key={index} cx={point.cx} cy={point.cy} r={point.r} fill={point.color} opacity="0.6">
          <animate attributeName="r" values={`${point.r};${point.r + 2};${point.r}`} dur={point.duration} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;1;0.6" dur={point.duration} repeatCount="indefinite"/>
        </circle>
      ))}
    </>
  );
}

// Grid Overlay Component
function GridOverlay() {
  return (
    <div 
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }}
    ></div>
  );
}

// Floating Elements Component
function FloatingElements() {
  return (
    <>
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/10 to-teal-300/8 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-gradient-to-br from-cyan-300/8 to-blue-300/6 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-400/6 to-teal-400/5 rounded-full blur-lg animate-pulse delay-2000"></div>
    </>
  );
}

// Lightweight variant for better performance
export function LightBackgroundMap({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-teal-100/15"></div>
    </div>
  );
}

// Minimal variant for mobile
export function MinimalBackgroundMap({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50"></div>
    </div>
  );
}