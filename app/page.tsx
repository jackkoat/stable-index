'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { StatsOverview } from '@/components/StatsOverview';
import { CryptoCommunitySection } from '@/components/CryptoCommunitySection';
import { RiskLegend } from '@/components/RiskLegend';
// Removed ExportButton import as requested
import { useState, useEffect } from 'react';

// This is a client component for the home page
interface DashboardStats {
  total_countries: number;
  low_risk: number;
  moderate_risk: number;
  high_risk: number;
  critical_risk: number;
  avg_uri_score: number;
}

export default function HomePage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [countriesData, setCountriesData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // Load data for the home page
    const loadData = async () => {
      try {
        // TODO: Replace with actual data loading from Supabase
        setDashboardStats({
          total_countries: 195,
          low_risk: 89,
          moderate_risk: 83,
          high_risk: 23,
          critical_risk: 0,
          avg_uri_score: 72.5
        });
        
        setCountriesData([]);
        setDataLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50"
    >
      {/* Hero/Overview Section - Ensuring full height alignment */}
      <motion.section 
        variants={itemVariants} 
        id="overview"
        className="h-screen flex items-center justify-center" // Removed px-4 for full width
      >
        <div className="max-w-[1600px] mx-auto">
          <HeroSection />
        </div>
      </motion.section>

      {/* Stats Overview */}
      <motion.section 
        variants={itemVariants}
        className="py-16 px-4"
      >
        <div className="max-w-[1600px] mx-auto">
          {dashboardStats && <StatsOverview dashboardStats={dashboardStats} />}
        </div>
      </motion.section>

      {/* Crypto Community Section - New Addition */}
      <motion.section 
        variants={itemVariants}
        className="py-16 px-4"
      >
        <div className="max-w-[1600px] mx-auto">
          <CryptoCommunitySection />
        </div>
      </motion.section>

      {/* Risk Legend Section - Cleaned up & Centered */}
      <motion.section 
        variants={itemVariants} 
        className="bg-surface-secondary py-24 px-4 border-t border-surface-border"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Removed ExportButton grid, just rendering RiskLegend cleanly */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <RiskLegend />
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}