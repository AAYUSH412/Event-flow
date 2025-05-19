"use client";

import React from 'react';
import { motion } from "framer-motion";

const DashboardLoader: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-t-2 border-b-2 border-indigo-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-indigo-200 animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
      <p className="mt-6 text-gray-600 font-medium">Loading your dashboard...</p>
    </motion.div>
  );
};

export default DashboardLoader;
