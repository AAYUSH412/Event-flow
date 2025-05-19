"use client";

import { motion } from "framer-motion";
import { Tag, Users, LineChart } from "lucide-react";

interface EventTabsProps {
  activeTab: 'details' | 'attendees' | 'analytics';
  setActiveTab: (tab: 'details' | 'attendees' | 'analytics') => void;
}

const EventTabs = ({ activeTab, setActiveTab }: EventTabsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="flex overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex items-center px-6 py-3.5 text-sm font-medium ${
            activeTab === 'details' 
            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600 dark:after:from-indigo-400 dark:after:to-purple-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
          }`}
        >
          <Tag className="h-4 w-4 mr-2" />
          Event Details
        </button>
        <button
          onClick={() => setActiveTab('attendees')}
          className={`flex items-center px-6 py-3.5 text-sm font-medium ${
            activeTab === 'attendees' 
            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600 dark:after:from-indigo-400 dark:after:to-purple-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
          }`}
        >
          <Users className="h-4 w-4 mr-2" />
          Attendees
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center px-6 py-3.5 text-sm font-medium ${
            activeTab === 'analytics' 
            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600 dark:after:from-indigo-400 dark:after:to-purple-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
          }`}
        >
          <LineChart className="h-4 w-4 mr-2" />
          Analytics
        </button>
      </div>
    </motion.div>
  );
};

export default EventTabs;
