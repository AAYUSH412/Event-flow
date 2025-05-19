"use client";

import React from "react";
import { Search, Filter, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface RegistrationsFilterProps {
  statusFilter: string;
  searchTerm: string;
  onFilterChange: (status: string) => void;
  onSearchChange: (term: string) => void;
}

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Registered", value: "REGISTERED" },
  { label: "Waitlisted", value: "WAITLISTED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const RegistrationsFilter: React.FC<RegistrationsFilterProps> = ({
  statusFilter,
  searchTerm,
  onFilterChange,
  onSearchChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div 
      className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search event name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2.5 text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full md:w-56 px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-indigo-600" />
              <span>Status: {statusOptions.find(option => option.value === statusFilter)?.label || 'All'}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="py-1">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onFilterChange(option.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm flex items-center justify-between hover:bg-indigo-50 ${
                        statusFilter === option.value ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                      }`}
                    >
                      <span>{option.label}</span>
                      {statusFilter === option.value && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationsFilter;
