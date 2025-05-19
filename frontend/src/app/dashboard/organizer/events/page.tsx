"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { eventService, Event as EventType } from "@/features/common/services";
import { motion, AnimatePresence } from "framer-motion";

// Import our modernized components
import {
  EventsHeader,
  EventsFilter,
  EventsGrid,
  EventsLoader,
  EmptyEventState,
  ModernDeleteModal as DeleteEventModal,
  ModernBackground
} from "@/features/organizer/components/events";

export default function OrganizerEventsPage() {
  // Router might be used for programmatic navigation
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  
  // For delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await eventService.getMyEvents();
      setEvents(response.events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("");
    setSortBy("date-desc");
  };

  const handleDeleteClick = (eventId: string) => {
    const event = events.find(e => e._id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
    setSelectedEventId(eventId);
    setDeleteModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return;
    
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(selectedEventId);
      toast.success("Event deleted successfully");
      
      // Remove the deleted event from state
      setEvents(events.filter(event => event._id !== selectedEventId));
      
      // Close modal
      setDeleteModalOpen(false);
      setSelectedEventId(null);
      setSelectedEvent(null);
    } catch (error: unknown) {
      console.error("Delete event error:", error);
      let errorMessage = "Failed to delete event";
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 'data' in error.response && 
          error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data &&
          typeof error.response.data.message === 'string') {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter events based on search term, status and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    let matchesStatus = true;
    if (statusFilter === "upcoming") {
      matchesStatus = new Date(event.startDateTime) > new Date();
    } else if (statusFilter === "ongoing") {
      const now = new Date();
      matchesStatus = new Date(event.startDateTime) <= now && new Date(event.endDateTime) >= now;
    } else if (statusFilter === "past") {
      matchesStatus = new Date(event.endDateTime) < new Date();
    }

    // Category filter
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort filtered events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date-asc") {
      return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
    } else if (sortBy === "date-desc") {
      return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime(); 
    } else if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // We can get unique categories for filter dropdown if needed
  // [...new Set(events.map(event => event.category).filter(Boolean))];

  // Check if any filter is active
  const isFiltered = searchTerm !== "" || statusFilter !== "all" || categoryFilter !== "";

  return (
    <ModernBackground>
      <div className="space-y-8">
        <EventsHeader eventsCount={events.length} />
        
        <motion.div 
          className="my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <EventsFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleCategoryFilterChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EventsLoader />
            </motion.div>
          ) : sortedEvents.length > 0 ? (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <EventsGrid 
                events={sortedEvents} 
                onDeleteClick={handleDeleteClick}
                isFiltered={isFiltered} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <EmptyEventState hasFilters={isFiltered} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <DeleteEventModal
        isOpen={deleteModalOpen}
        isDeleting={isDeleting}
        eventTitle={selectedEvent?.title}
        onCancel={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteEvent}
      />
    </ModernBackground>
  );
}
