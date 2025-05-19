import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { eventService, registrationService, Event as EventType } from "@/features/common/services";

interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  status: string;
  registrationDate: string;
  // Add other fields as needed
}

interface EventStats {
  registered: number;
  waitlisted: number;
  cancelled: number;
  total: number;
}

export const useOrganizerEventDetail = (id: string) => {
  const router = useRouter();
  const [event, setEvent] = useState<EventType | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [regStats, setRegStats] = useState<EventStats>({
    registered: 0,
    waitlisted: 0,
    cancelled: 0,
    total: 0
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch event details
        const eventResponse = await eventService.getEventById(id);
        setEvent(eventResponse.event);
        
        // Fetch registrations for the event
        const registrationsResponse = await registrationService.getEventRegistrations(id);
        setRegistrations(registrationsResponse.registrations);
        setRegStats(registrationsResponse.counts);
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(id);
      toast.success("Event deleted successfully");
      router.push("/dashboard/organizer/events");
    } catch (error) {
      console.error("Delete event error:", error);
      const apiError = error as any;
      const errorMessage = apiError.response?.data?.message || apiError.message || "Failed to delete event. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const isEventPast = () => {
    if (!event) return false;
    return new Date(event.endDateTime) < new Date();
  };
  
  const isEventStarted = () => {
    if (!event) return false;
    return new Date(event.startDateTime) <= new Date();
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return {
    event,
    registrations,
    isLoading,
    isDeleteModalOpen,
    isDeleting,
    regStats,
    handleDeleteEvent,
    isEventPast,
    isEventStarted,
    openDeleteModal,
    closeDeleteModal
  };
};
