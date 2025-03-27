"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaCertificate,
  FaFileAlt,
  FaBuilding,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";

// Reorganize items to have 2 items on each side of home
const mobileMenuItems = [
  { 
    icon: FaFileAlt, 
    label: "Resources", 
    href: "/dashboard/resources",
    description: "Documents & Resources"
  },
  { 
    icon: MdPayments, 
    label: "Payments", 
    href: "/dashboard/payments",
    description: "Manage Payments"
  },
  { 
    icon: FaHome, 
    label: "Home", 
    href: "/dashboard", 
    isHome: true,
    description: "Dashboard Home"
  },
  { 
    icon: FaCertificate, 
    label: "Certs", 
    href: "/dashboard/certificates",
    description: "Certificates & Documents"
  },
  { 
    icon: FaBuilding, 
    label: "Facilities", 
    href: "/dashboard/facilities",
    description: "View Facilities"
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 lg:hidden z-50 pb-safe">
      <nav className="flex justify-around items-center h-20 px-4 max-w-lg mx-auto relative my-2">
        {mobileMenuItems.map((item) => {
          const isActive = pathname === item.href;
          const isHome = item.isHome;
          
          if (isHome) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -mt-8 flex flex-col items-center justify-center w-full"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center w-16 h-16  shadow-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-[#003366] text-white" 
                      : "bg-white text-[#003366] hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="text-2xl" />
                </motion.div>
                <span className={`mt-2 text-[10px] font-medium transition-all duration-200 ${
                  isActive ? "text-[#003366] opacity-100" : "text-gray-500 opacity-70"
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full group py-2"
            >
              <div
                className={`flex flex-col items-center transition-all duration-200 ${
                  isActive 
                    ? "text-[#003366]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="relative">
                  <item.icon className={`text-xl transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`} />
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIconBackground"
                      className="absolute inset-0 -m-1.5  bg-emerald-100/50"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
                <span className={`mt-1.5 text-[10px] font-medium transition-all duration-200 ${
                  isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                }`}>
                  {item.label}
                </span>
              </div>
              {isActive && !isHome && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 left-1/2 w-1 h-1  bg-[#003366]"
                  initial={{ x: "-50%" }}
                  animate={{ x: "-50%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 