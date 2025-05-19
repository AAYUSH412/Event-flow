import { useState, useEffect } from "react";
import { toast } from "@/lib/toast-adapter";
import { eventService, registrationService, Event as EventType } from "@/features/common/services";

interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  status: string;
  registrationDate: string;
  // Add other fields as needed
}

export const useEventDetail = (id: string) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [regStats, setRegStats] = useState({
    registered: 0,
    waitlisted: 0,
    cancelled: 0,
    total: 0
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);

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

  return {
    event,
    isLoading,
    regStats,
    registrations,
  };
};
