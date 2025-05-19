"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const EventPagination = ({ currentPage, totalPages, onPageChange }: EventPaginationProps) => {
  // Generate page numbers array, but limit to show a reasonable amount
  const getPageNumbers = () => {
    // If we have 7 or fewer pages, show all of them
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Otherwise, show first, last, current, and some surrounding pages
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis or page 2
    if (currentPage > 3) {
      pages.push(-1); // -1 will render as ellipsis
    } else if (currentPage <= 3) {
      pages.push(2);
    }
    
    // Pages around current
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage <= 3) {
      const startPage = Math.min(3, totalPages - 2);
      if (startPage > 2) pages.push(startPage);
    } else if (currentPage >= totalPages - 2) {
      const endPage = Math.max(totalPages - 2, 3);
      if (endPage < totalPages - 1) pages.push(endPage);
    }
    
    // Show ellipsis or second-to-last page
    if (currentPage < totalPages - 2) {
      pages.push(-2); // -2 will render as ellipsis
    } else if (currentPage >= totalPages - 2 && totalPages > 2) {
      pages.push(totalPages - 1);
    }
    
    // Always show last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-1.5 text-sm rounded-md mr-2 ${
            currentPage === 1
              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum, index) => (
            pageNum < 0 ? (
              // Render ellipsis
              <span 
                key={`ellipsis-${index}`} 
                className="px-3 py-1.5 text-gray-400 dark:text-gray-600"
              >
                &hellip;
              </span>
            ) : (
              // Render page number
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-md ${
                  currentPage === pageNum
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-1.5 text-sm rounded-md ml-2 ${
            currentPage === totalPages
              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </nav>
    </div>
  );
};

export default EventPagination;
