"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  onPageChange: (page: number) => void;
}

export default function EventsPagination({
  currentPage,
  totalPages,
  totalEvents,
  onPageChange,
}: EventsPaginationProps) {
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Show max 5 page numbers
    const maxPages = 5;
    
    if (totalPages <= maxPages) {
      // If total pages is less than maxPages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first and last page
      // And include pages around current page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPages - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }
      
      // Add first page
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('ellipsis-start');
        }
      }
      
      // Add pages around current
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }
      
      // Add last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('ellipsis-end');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(currentPage * 10, totalEvents)}
        </span>{' '}
        of <span className="font-medium">{totalEvents}</span> events
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map((page, i) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <Button 
                key={`ellipsis-${i}`} 
                variant="ghost" 
                disabled 
                className="cursor-default"
              >
                …
              </Button>
            );
          }
          
          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => onPageChange(Number(page))}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
