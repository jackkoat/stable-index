import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  className?: string;
}

export const SectionHeader = React.memo<SectionHeaderProps>(({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`text-center mb-16 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl font-bold text-navy-800 mb-6 bg-gradient-to-r from-navy-800 via-navy-700 to-navy-600 bg-clip-text text-transparent"
      >
        Why We Built This for Crypto Community
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed"
      >
        Stable Index provides crucial insights for cryptocurrency investors, traders, and DeFi participants. 
        Understanding political and social stability is essential for making informed crypto investment decisions.
      </motion.p>
    </motion.div>
  );
});

SectionHeader.displayName = "SectionHeader";