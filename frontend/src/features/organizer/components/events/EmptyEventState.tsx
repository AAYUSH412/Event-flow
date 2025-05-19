"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, PlusCircle } from 'lucide-react';

interface EmptyEventStateProps {
  hasFilters: boolean;
}

const EmptyEventState: React.FC<EmptyEventStateProps> = ({ hasFilters }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md border border-gray-100 p-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="h-10 w-10 text-indigo-500" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {hasFilters ? "No matching events found" : "You haven't created any events yet"}
      </h3>
      
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        {hasFilters 
          ? "Try adjusting your filters or search criteria to find what you're looking for."
          : "Create your first event and start engaging with your audience. It only takes a few minutes to get started."}
      </p>
      
      {hasFilters ? (
        <button 
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
          onClick={() => window.location.reload()}
        >
          Clear All Filters
        </button>
      ) : (
        <Link
          href="/dashboard/organizer/events/create"
          className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Your First Event
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyEventState;
