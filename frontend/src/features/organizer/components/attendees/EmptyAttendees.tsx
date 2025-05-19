"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface EmptyAttendeesProps {
  hasFilters: boolean;
}

const EmptyAttendees: React.FC<EmptyAttendeesProps> = ({ hasFilters }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-indigo-100/50 px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center"
        >
          <Users className="h-10 w-10 text-indigo-600" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">No attendees found</h3>
        
        <p className="text-gray-500 mb-6">
          {hasFilters
            ? "No attendees match your current search or filter criteria. Try adjusting your filters or search for different terms."
            : "You don't have any attendees yet. Create an event and share it with potential participants to start tracking attendance."}
        </p>
        
        {hasFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => window.location.reload()}
          >
            Clear filters
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyAttendees;
