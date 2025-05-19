"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AttendeesLoader: React.FC = () => {
  // Skeleton rows for table
  const skeletonRows = Array.from({ length: 5 }, (_, i) => (
    <tr key={i}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="ml-4">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-1 h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2 h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-1 h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse float-right"></div>
      </td>
    </tr>
  ));

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Filter Skeleton */}
      <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse float-right"></div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skeletonRows}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Skeleton */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendeesLoader;
