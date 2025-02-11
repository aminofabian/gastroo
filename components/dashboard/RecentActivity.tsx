"use client";

import { motion } from "framer-motion";
import { FaCertificate, FaFileAlt, FaClock } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { IconType } from "react-icons";

interface Activity {
  type: string;
  title: string;
  date: string;
  icon: IconType;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const recentActivities: Activity[] = [
  {
    type: "certificate",
    title: "CME Certificate Earned",
    date: "2 days ago",
    icon: FaCertificate,
    color: "text-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-400",
  },
  {
    type: "payment",
    title: "Annual Membership Renewed",
    date: "1 week ago",
    icon: MdPayments,
    color: "text-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-indigo-400",
  },
  {
    type: "document",
    title: "Research Paper Submitted",
    date: "2 weeks ago",
    icon: FaFileAlt,
    color: "text-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-400",
  },
];

export default function RecentActivity() {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-[#003366] hover:text-[#004488] font-medium flex items-center gap-1.5">
          <FaClock className="text-gray-400" />
          View All
        </button>
      </div>

      <div className="bg-white  shadow-sm divide-y divide-gray-100">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={false}
            whileHover={{ backgroundColor: "rgb(249, 250, 251)", x: 4 }}
            className="p-5 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className={`relative p-3  bg-gradient-to-br ${activity.gradientFrom} ${activity.gradientTo} bg-opacity-10`}
              >
                <activity.icon className="text-xl text-white" />
                {/* Glossy overlay */}
                <div className="absolute inset-0  bg-white/20 backdrop-blur-sm" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-gray-900 group-hover:text-[#003366] transition-colors truncate">
                    {activity.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap">
                    <FaClock className="text-gray-300" />
                    {activity.date}
                  </div>
                </div>
                
                {/* Progress Bar (subtle) */}
                <div className="mt-3 relative h-1 bg-gray-50  overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`absolute h-full bg-gradient-to-r ${activity.gradientFrom} ${activity.gradientTo} opacity-20 group-hover:opacity-40 `}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 