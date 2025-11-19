'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { StatsOverview } from '@/components/StatsOverview';
import { CryptoCommunitySection } from '@/components/CryptoCommunitySection';
import { RiskLegend } from '@/components/RiskLegend';

// --- Types & Helpers ---

interface DashboardStats {
  total_countries: number;
  low_risk: number;
  moderate_risk: number;
  high_risk: number;
  critical_risk: number;
  avg_uri_score: number;
}

// A cleaner wrapper component to handle layout, width, and animations consistently.
// This fixes the "verbose" structure issues.
const SectionWrapper = ({ 
  children, 
  className = "", 
  id = "",
  fullHeight = false 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
  fullHeight?: boolean;
}) => {
  const variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Smooth trigger
      // 'min-h-screen' prevents collision on mobile. 'py-24' adds safe breathing room.
      className={`
        w-full px-6 md:px-8 
        ${fullHeight ? 'min-h-screen flex items-center py-20' : 'py-24 md:py-32'} 
        ${className}
      `}
    >
      <div className="max-w-[1400px] mx-auto w-full relative">
        {children}
      </div>
    </motion.section>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  // Removed unused data states to clean up code

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        setDashboardStats({
          total_countries: 195,
          low_risk: 89,
          moderate_risk: 83,
          high_risk: 23,
          critical_risk: 0,
          avg_uri_score: 72.5
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, []);

  return (
    // Removed specific gradient classes here to let your global background/layout handle it
    <main className="flex flex-col w-full overflow-x-hidden">
      
      {/* 1. Hero Section */}
      {/* Using fullHeight=true ensures it fills the screen but expands if needed */}
      <SectionWrapper id="hero" fullHeight>
        <HeroSection />
      </SectionWrapper>

      {/* 2. Stats Overview */}
      {/* Conditional rendering kept clean */}
      {dashboardStats && (
        <SectionWrapper id="stats">
          <StatsOverview dashboardStats={dashboardStats} />
        </SectionWrapper>
      )}

      {/* 3. Community Section */}
      <SectionWrapper id="community">
        <CryptoCommunitySection />
      </SectionWrapper>

      {/* 4. Risk Legend (Footer Area) */}
      <SectionWrapper id="risk-legend" className="bg-surface-secondary/50 rounded-3xl my-8">
        <RiskLegend />
      </SectionWrapper>

    </main>
  );
}