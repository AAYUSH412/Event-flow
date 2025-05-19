"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";

interface AnalyticsHeaderProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

export const AnalyticsHeader = ({ timeframe, setTimeframe }: AnalyticsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div className="flex items-center">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl mr-4">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Event Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Track your event performance and engagement metrics
          </p>
        </div>
      </div>
      
      <div className="relative group">
        <div className="flex items-center gap-2 bg-white p-2 pl-4 pr-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-indigo-300 transition-colors">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {timeframe === "last3months" && "Last 3 Months"}
            {timeframe === "last6months" && "Last 6 Months"}
            {timeframe === "lastyear" && "Last Year"}
            {timeframe === "alltime" && "All Time"}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
        
        {/* Dropdown */}
        <div className="absolute right-0 mt-1 w-40 z-20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transform transition-all duration-300">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden">
            <button
              onClick={() => setTimeframe("last3months")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 ${timeframe === "last3months" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
            >
              Last 3 Months
            </button>
            <button
              onClick={() => setTimeframe("last6months")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 ${timeframe === "last6months" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setTimeframe("lastyear")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 ${timeframe === "lastyear" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
            >
              Last Year
            </button>
            <button
              onClick={() => setTimeframe("alltime")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 ${timeframe === "alltime" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsHeader;
