"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarMenuItemProps {
  href: string;
  icon: IconType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  hoveredItem: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function SidebarMenuItem({
  href,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  hoveredItem,
  onHoverStart,
  onHoverEnd,
}: SidebarMenuItemProps) {
  return (
    <motion.div 
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative"
    >
      <Link href={href}>
        <div
          className={`relative flex items-center px-4 py-3  transition-all duration-300 group overflow-hidden
            ${isActive 
              ? "bg-white/20 text-white shadow-lg" 
              : "text-white/70 hover:text-white"
            }
            ${hoveredItem === href ? "shadow-lg transform-gpu scale-105" : ""}
          `}
        >
          {/* Slanted hover effect */}
          <div
            className={`absolute inset-0 transition-transform duration-300 bg-white/10
              ${hoveredItem === href ? "translate-x-0 skew-x-[-8deg] scale-x-[2]" : "translate-x-[-100%] skew-x-[-8deg]"}
            `}
          />

          {/* Active indicator line */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-0 bottom-0 w-1 bg-white "
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div className={`relative flex items-center ${!isCollapsed ? 'w-full' : ''} gap-3`}>
            <motion.div
              whileHover={{ rotate: 12 }}
              className={`relative transition-all duration-300
                ${isCollapsed ? 'p-1' : 'p-2 '}
                ${isActive ? 'bg-white/20 shadow-inner' : 'bg-white/10'}
                group-hover:bg-white/20
              `}
            >
              <Icon className="text-lg" />
            </motion.div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-display text-sm flex-1 whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 