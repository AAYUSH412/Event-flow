"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface EventFormHeaderProps {
  title: string;
}

const EventFormHeader: React.FC<EventFormHeaderProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-indigo-100/50 p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              href="/dashboard/organizer/events"
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to events</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm">Fill in the details to create a new event</p>
        </div>
        
        <Link
          href="/dashboard/organizer/events"
          className="flex-shrink-0 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md font-medium text-sm"
        >
          Cancel
        </Link>
      </div>
    </motion.div>
  );
};

export default EventFormHeader;
