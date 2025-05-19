"use client";

import { useState } from "react";
import { Event as EventType } from "@/features/common/services";
import EventCard from "./EventCard";
import NoEventsFound from "./NoEventsFound";
import EventSkeleton from "./EventSkeleton";

interface EventListProps {
  events: EventType[];
  isLoading: boolean;
  totalEvents: number;
  onResetFilters: () => void;
}

export const EventList = ({ events, isLoading, totalEvents, onResetFilters }: EventListProps) => {
  const [sortOrder, setSortOrder] = useState<string>("upcoming");

  // Sorting options for events
  const sortOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "popular", label: "Most Popular" },
    { value: "recent", label: "Recently Added" },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    // In a real app, we might want to pass this to the parent to handle sorting
  };

  return (
    <div className="flex-1">
      {/* Results summary and sort options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          {isLoading ? "Loading events..." : `Showing ${events.length} of ${totalEvents} events`}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">Sort by:</span>
          <select 
            className="border border-gray-300 dark:border-gray-600 rounded-md py-1.5 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            value={sortOrder}
            onChange={handleSortChange}
            aria-label="Sort events"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {isLoading ? (
        // Loading skeleton grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      ) : events.length > 0 ? (
        // Grid of events
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        // Empty state
        <NoEventsFound onResetFilters={onResetFilters} />
      )}
    </div>
  );
};

export default EventList;
