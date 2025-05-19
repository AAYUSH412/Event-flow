"use client";

const EventSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse border border-gray-100 dark:border-gray-700">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content placeholders */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
        
        {/* Description */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        
        {/* Event details */}
        <div className="py-2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/5"></div>
        </div>
        
        {/* Footer */}
        <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;
