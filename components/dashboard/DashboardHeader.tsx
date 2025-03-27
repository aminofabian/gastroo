"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";
import NotificationsDropdown from "./NotificationsDropdown";
import UserMenuDropdown from "./UserMenuDropdown";
import { getDashboardData } from "@/actions/get-dashboard-data";
import Link from "next/link";

interface DashboardData {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string;
    image: string | null;
    namePrefix: string | null;
    designation: string | null;
    title: string | null;
  };
  notifications: {
    id: string;
    title: string;
    message: string;
    time: string;
  }[];
}

export default function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardData();
      if (!data.error) {
        setDashboardData(data as DashboardData);
      }
    };
    fetchData();
  }, []);

  const capitalizeWords = (str: string) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const userInitials = dashboardData?.user 
    ? `${dashboardData.user.firstName?.[0] || ''}${dashboardData.user.lastName?.[0] || ''}`
    : '';

  const fullName = dashboardData?.user
    ? `${dashboardData.user.namePrefix ? dashboardData.user.namePrefix.charAt(0).toUpperCase() + dashboardData.user.namePrefix.slice(1).toLowerCase() + '.' : ''} ${dashboardData.user.firstName || ''} ${dashboardData.user.lastName || ''}`.trim()
    : 'Loading...';

  const designation = dashboardData?.user?.designation || dashboardData?.user?.title || '';
  const userRole = dashboardData?.user?.role === 'ADMIN' ? 'GSK ADMIN' : 'GSK MEMBER';
  const formattedDesignation = designation ? capitalizeWords(designation) : '';

  return (
    <header className="bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent">
                Welcome back,
              </h1>
              <p className="text-sm sm:text-base text-gray-800 font-semibold tracking-wide">
                {fullName}
              </p>
              {dashboardData?.user?.role === 'ADMIN' ? (
                <Link href="/admin" className="text-xs font-medium text-[#003366] hover:text-[#004488] transition-colors">
                  {userRole}
                </Link>
              ) : (
                <p className="text-xs font-medium text-[#003366]/70">
                  {userRole}
                </p>
              )}
              {formattedDesignation && (
                <p className="text-xs font-medium text-[#003366]/70">
                  {formattedDesignation}
                </p>
              )}
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
            <motion.div 
              className={`w-full relative transition-all duration-200 ${
                isSearchFocused ? "scale-105" : "scale-100"
              }`}
            >
              <div className={`absolute inset-0 bg-white  transition-all duration-200 ${
                isSearchFocused 
                  ? "shadow-lg ring-2 ring-[#003366]/20" 
                  : "shadow-sm ring-1 ring-gray-200/70"
              }`} />
              <input
                type="text"
                placeholder="Search resources, members, events..."
                className="w-full pl-12 pr-4 py-3  border-0 bg-transparent relative text-sm focus:ring-0 transition-colors"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <motion.div
                animate={{ scale: isSearchFocused ? 1.1 : 1 }}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              >
                <FaSearch className={`transition-colors duration-200 ${
                  isSearchFocused ? "text-[#003366]" : "text-gray-400"
                }`} />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3  transition-all duration-200 ${
                  showNotifications 
                    ? "bg-[#003366] text-white shadow-lg" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaBell className="text-lg" />
                {(dashboardData?.notifications ?? []).length > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500  ring-2 ring-white" />
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <NotificationsDropdown 
                    notifications={dashboardData?.notifications || []} 
                  />
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-3  p-1.5 pr-3 transition-all duration-200 ${
                  showUserMenu 
                    ? "bg-gray-100 shadow-inner" 
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10  bg-gradient-to-br from-[#003366] to-[#004488] flex items-center justify-center text-white font-medium shadow-md">
                  {userInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">{fullName}</div>
                  {formattedDesignation && (
                    <div className="text-xs font-medium text-[#003366]/70">{formattedDesignation}</div>
                  )}
                  <div className="text-xs text-gray-500">{dashboardData?.user?.role || 'Loading...'}</div>
                </div>
                <motion.div
                  animate={{ rotate: showUserMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="hidden sm:block text-gray-400 text-xs" />
                </motion.div>
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && <UserMenuDropdown user={dashboardData?.user} />}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="px-4 pb-4 lg:hidden">
          <motion.div 
            className={`relative transition-all duration-200 ${
              isSearchFocused ? "scale-105" : "scale-100"
            }`}
          >
            <div className={`absolute inset-0 bg-white  transition-all duration-200 ${
              isSearchFocused 
                ? "shadow-lg ring-2 ring-[#003366]/20" 
                : "shadow-sm ring-1 ring-gray-200/70"
            }`} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3  border-0 bg-transparent relative text-sm focus:ring-0 transition-colors"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <motion.div
              animate={{ scale: isSearchFocused ? 1.1 : 1 }}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <FaSearch className={`transition-colors duration-200 ${
                isSearchFocused ? "text-[#003366]" : "text-gray-400"
              }`} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
} 