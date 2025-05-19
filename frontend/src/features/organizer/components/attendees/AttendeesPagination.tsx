"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AttendeesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AttendeesPagination: React.FC<AttendeesPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Logic to display a reasonable number of page buttons
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    let startPage = 1;
    let endPage = totalPages;
    
    if (totalPages > maxPagesToShow) {
      // Always include first page
      pages.push(1);
      
      // Calculate the range around current page
      const middlePagesCount = maxPagesToShow - 2; // Minus first and last page
      startPage = Math.max(2, currentPage - Math.floor(middlePagesCount / 2));
      endPage = Math.min(totalPages - 1, startPage + middlePagesCount - 1);
      
      // Adjust if we're close to the beginning
      if (startPage === 2) {
        pages.push(2);
      } else if (startPage > 2) {
        pages.push(-1); // Add ellipsis indicator
      }
      
      // Add middle pages
      for (let i = Math.max(3, startPage); i <= Math.min(totalPages - 2, endPage); i++) {
        pages.push(i);
      }
      
      // Adjust if we're close to the end
      if (endPage === totalPages - 1) {
        pages.push(totalPages - 1);
      } else if (endPage < totalPages - 1) {
        pages.push(-2); // Add ellipsis indicator
      }
      
      // Always include last page
      pages.push(totalPages);
      
      return pages;
    }
    
    // If we have a small number of pages, just show all of them
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <motion.div 
      className="bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="text-sm text-gray-700">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
      
      <div className="inline-flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2.5 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
        >
          Previous
        </button>
        
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === -1 || page === -2 ? (
              <span className="relative inline-flex items-center px-2.5 py-1.5">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 border"
                    : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2.5 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default AttendeesPagination;
