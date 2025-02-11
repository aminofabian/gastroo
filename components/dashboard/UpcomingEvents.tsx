"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaMedal, FaClock } from "react-icons/fa";
import { format, isSameMonth, differenceInDays } from "date-fns";

interface Event {
  title: string;
  date: string;
  location: string;
  points: number;
  startDate?: Date;
}

const upcomingEvents: Event[] = [
  {
    title: "Annual Gastroenterology Conference",
    date: "Mar 15-17, 2024",
    location: "Nairobi, Kenya",
    points: 20,
    startDate: new Date(2024, 2, 15), // March 15, 2024
  },
  {
    title: "Endoscopy Workshop",
    date: "Apr 5, 2024",
    location: "Mombasa, Kenya",
    points: 10,
    startDate: new Date(2024, 3, 5), // April 5, 2024
  },
  {
    title: "Research Symposium",
    date: "Apr 20, 2024",
    location: "Virtual",
    points: 8,
    startDate: new Date(2024, 3, 20), // April 20, 2024
  },
];

function getTimeStatus(startDate: Date) {
  const now = new Date();
  const daysUntil = differenceInDays(startDate, now);
  
  if (daysUntil <= 7) {
    return {
      text: "Coming Soon",
      color: "bg-yellow-500",
    };
  } else if (isSameMonth(startDate, now)) {
    return {
      text: "This Month",
      color: "bg-green-500",
    };
  } else {
    return {
      text: "Upcoming",
      color: "bg-emerald-500",
    };
  }
}

export default function UpcomingEvents() {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-gray-900">Upcoming Events</h2>
        <button className="text-sm text-[#003366] hover:text-[#004488] font-medium">
          View All Events
        </button>
      </div>

      <div className="bg-white  shadow-sm overflow-hidden">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={false}
            whileHover={{ backgroundColor: "rgb(249, 250, 251)" }}
            className="p-6 transition-all cursor-pointer border-b last:border-b-0 border-gray-100 group"
          >
            {/* Time Status Badge */}
            {event.startDate && (
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-2 w-2  ${getTimeStatus(event.startDate).color}`} />
                <span className="text-xs font-medium text-gray-500">
                  {getTimeStatus(event.startDate).text}
                </span>
              </div>
            )}

            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="font-medium text-gray-900 group-hover:text-[#003366] transition-colors truncate">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Points Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-end gap-1"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5  bg-emerald-50 text-emerald-600 font-medium">
                  <FaMedal className="text-emerald-500" />
                  <span className="text-sm">{event.points} Points</span>
                </div>
                {event.startDate && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <FaClock className="text-gray-300" />
                    <span>
                      {differenceInDays(event.startDate, new Date())} days away
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Progress Bar (more visible on hover) */}
            <div className="mt-4 relative h-1 bg-gray-100  overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`absolute h-full ${getTimeStatus(event.startDate || new Date()).color} opacity-20 group-hover:opacity-40 `}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 