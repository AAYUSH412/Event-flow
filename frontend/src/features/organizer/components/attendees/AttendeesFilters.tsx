"use client";

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventType {
  _id: string;
  title: string;
}

interface AttendeesFiltersProps {
  searchTerm: string;
  selectedEvent: string;
  events: EventType[];
  onSearchChange: (term: string) => void;
  onEventChange: (eventId: string) => void;
}

const AttendeesFilters: React.FC<AttendeesFiltersProps> = ({
  searchTerm,
  selectedEvent,
  events,
  onSearchChange,
  onEventChange
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Attendees
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Event Filter */}
        <div className="relative">
          <label htmlFor="event-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Event
          </label>
          <div className="relative">
            <select
              id="event-filter"
              value={selectedEvent}
              onChange={(e) => onEventChange(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 appearance-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200"
            >
              <option value="">All Events</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendeesFilters;
