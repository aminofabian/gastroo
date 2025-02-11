"use client";

import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { FaBell, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { useUserStore } from "@/store/user-store";

const outfit = Outfit({ subsets: ["latin"] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, notifications, fetchUserData } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const capitalizeWords = (str: string) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const fullName = user
  ? user.firstName || user.lastName 
    ? `${user.namePrefix ? user.namePrefix.charAt(0).toUpperCase() + user.namePrefix.slice(1).toLowerCase() + '.' : ''} ${user.firstName || ''} ${user.lastName || ''}`.trim()
    : 'No name provided'
  : 'Loading...';
  
  const designation = user?.designation || user?.title || '';
  const formattedDesignation = designation ? capitalizeWords(designation) : '';

  return (
    <div className={`flex h-screen bg-gray-50 ${outfit.className}`}>
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8  bg-[#003366]/5 flex items-center justify-center">
                <FaUserMd className="text-[#003366]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-gray-800 font-semibold tracking-wide">{fullName}</div>
                {formattedDesignation && (
                  <div className="text-xs font-medium text-[#003366]/70">{formattedDesignation}</div>
                )}
                <div className="text-xs text-gray-500">{user?.role || 'Loading...'}</div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {/* Membership Status */}
              <div className="hidden sm:block">
                <div className="text-gray-500 text-xs">Membership Status</div>
                <div className="text-gray-900 text-sm font-medium">Active Member</div>
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaBell className="text-xl" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#003366] text-xs flex items-center justify-center text-white">
                    {notifications.length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Bottom Navigation - Visible only on mobile */}
        <BottomNav />
      </div>
    </div>
  );
} 