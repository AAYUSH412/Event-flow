"use client";

import { useState, useEffect } from "react";
import { eventService, Event as EventType } from "@/features/common/services";
import { FilterState } from "@/features/events/components/EventFilters";

// Components
import EventHero from "@/features/events/components/EventHero";
import EventFilters from "@/features/events/components/EventFilters";
import EventList from "@/features/events/components/EventList";
import EventPagination from "@/features/events/components/EventPagination";

export default function EventsPage() {
  // States
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  // Available filter options
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Arts"
  ];

  const categories = [
    "Workshop",
    "Seminar",
    "Conference",
    "Competition",
    "Cultural",
    "Sports",
    "Technology",
    "Hackathon",
    "Career Fair",
    "Other"
  ];

  // Fetch events based on filters
  const fetchEvents = async (page = 1) => {
    setIsLoading(true);
    try {
      // Convert filters to API parameters
      const params: Record<string, any> = {
        search: filters.search,
        department: filters.department,
        category: filters.category,
        startDate: filters.startDate,
        endDate: filters.endDate,
        page,
        limit: 9,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });
      
      const response = await eventService.getAllEvents(params);
      setEvents(response.events);
      setTotalEvents(response.pagination.total);
      setTotalPages(response.pagination.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Event handlers
  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const applyFilters = () => {
    fetchEvents(1); // Reset to first page when applying new filters
    if (isMobile) {
      setShowFilters(false); // Close filter sidebar on mobile after applying
    }
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      department: "",
      category: "",
      startDate: "",
      endDate: "",
    });
    fetchEvents(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageChange = (page: number) => {
    fetchEvents(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section with Search */}
      <EventHero 
        searchQuery={filters.search}
        onSearchChange={handleSearchChange}
      />
      
      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl -mt-8">
        <div className="flex flex-col md:flex-row gap-8 pt-16">
          {/* Filter Section */}
          <div className="md:w-80">
            <EventFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
              departments={departments}
              categories={categories}
              showFilters={showFilters}
              onToggleFilters={toggleFilters}
              className="sticky top-24"
            />
          </div>
          
          {/* Event Listing */}
          <div className="flex-1">
            <EventList 
              events={events} 
              isLoading={isLoading}
              totalEvents={totalEvents}
              onResetFilters={resetFilters}
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <EventPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}