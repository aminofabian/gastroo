"use client";

import { motion } from "framer-motion";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string;
  image: string | null;
}

interface UserMenuDropdownProps {
  user?: User;
}

export default function UserMenuDropdown({ user }: UserMenuDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-56 bg-white shadow-xl"
    >
      <div className="p-2">
        {user && (
          <div className="px-3 py-2">
            <div className="font-medium text-sm text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        )}
        
        <div className="border-t border-gray-100 my-2" />
        
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaUser className="text-gray-400" />
          Profile Settings
        </Link>
        
        <Link
          href="/account"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaCog className="text-gray-400" />
          Account Settings
        </Link>
        
        <div className="border-t border-gray-100 my-2" />
        
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt className="text-red-400" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
} 