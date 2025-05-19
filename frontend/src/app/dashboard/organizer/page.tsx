"use client";

import { useEffect, useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { eventService, registrationService } from "@/features/common/services";
import { useAuth } from "@/features/auth/AuthContext";

// Import our modernized components
import {
  DashboardHeader,
  DashboardStats,
  EventsTable,
  EmptyState,
  DashboardLoader,
  ModernBackground
} from "@/features/organizer/components/dashboard";

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch organizer events
        const eventsResponse = await eventService.getMyEvents();
        setMyEvents(eventsResponse.events);
        
        // Calculate total attendees across all events
        let attendeeCount = 0;
        
        for (const event of eventsResponse.events) {
          try {
            const registrationsResponse = await registrationService.getEventRegistrations(event._id);
            attendeeCount += registrationsResponse.counts.registered;
          } catch (error) {
            console.error(`Error fetching registrations for event ${event._id}:`, error);
          }
        }
        
        setTotalAttendees(attendeeCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <ModernBackground>
        <DashboardLoader />
      </ModernBackground>
    );
  }

  return (
    <ModernBackground>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <DashboardHeader userName={user?.name || 'Organizer'} />
        
        {/* Dashboard Stats */}
        <DashboardStats eventsCount={myEvents.length} totalAttendees={totalAttendees} />
        
        {/* Events Table */}
        <EventsTable events={myEvents} />
      </div>
    </ModernBackground>
  );
}