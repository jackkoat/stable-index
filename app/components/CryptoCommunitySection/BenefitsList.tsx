import React from 'react';
import { motion } from 'framer-motion';
import { BenefitCard, BenefitItem } from './BenefitCard';

export const benefits: BenefitItem[] = [
  {
    title: "Risk Assessment for Investment Timing",
    description: "Use URI scores to identify optimal entry and exit points for crypto investments based on country stability indicators.",
    icon: "Activity",
    color: "from-navy-500 to-navy-600"
  },
  {
    title: "Early Warning System",
    description: "Receive alerts before market crashes by monitoring social unrest indicators that correlate with crypto market volatility.",
    icon: "Zap",
    color: "from-navy-400 to-navy-500"
  },
  {
    title: "Government Policy Prediction",
    description: "Predict potential bans and restrictions by analyzing political stability scores across different regions.",
    icon: "Shield",
    color: "from-navy-600 to-navy-700"
  },
  {
    title: "DeFi Integration Support",
    description: "Make informed decisions for yield farming and protocol participation based on regional risk factors.",
    icon: "Network",
    color: "from-navy-300 to-navy-400"
  },
  {
    title: "Market Prediction Insights",
    description: "Understand how social unrest affects crypto adoption patterns and trading volumes in specific regions.",
    icon: "TrendingUp",
    color: "from-navy-700 to-navy-800"
  },
  {
    title: "Portfolio Risk Management",
    description: "Develop comprehensive risk management strategies by diversifying across countries with different stability scores.",
    icon: "PieChart",
    color: "from-navy-800 to-navy-900"
  }
];

interface BenefitsListProps {
  className?: string;
}

export const BenefitsList = React.memo<BenefitsListProps>(({ className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          benefit={benefit}
          index={index}
          variants={cardVariants}
        />
      ))}
    </motion.div>
  );
});

BenefitsList.displayName = "BenefitsList";