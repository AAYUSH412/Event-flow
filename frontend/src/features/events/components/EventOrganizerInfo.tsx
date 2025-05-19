"use client";

import { User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface EventOrganizerInfoProps {
  organizerName?: string;
  startDateTime: string;
  endDateTime: string;
  formatDate: (date: string) => string;
  isSameDay: (date1: string, date2: string) => boolean;
}

const EventOrganizerInfo = ({ 
  organizerName = "Event Organizer",
  startDateTime,
  endDateTime,
  formatDate,
  isSameDay
}: EventOrganizerInfoProps) => {
  return (
    <motion.div 
      className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-600 mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center">
        <div className="bg-indigo-100 p-1.5 rounded-full mr-2">
          <User className="h-4 w-4 text-indigo-600" />
        </div>
        <span>
          Organized by {organizerName}
        </span>
      </div>
      <div className="flex items-center">
        <div className="bg-indigo-100 p-1.5 rounded-full mr-2">
          <Calendar className="h-4 w-4 text-indigo-600" />
        </div>
        <span>
          {formatDate(startDateTime)}
          {!isSameDay(startDateTime, endDateTime) && 
            ` - ${formatDate(endDateTime)}`}
        </span>
      </div>
    </motion.div>
  );
};

export default EventOrganizerInfo;
