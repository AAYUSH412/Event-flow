import { useState, useEffect } from "react";
import { eventService, registrationService } from "@/features/common/services";

export const useStudentDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch upcoming events and user registrations in parallel
        const [eventsResponse, registrationsResponse] = await Promise.all([
          eventService.getAllEvents({ limit: 5 }),
          registrationService.getUserRegistrations()
        ]);
        
        setUpcomingEvents(eventsResponse.events);
        setRegistrations(registrationsResponse.registrations);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    upcomingEvents,
    registrations,
    isLoading
  };
};
