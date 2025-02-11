"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFileAlt, FaGraduationCap } from "react-icons/fa";
import { format } from "date-fns";
import { RecentUpdate } from "@/app/actions/get-recent-updates";

export default function UpdateItem({ update, index }: { update: RecentUpdate; index: number }) {
  return (
    <motion.div
      key={update.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-3.5 bg-[#083c74]/5 hover:bg-[#083c74]/10 transition-all duration-200 border border-[#083c74]/10 hover:border-[#083c74]/20 group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#083c74]/10 text-[#083c74]">
          {update.type === 'Publication' ? <FaFileAlt className="text-sm" /> :
           update.type === 'Event' ? <FaCalendarAlt className="text-sm" /> :
           <FaGraduationCap className="text-sm" />}
        </div>
        <div className="space-y-0.5">
          <Link href={update.link}>
            <h3 className="text-[#083c74] font-medium text-sm group-hover:text-[#004488] transition-colors line-clamp-1">
              {update.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-xs flex items-center gap-2">
            <span className="w-1 h-1 bg-[#083c74]/30"></span>
            {format(new Date(update.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
      <span className="px-2.5 py-1 text-[10px] font-medium bg-[#083c74]/10 text-[#083c74]">
        {update.type}
      </span>
    </motion.div>
  );
} 