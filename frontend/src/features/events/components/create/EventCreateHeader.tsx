"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CalendarPlus } from "lucide-react";

const EventCreateHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link 
              href="/events"
              className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Events</span>
            </Link>
          </div>
          <div className="flex items-center">
            <CalendarPlus className="h-6 w-6 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Fill out the form below to create your event. Fields marked with * are required.
          </p>
        </div>
        
        <Link
          href="/dashboard/events"
          className="flex-shrink-0 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-all hover:shadow-md font-medium text-sm"
        >
          Cancel
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCreateHeader;
