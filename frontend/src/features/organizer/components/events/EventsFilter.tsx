"use client";

import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch,
  statusFilter = 'all',
  onStatusFilterChange = () => {},
  categoryFilter = '',
  onCategoryFilterChange = () => {},
  sortBy = 'date-desc',
  onSortChange = () => {}
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden backdrop-blur-sm"
      >
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
          {/* Search field with glass morphism style */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            
            {searchTerm && (
              <button
                onClick={onClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Filter toggle button with animated indicators */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 ${
              showFilters 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50 shadow-inner' 
                : 'border-gray-200 text-gray-700 hover:bg-gray-50/80'
            }`}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${showFilters ? 'text-indigo-600' : ''}`} />
            <span className="font-medium">Filters</span>
            {showFilters ? (
              <ChevronUp className="ml-1 h-4 w-4 text-indigo-600" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Filter panel - expandable */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-5 border-t border-gray-100 bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Status
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => onStatusFilterChange(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <option value="all">All Events</option>
                      <option value="upcoming">Upcoming Events</option>
                      <option value="ongoing">Currently Active</option>
                      <option value="past">Past Events</option>
                    </select>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Category
                    </label>
                    <select
                      id="category-filter"
                      value={categoryFilter}
                      onChange={(e) => onCategoryFilterChange(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <option value="">All Categories</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Conference">Conference</option>
                      <option value="Competition">Competition</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">
                      Sort Events By
                    </label>
                    <select
                      id="sort-filter"
                      value={sortBy}
                      onChange={(e) => onSortChange(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <option value="date-desc">Date (Newest first)</option>
                      <option value="date-asc">Date (Oldest first)</option>
                      <option value="title-asc">Title (A-Z)</option>
                      <option value="title-desc">Title (Z-A)</option>
                    </select>
                  </div>
                </div>
                
                {/* Reset button */}
                {(searchTerm !== "" || statusFilter !== "all" || categoryFilter !== "") && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={onClearSearch}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EventsFilter;
