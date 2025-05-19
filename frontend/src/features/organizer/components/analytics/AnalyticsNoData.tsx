"use client";

import { motion } from "framer-motion";

interface AnalyticsNoDataProps {
  message: string;
}

export const AnalyticsNoData = ({ message = "No data available for the selected timeframe" }: AnalyticsNoDataProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-md border border-gray-100"
    >
      <div className="w-24 h-24 mb-6 text-gray-300">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
    </motion.div>
  );
};

export default AnalyticsNoData;
