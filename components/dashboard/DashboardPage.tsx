"use client";

import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaFileAlt,
  FaCertificate,
  FaUsers,
  FaGraduationCap,
  FaStethoscope,
  FaHandHoldingMedical,
  FaHospital,
  FaBookMedical,
  FaFlask,
  FaRegNewspaper
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";

// Quick actions data
const quickActions = [
  {
    icon: FaCalendarCheck,
    label: "Upcoming CME",
    description: "View upcoming events",
    href: "/dashboard/events"
  },
  {
    icon: FaBookMedical,
    label: "Clinical Resources",
    description: "Access medical resources",
    href: "/dashboard/resources"
  },
  {
    icon: FaRegNewspaper,
    label: "Research Papers",
    description: "Latest publications",
    href: "/dashboard/research"
  },
  {
    icon: FaGraduationCap,
    label: "Learning Hub",
    description: "Educational content",
    href: "/dashboard/learning"
  }
];

// Stats data
const stats = [
  {
    icon: FaGraduationCap,
    label: "CPD Points",
    value: "150",
    change: "+12 this month",
    trend: "up"
  },
  {
    icon: FaStethoscope,
    label: "Clinical Cases",
    value: "28",
    change: "+3 this week",
    trend: "up"
  },
  {
    icon: FaCertificate,
    label: "Certificates",
    value: "5",
    change: "Latest: CME 2023",
    trend: "neutral"
  },
  {
    icon: FaHandHoldingMedical,
    label: "Contributions",
    value: "12",
    change: "+2 this month",
    trend: "up"
  }
];

// Upcoming events data
const upcomingEvents = [
  {
    title: "Annual Gastroenterology Conference",
    date: "2024-03-15",
    location: "Nairobi, Kenya",
    type: "Conference",
    icon: FaHospital
  },
  {
    title: "Advanced Endoscopy Workshop",
    date: "2024-03-28",
    location: "Virtual Event",
    type: "Workshop",
    icon: FaStethoscope
  }
];

// Recent updates data
const recentUpdates = [
  {
    title: "New Clinical Guidelines Released",
    date: "2024-03-15",
    type: "Publication",
    icon: FaBookMedical,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Annual Gastroenterology Conference",
    date: "2024-04-05",
    type: "Event",
    icon: FaHospital,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Research Grant Applications Open",
    date: "2024-03-20",
    type: "Opportunity",
    icon: FaFlask,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-[#003366] text-white  p-6 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold mb-2">Welcome back, Dr. John! 👋</h1>
          <p className="text-white/80">Track your professional development and stay updated with the latest in gastroenterology.</p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#004488]  blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions Grid */}
          <section>
            <h2 className="text-xl font-semibold text-[#003366] mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  className="group relative p-4 bg-white  border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12  bg-[#003366] flex items-center justify-center text-white mb-3">
                    <action.icon className="text-xl" />
                  </div>
                  <h3 className="font-medium text-[#003366]">{action.label}</h3>
                  <p className="text-sm text-[#003366]/70">{action.description}</p>
                </motion.a>
              ))}
            </div>
          </section>

          {/* Stats Grid */}
          <section>
            <h2 className="text-xl font-semibold text-[#003366] mb-4">Your Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white  border border-gray-100 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8  bg-[#003366]/5 flex items-center justify-center">
                      <stat.icon className="text-[#003366]" />
                    </div>
                    <span className="text-sm font-medium text-[#003366]/70">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#003366]">{stat.value}</span>
                    <span className="text-sm text-[#003366]/70">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section>
            <h2 className="text-xl font-semibold text-[#003366] mb-4">Upcoming Events</h2>
            <div className="bg-white  border border-gray-100 divide-y divide-gray-100">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10  bg-[#003366]/5 flex items-center justify-center flex-shrink-0">
                    <event.icon className="text-[#003366]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#003366] truncate">{event.title}</h3>
                    <p className="text-sm text-[#003366]/70">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#003366]">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-[#003366]/70">{event.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Updates Section */}
        <div className="lg:col-span-1">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#003366]">Recent Updates</h2>
              <button className="text-sm text-[#003366] hover:text-[#004488] font-medium">
                View All
              </button>
            </div>
            <div className="bg-white  border border-gray-100 divide-y divide-gray-100">
              {recentUpdates.map((update, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8  bg-[#003366]/5 flex items-center justify-center flex-shrink-0">
                      <update.icon className="text-[#003366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#003366]">{update.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#003366]/70">
                          {new Date(update.date).toLocaleDateString('en-US', { 
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="w-1 h-1  bg-[#003366]/30"></span>
                        <span className="text-xs font-medium text-[#003366]">
                          {update.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 