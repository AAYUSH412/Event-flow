"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { eventService } from "@/features/common/services";

// Components
import EventsHeader from "@/features/admin/components/EventsHeader";
import EventsFilters from "@/features/admin/components/EventsFilters";
import EventsTable from "@/features/admin/components/EventsTable";
import EventsPagination from "@/features/admin/components/EventsPagination";

// Types
interface EventType {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  bannerImage?: string;
  organizerId: {
    _id: string;
    name: string;
    email: string;
  };
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

// Filter state type
interface FilterState {
  search: string;
  department: string;
  category: string;
  status: 'all' | 'upcoming' | 'past';
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: "",
    category: "",
    status: "all"
  });

  // Available departments and categories for filters
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

  // Fetch events with pagination and filters
  const fetchEvents = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const params: Record<string, string | number> = {
        page,
        limit: 10
      };

      // Add filters if available
      if (filters.search) params.search = filters.search;
      if (filters.department) params.department = filters.department;
      if (filters.category) params.category = filters.category;

      // Handle status filtering in frontend since backend might not support it
      const response = await eventService.getAllEvents(params);
      
      let filteredEvents = response.events;
      
      // Filter by status if needed
      if (filters.status !== 'all') {
        const now = new Date();
        if (filters.status === 'upcoming') {
          filteredEvents = filteredEvents.filter(
            (event: EventType) => new Date(event.startDateTime) > now
          );
        } else if (filters.status === 'past') {
          filteredEvents = filteredEvents.filter(
            (event: EventType) => new Date(event.endDateTime) < now
          );
        }
      }
      
      setEvents(filteredEvents);
      setTotalEvents(response.pagination.total);
      setTotalPages(response.pagination.pages);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error("Error fetching events:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Handle filter changes
  const handleFilterChange = (name: keyof FilterState, value: string | 'all' | 'upcoming' | 'past') => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    fetchEvents(1); // Reset to first page when applying filters
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      department: "",
      category: "",
      status: "all"
    });
    fetchEvents(1);
  };

  // Delete event
  const handleDeleteEvent = async (id: string) => {
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(id);
      toast.success("Event deleted successfully");
      fetchEvents(currentPage); // Refresh the current page
    } catch (error: unknown) {
      console.error("Error deleting event:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate to event details
  const viewEventDetails = (id: string) => {
    router.push(`/dashboard/admin/events/${id}`);
  };

  return (
    <div className="space-y-6 p-6 pb-16 max-w-7xl mx-auto">
      <EventsHeader totalEvents={totalEvents} />
      
      <EventsFilters
        filters={filters}
        departments={departments}
        categories={categories}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />
      
      <EventsTable
        events={events}
        isLoading={isLoading}
        onDeleteEvent={handleDeleteEvent}
        onViewEventDetails={viewEventDetails}
        isDeleting={isDeleting}
      />
      
      {totalPages > 1 && !isLoading && events.length > 0 && (
        <EventsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalEvents={totalEvents}
          onPageChange={fetchEvents}
        />
      )}
    </div>
  );
}
