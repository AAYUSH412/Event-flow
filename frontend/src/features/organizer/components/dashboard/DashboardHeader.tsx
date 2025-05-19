"use client";

import React from 'react';
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-indigo-100/50 p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h1>
          <p className="text-gray-600">Manage your events and attendees from this dashboard.</p>
        </div>
        <Link 
          href="/dashboard/organizer/events/create"
          className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Event
        </Link>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
