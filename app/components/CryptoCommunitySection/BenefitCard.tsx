import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, AlertTriangle, Scale, Link, TrendingUp, Briefcase } from 'lucide-react';

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const iconMap = {
  BarChart3,
  AlertTriangle,
  Scale,
  Link,
  TrendingUp,
  Briefcase
};

interface BenefitCardProps {
  benefit: BenefitItem;
  index: number;
  variants: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
}

export const BenefitCard = React.memo<BenefitCardProps>(({ benefit, index, variants }) => {
  const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || BarChart3;

  return (
    <motion.div
      key={index}
      variants={variants}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl backdrop-blur-sm border border-navy-200/30 group-hover:border-navy-300/50 transition-all duration-300"></div>
      
      <div className="relative p-8 h-full">
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-navy-800 mb-4 group-hover:text-navy-700 transition-colors duration-300">
          {benefit.title}
        </h3>
        
        <p className="text-navy-600 leading-relaxed group-hover:text-navy-700 transition-colors duration-300">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
});

BenefitCard.displayName = "BenefitCard";