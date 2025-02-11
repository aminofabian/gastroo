"use client";

import { motion } from "framer-motion";
import { FaMedal, FaCalendarCheck, FaCertificate, FaFileAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { getUserStatistics } from "@/app/actions/statistics";

interface StatData {
  value: number;
  target: number;
}

interface Statistics {
  cpdPoints: StatData;
  eventsAttended: StatData;
  certificates: StatData;
  documents: StatData;
}

interface StatConfig {
  icon: IconType;
  label: string;
  description: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  dataKey: keyof Statistics;
}

const statConfigs: StatConfig[] = [
  {
    icon: FaMedal,
    label: "CPD Points",
    description: "This Year",
    color: "from-emerald-500 to-emerald-600",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-emerald-600",
    dataKey: "cpdPoints",
  },
  {
    icon: FaCalendarCheck,
    label: "Events Attended",
    description: "Last 12 months",
    color: "from-green-500 to-green-600",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
    dataKey: "eventsAttended",
  },
  {
    icon: FaCertificate,
    label: "Certificates",
    description: "Total Earned",
    color: "from-purple-500 to-purple-600",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
    dataKey: "certificates",
  },
  {
    icon: FaFileAlt,
    label: "Documents",
    description: "Submitted",
    color: "from-orange-500 to-orange-600",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
    dataKey: "documents",
  },
];

export default function Statistics() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getUserStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Your Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statConfigs.map((config) => (
            <div key={config.label} className="bg-white p-6 shadow-sm animate-pulse">
              <div className="h-32" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Your Progress</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statConfigs.map((config) => {
          const statData = statistics[config.dataKey];
          const progressValue = Math.round((statData.value / statData.target) * 100);

          return (
            <motion.div
              key={config.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white p-6 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] [background-size:16px_16px]" />

              {/* Icon and Value Row */}
              <div className="flex items-start justify-between mb-3">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`p-3 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} text-white shadow-lg`}
                >
                  <config.icon className="text-xl" />
                </motion.div>

                {/* Value */}
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent group-hover:scale-110 transform transition-transform`}>
                    {statData.value}
                  </div>
                  <div className="text-xs text-gray-500">{config.description}</div>
                </div>
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-900 mb-2">{config.label}</div>

              {/* Progress Bar Container */}
              <div className="relative h-2 bg-gray-100 overflow-hidden">
                {/* Progress Bar Background */}
                <div className="absolute inset-0 bg-gray-50" />

                {/* Animated Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute h-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`}
                />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>

              {/* Progress Percentage */}
              <div className="mt-1 text-xs text-right text-gray-500">
                {progressValue}% Complete
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
} 