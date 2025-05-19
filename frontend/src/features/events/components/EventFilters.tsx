"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

export interface FilterState {
  search: string;
  department: string;
  category: string;
  startDate: string;
  endDate: string;
}

interface EventFiltersProps {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  departments: string[];
  categories: string[];
  showFilters: boolean;
  onToggleFilters: () => void;
  className?: string;
}

export const EventFilters = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  departments,
  categories,
  showFilters,
  onToggleFilters,
  className = "",
}: EventFiltersProps) => {
  // State for mobile accordion sections
  const [openSections, setOpenSections] = useState({
    date: true,
    department: true,
    category: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={onToggleFilters}
        className="md:hidden flex items-center space-x-2 bg-white dark:bg-gray-800 py-2.5 px-4 rounded-lg shadow-sm mb-4 w-full border border-gray-200 dark:border-gray-700"
      >
        <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <span className="text-gray-800 dark:text-gray-200 font-medium flex-grow text-left">
          {showFilters ? "Hide Filters" : "Show Filters"}
        </span>
        {showFilters ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {/* Filter sidebar */}
      <div 
        className={`${
          showFilters ? 'block' : 'hidden'
        } md:block w-full md:w-72 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 h-fit border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
          <button 
            onClick={onResetFilters}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Reset All
          </button>
        </div>
        
        {/* Date Filter - Mobile Accordion */}
        <div className="mb-6">
          <button 
            className="md:hidden w-full flex justify-between items-center text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
            onClick={() => toggleSection('date')}
          >
            <span>Date Range</span>
            {openSections.date ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {/* Desktop heading */}
          <h3 className="hidden md:block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</h3>
          
          <div className={`space-y-3 ${openSections.date || 'md:block hidden'}`}>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => onFilterChange("startDate", e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => onFilterChange("endDate", e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Department Filter - Mobile Accordion */}
        <div className="mb-6">
          <button 
            className="md:hidden w-full flex justify-between items-center text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
            onClick={() => toggleSection('department')}
          >
            <span>Department</span>
            {openSections.department ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {/* Desktop heading */}
          <h3 className="hidden md:block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Department</h3>
          
          <div className={openSections.department ? 'block' : 'md:block hidden'}>
            <select
              value={filters.department}
              onChange={(e) => onFilterChange("department", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Category Filter - Mobile Accordion */}
        <div className="mb-6">
          <button 
            className="md:hidden w-full flex justify-between items-center text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
            onClick={() => toggleSection('category')}
          >
            <span>Category</span>
            {openSections.category ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {/* Desktop heading */}
          <h3 className="hidden md:block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Category</h3>
          
          <div className={openSections.category ? 'block' : 'md:block hidden'}>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Apply Filters Button */}
        <button
          onClick={onApplyFilters}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default EventFilters;
