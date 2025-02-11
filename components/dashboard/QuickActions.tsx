"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendarAlt, FaFileAlt, FaUsers } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { IconType } from "react-icons";

interface QuickAction {
  icon: IconType;
  label: string;
  description: string;
  href: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const quickActions: QuickAction[] = [
  {
    icon: FaCalendarAlt,
    label: "CME Events",
    description: "Register & View",
    href: "/dashboard/events",
    color: "bg-emerald-500",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-emerald-600",
  },
  {
    icon: FaFileAlt,
    label: "Documents",
    description: "Upload & Manage",
    href: "/dashboard/documents",
    color: "bg-green-500",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
  },
  {
    icon: MdPayments,
    label: "Payments",
    description: "Fees & Dues",
    href: "/dashboard/payments",
    color: "bg-purple-500",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  {
    icon: FaUsers,
    label: "Directory",
    description: "Find Members",
    href: "/dashboard/members",
    color: "bg-orange-500",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-center p-4 md:p-6 cursor-pointer group"
            >
              {/* Icon Container with Gradient Background */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br ${action.gradientFrom} ${action.gradientTo} -[1.25rem] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform-gpu relative`}
              >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 -[1.25rem] bg-gradient-to-br from-white/50 to-transparent opacity-50" />
                
                {/* Icon */}
                <action.icon className="text-2xl text-white relative z-10" />
                
                {/* Bottom Shadow */}
                <div className="absolute -bottom-2 inset-x-4 h-2 bg-black/20 blur-sm " />
              </motion.div>

              {/* Labels */}
              <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold text-gray-900">
                  {action.label}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {action.description}
                </p>
              </div>

              {/* Active Dot Indicator */}
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className={`w-1 h-1  bg-gradient-to-r ${action.gradientFrom} ${action.gradientTo} mt-1`}
              />
            </motion.div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
} 