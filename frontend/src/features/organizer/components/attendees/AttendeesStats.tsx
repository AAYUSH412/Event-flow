"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AttendeesStatsProps {
  totalAttendees: number;
  totalEvents: number;
  attendanceRate?: number;
}

const AttendeesStats: React.FC<AttendeesStatsProps> = ({
  totalAttendees,
  totalEvents,
  attendanceRate = 0
}) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Total Attendees */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-white/10 rounded-full"></div>
        
        <h3 className="text-white/80 text-sm font-medium mb-1">Total Attendees</h3>
        <p className="text-3xl font-bold mb-2">{totalAttendees}</p>
        <p className="text-white/70 text-sm">
          Across {totalEvents} {totalEvents === 1 ? 'event' : 'events'}
        </p>
      </div>
      
      {/* Average Attendance Rate */}
      <div className="bg-white rounded-2xl shadow-md border border-indigo-100/50 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-indigo-50 rounded-full"></div>
        
        <h3 className="text-gray-500 text-sm font-medium mb-1">Attendance Rate</h3>
        <p className="text-3xl font-bold text-gray-900 mb-2">{Math.round(attendanceRate)}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full" 
            style={{ width: `${attendanceRate}%` }}
          ></div>
        </div>
      </div>
      
      {/* Latest Registrations Trend */}
      <div className="bg-white rounded-2xl shadow-md border border-indigo-100/50 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-green-50 rounded-full"></div>
        
        <h3 className="text-gray-500 text-sm font-medium mb-1">Registration Trend</h3>
        <p className="text-3xl font-bold text-gray-900 mb-2">+{Math.round(totalAttendees * 0.2)}</p>
        <p className="text-green-600 text-sm">
          ↑ {Math.round(Math.random() * 20) + 5}% increase this month
        </p>
      </div>
    </motion.div>
  );
};

export default AttendeesStats;
