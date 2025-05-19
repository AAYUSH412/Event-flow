"use client";

import React from 'react';
import { motion } from 'framer-motion';

const EventsLoader: React.FC = () => {
  // Create an array of 6 items for skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonCards.map((index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Image skeleton */}
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          
          {/* Content skeleton */}
          <div className="p-5 flex-grow">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-4 w-3/4"></div>
            
            {/* Event details skeleton */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/3"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-2/5"></div>
              </div>
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 animate-pulse rounded-md w-full"></div>
              <div className="h-3 bg-gray-200 animate-pulse rounded-md w-5/6"></div>
            </div>
          </div>
          
          {/* Action buttons skeleton */}
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/6"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventsLoader;
