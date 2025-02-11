"use client";

import { motion } from "framer-motion";
import { FaLayerGroup } from "react-icons/fa";
import { IconType } from "react-icons";
import SidebarMenuItem from "./SidebarMenuItem";

interface MenuItem {
  icon: IconType;
  label: string;
  href: string;
}

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItem[];
  isCollapsed: boolean;
  hoveredItem: string | null;
  currentPath: string;
  onHoverStart: (href: string) => void;
  onHoverEnd: () => void;
}

export default function SidebarMenuGroup({
  title,
  items,
  isCollapsed,
  hoveredItem,
  currentPath,
  onHoverStart,
  onHoverEnd,
}: SidebarMenuGroupProps) {
  return (
    <div className="space-y-2">
      {!isCollapsed && (
        <div className="px-4 mb-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <FaLayerGroup className="text-white/40 text-xs" />
            <span className="text-xs font-bold tracking-wider text-white/40 uppercase">
              {title}
            </span>
          </motion.div>
        </div>
      )}
      
      <motion.div
        initial={false}
        animate={{ height: "auto" }}
      >
        {items.map((item) => (
          <SidebarMenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.href}
            isCollapsed={isCollapsed}
            hoveredItem={hoveredItem}
            onHoverStart={() => onHoverStart(item.href)}
            onHoverEnd={onHoverEnd}
          />
        ))}
      </motion.div>
    </div>
  );
} 