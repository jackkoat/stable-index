'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { StatsOverview } from '@/components/StatsOverview';
import { CryptoCommunitySection } from '@/components/CryptoCommunitySection';
import { RiskLegend } from '@/components/RiskLegend';
import ExportButton from '@/components/ExportButton';
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
      className="min-h-screen"
    >
      {/* Hero/Overview Section */}
      <motion.section variants={itemVariants} id="overview">
        <HeroSection />
      </motion.section>

      {/* Stats Overview */}
      <motion.section variants={itemVariants}>
        {dashboardStats && <StatsOverview dashboardStats={dashboardStats} />}
      </motion.section>

      {/* Crypto Community Section - New Addition */}
      <motion.section variants={itemVariants}>
        <CryptoCommunitySection />
      </motion.section>

      {/* Risk Legend & Export */}
      <motion.section variants={itemVariants} className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <RiskLegend />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ExportButton data={countriesData} />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}