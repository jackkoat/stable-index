import { motion } from 'framer-motion';

interface StatsOverviewProps {
  dashboardStats: {
    total_countries: number;
    low_risk: number;
    moderate_risk: number;
    high_risk: number;
    critical_risk: number;
    avg_uri_score: number;
  };
}

export function StatsOverview({ dashboardStats }: StatsOverviewProps) {
  const stats = [
    {
      title: "Total Countries",
      value: dashboardStats.total_countries,
      color: "text-navy-600",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    },
    {
      title: "Low Risk",
      value: dashboardStats.low_risk,
      color: "text-navy-500",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    },
    {
      title: "Moderate Risk",
      value: dashboardStats.moderate_risk,
      color: "text-navy-400",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    },
    {
      title: "High Risk",
      value: dashboardStats.high_risk,
      color: "text-navy-700",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    },
    {
      title: "Critical Risk",
      value: dashboardStats.critical_risk,
      color: "text-navy-800",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    },
    {
      title: "Average SI Score",
      value: Math.round(dashboardStats.avg_uri_score),
      color: "text-navy-900",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200"
    }
  ];

  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Global Stability Overview
          </h2>
          <p className="text-lg text-neutral-600">
            Real-time monitoring of political stability and social unrest indicators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                className={`text-4xl font-bold ${stat.color} mb-2`}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-neutral-700">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-navy-500 animate-pulse"></div>
            <span className="text-sm font-medium text-neutral-700">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
