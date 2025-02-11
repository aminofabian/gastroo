"use client";

import { FaUsers, FaHandshake, FaDonate, FaNewspaper } from "react-icons/fa";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Activity {
  id: string;
  type: "user" | "donation" | "partner";
  message: string;
  time: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: "emerald" | "green" | "purple" | "orange";
}

interface DashboardData {
  stats: Stat[];
  recentActivities: Activity[];
}

const iconMap = {
  FaUsers,
  FaHandshake,
  FaDonate,
  FaNewspaper,
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#003366] text-white hover:bg-[#004488] transition-colors"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (isLoading || !data) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading dashboard data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.stats.map((stat, index) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 ${
                      stat.color === "emerald"
                        ? "bg-emerald-100 text-emerald-600"
                        : stat.color === "green"
                        ? "bg-green-100 text-green-600"
                        : stat.color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <Icon className="text-xl" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-[#003366] text-white hover:bg-[#004488] transition-colors">
            <div className="flex items-center gap-3">
              <FaUsers className="text-xl" />
              <span>Add New Member</span>
            </div>
          </button>
          <button className="p-4 bg-[#003366] text-white hover:bg-[#004488] transition-colors">
            <div className="flex items-center gap-3">
              <FaHandshake className="text-xl" />
              <span>Add Partner</span>
            </div>
          </button>
          <button className="p-4 bg-[#003366] text-white hover:bg-[#004488] transition-colors">
            <div className="flex items-center gap-3">
              <FaNewspaper className="text-xl" />
              <span>Post Update</span>
            </div>
          </button>
          <button className="p-4 bg-[#003366] text-white hover:bg-[#004488] transition-colors">
            <div className="flex items-center gap-3">
              <FaDonate className="text-xl" />
              <span>Record Donation</span>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-white border hover:shadow-sm transition-shadow"
              >
                <div
                  className={`p-2 ${
                    activity.type === "user"
                      ? "bg-emerald-100 text-emerald-600"
                      : activity.type === "donation"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {activity.type === "user" ? (
                    <FaUsers />
                  ) : activity.type === "donation" ? (
                    <FaDonate />
                  ) : (
                    <FaHandshake />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 