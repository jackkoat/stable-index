import React from 'react';
import { BenefitCard } from './BenefitCard';
import { 
  Zap, 
  Shield, 
  Activity, 
  Users, 
  Globe, 
  TrendingUp 
} from 'lucide-react';

export const BenefitsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card 1: Real-time Analysis */}
      <BenefitCard
        index={0}
        benefit={{
          title: "Real-Time Analysis",
          description: "Instant processing of thousands of data points across social, economic, and political indicators.",
          icon: Zap,
          color: "from-blue-500 to-cyan-500"
        }}
      />

      {/* Card 2: Predictive Security */}
      <BenefitCard
        index={1}
        benefit={{
          title: "Predictive Security",
          description: "Advanced algorithms that forecast potential instability before it becomes a critical threat.",
          icon: Shield,
          color: "from-indigo-500 to-purple-500"
        }}
      />

      {/* Card 3: Market Impact */}
      <BenefitCard
        index={2}
        benefit={{
          title: "Market Impact",
          description: "Direct correlation analysis between social stability events and crypto market volatility.",
          icon: Activity,
          color: "from-emerald-500 to-teal-500"
        }}
      />

      {/* Card 4: Community Driven */}
      <BenefitCard
        index={3}
        benefit={{
          title: "Community Driven",
          description: "Decentralized intelligence gathering network powered by verified local contributors.",
          icon: Users,
          color: "from-orange-500 to-amber-500"
        }}
      />

      {/* Card 5: Global Coverage */}
      <BenefitCard
        index={4}
        benefit={{
          title: "Global Coverage",
          description: "Monitoring nodes active in 25+ countries providing granular, localized data feeds.",
          icon: Globe,
          color: "from-pink-500 to-rose-500"
        }}
      />

      {/* Card 6: Trend Detection */}
      <BenefitCard
        index={5}
        benefit={{
          title: "Trend Detection",
          description: "Identify emerging macro-trends and sentiment shifts before mainstream media coverage.",
          icon: TrendingUp,
          color: "from-cyan-500 to-blue-600"
        }}
      />
    </div>
  );
};