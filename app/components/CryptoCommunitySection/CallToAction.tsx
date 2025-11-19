import React from 'react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  className?: string;
}

export const CallToAction = React.memo<CallToActionProps>(({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={`text-center mt-16 ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-navy-600 to-navy-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Explore Stable Index for Crypto Investing
      </motion.button>
    </motion.div>
  );
});

CallToAction.displayName = "CallToAction";