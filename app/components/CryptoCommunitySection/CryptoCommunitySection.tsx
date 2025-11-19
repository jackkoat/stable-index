import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { shared } from '../shared';

const SectionHeader = lazy(() => import('./SectionHeader').then(module => ({ default: module.SectionHeader })));
const BenefitsList = lazy(() => import('./BenefitsList').then(module => ({ default: module.BenefitsList })));
const CallToAction = lazy(() => import('./CallToAction').then(module => ({ default: module.CallToAction })));

const { LoadingSpinner } = shared;

interface CryptoCommunitySectionProps {
  className?: string;
}

export const CryptoCommunitySection = React.memo<CryptoCommunitySectionProps>(({ className = "" }) => {
  return (
    <section className={`bg-gradient-to-br from-navy-50 via-white to-navy-100 py-24 relative overflow-hidden ${className}`}>
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-navy-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-navy-600/3 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8">
        <Suspense fallback={<LoadingSpinner className="mb-16" />}>
          <SectionHeader />
        </Suspense>
        
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><LoadingSpinner /><LoadingSpinner /><LoadingSpinner /></div>}>
          <BenefitsList />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner className="mt-16" />}>
          <CallToAction />
        </Suspense>
      </div>
    </section>
  );
});

CryptoCommunitySection.displayName = "CryptoCommunitySection";