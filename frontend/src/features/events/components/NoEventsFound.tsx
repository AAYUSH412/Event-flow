"use client";

import { Calendar, X } from "lucide-react";

interface NoEventsFoundProps {
  onResetFilters: () => void;
}

export const NoEventsFound = ({ onResetFilters }: NoEventsFoundProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform hover:scale-105 duration-300">
        <Calendar className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">No events found</h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        We couldn't find any events matching your criteria. 
        Try adjusting your filters or check back later for new events.
      </p>
      
      <button
        onClick={onResetFilters}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        aria-label="Clear all filters"
      >
        <X className="h-4 w-4 mr-2" />
        Clear all filters
      </button>
    </div>
  );
};

export default NoEventsFound;
