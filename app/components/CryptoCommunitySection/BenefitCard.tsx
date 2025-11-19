import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface BenefitItem {
  title: string;
  description: string;
  icon: React.ElementType; // Changed to accept a component type
  color: string;
}

interface BenefitCardProps {
  benefit: BenefitItem;
  index: number;
}

export const BenefitCard = React.memo<BenefitCardProps>(({ benefit, index }) => {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover="hover"
      className="group relative h-full"
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-white/80 rounded-2xl backdrop-blur-sm border border-surface-border shadow-sm group-hover:border-accent-navy/30 group-hover:shadow-lg transition-all duration-300"></div>
      
      <div className="relative p-8 h-full flex flex-col items-start">
        {/* Icon Container with Popup Animation */}
        <motion.div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-md relative z-10`}
          variants={{
            hover: { 
              y: -12, // Pop up effect
              scale: 1.1, 
              rotate: [0, -3, 3, 0], // Subtle wobble
              boxShadow: "0px 15px 20px -5px rgba(0, 0, 0, 0.1)"
            }
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-navy transition-colors duration-300">
          {benefit.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {benefit.description}
        </p>

        {/* Decorative line that appears on hover */}
        <motion.div 
          className="mt-auto pt-6 w-full"
          initial={{ opacity: 0.5, scaleX: 0, originX: 0 }}
          variants={{ 
            hover: { opacity: 1, scaleX: 1 } 
          }}
          transition={{ duration: 0.4 }}
        >
           <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${benefit.color}`} />
        </motion.div>
      </div>
    </motion.div>
  );
});

BenefitCard.displayName = "BenefitCard";