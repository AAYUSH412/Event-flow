"use client";

import React from 'react';
import { Download, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface AttendeesHeaderProps {
  totalAttendees: number;
  onExport: () => void;
  isExporting?: boolean;
}

const AttendeesHeader: React.FC<AttendeesHeaderProps> = ({ totalAttendees, onExport, isExporting = false }) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-1">
          Attendees Management
        </h1>
        <p className="text-gray-500">
          Manage and track {totalAttendees} {totalAttendees === 1 ? 'attendee' : 'attendees'} across your events
        </p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onExport}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 transition-all duration-200"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export CSV'}
      </motion.button>
    </motion.div>
  );
};

export default AttendeesHeader;
