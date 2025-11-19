import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../shared/Button';

export function HeroHeader() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center" // Flex column and center items
      >
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-navy/5 border border-accent-navy/10 text-accent-navy text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-navy opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-navy"></span>
          </span>
          Live Intelligence Platform
        </div>

        {/* Heading */}
        <h1 className="text-display font-bold text-text-primary mb-6 tracking-tight leading-tight">
          Real-Time Global <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-navy via-accent-navy-light to-accent-navy-dark">
            Risk Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className="text-body-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          Monitor social stability indicators across 25 countries with professional analysis 
          and predictive threat detection.
        </p>

        {/* Buttons - Centered */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <Button 
            variant="primary" 
            size="lg" 
            className="shadow-lg shadow-accent-navy/20 hover:shadow-accent-navy/30 min-w-[160px]"
            onClick={() => window.location.href = '/dashboard'}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* <Button 
            variant="outline" 
            size="lg"
            className="bg-white/50 backdrop-blur-sm min-w-[160px]"
            onClick={() => window.location.href = '/about'}
          >
            View Methodology
          </Button> */}
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-surface-border/60 flex flex-wrap justify-center gap-8 text-text-muted opacity-80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent-navy" />
            <span className="text-sm font-medium">Verified Data Sources</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent-navy" />
            <span className="text-sm font-medium">24/7 Global Monitoring</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}