"use client";

import { motion } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
}

export default function NotificationsDropdown({ notifications }: NotificationsDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-80 bg-white  shadow-xl"
    >
      <div className="p-4">
        <h3 className="text-lg font-display font-bold text-gray-900">Notifications</h3>
        <div className="mt-4 space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400">{notification.time}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 