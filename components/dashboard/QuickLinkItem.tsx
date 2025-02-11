"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuickLinkProps {
  link: {
    title: string;
    description: string;
    href: string;
    gradient: string;
  };
  icon: ReactNode;
  index: number;
}

export default function QuickLinkItem({ link, icon, index }: QuickLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={link.href}>
        <div className={`p-4 md:p-6 bg-gradient-to-br ${link.gradient} hover:shadow-lg transition-all duration-300 h-full`}>
          <div className="text-white text-xl md:text-2xl mb-3 md:mb-4">
            {icon}
          </div>
          <h3 className="text-white font-bold text-sm md:text-base mb-1 md:mb-2">{link.title}</h3>
          <p className="text-white/80 text-xs md:text-sm">{link.description}</p>
        </div>
      </Link>
    </motion.div>
  );
} 