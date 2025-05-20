"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";


// Import all event-related components
import { EventLayout } from "@/features/events/components/EventLayout";
import EventBanner from "@/features/events/components/EventBanner";
import EventStatusBadge from "@/features/events/components/EventStatusBadge";
import EventOrganizerInfo from "@/features/events/components/EventOrganizerInfo";
import EventDescription from "@/features/events/components/EventDescription";
import EventInfo from "@/features/events/components/EventInfo";
import SimilarEvents from "@/features/events/components/SimilarEvents";
import RegistrationCard from "@/features/events/components/RegistrationCard";

// Import services and utilities
import { eventService, registrationService } from "@/features/common/services";
import { formatDate } from "@/features/common/utils/dateUtils";

// Import framer-motion for animations
import { motion } from "framer-motion";

// Define our own interface for the event response object
interface OrganizerInfo {
  name: string;
  email: string;
}

interface EventDetails {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  bannerImage?: string;
  organizerId: string | OrganizerInfo;
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
  registrationCount?: number;
  createdAt: string;
  updatedAt: string;
  userRegistration?: {
    status: 'REGISTERED' | 'WAITLISTED' | 'CANCELLED' | null;
    attended: boolean;
  };
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userRegistration, setUserRegistration] = useState<{
    status: 'REGISTERED' | 'WAITLISTED' | 'CANCELLED' | null;
    attended: boolean;
  } | null>(null);
  const [similarEvents, setSimilarEvents] = useState<EventDetails[]>([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        const response = await eventService.getEventById(id as string);
        setEvent(response.event);
        
        if (response.event.userRegistration) {
          setUserRegistration(response.event.userRegistration);
        }
        
        // Fetch similar events based on category or department
        if (response.event.category || response.event.department) {
          const params: Record<string, string | number> = { limit: 3 };
          if (response.event.category) params.category = response.event.category;
          if (response.event.department) params.department = response.event.department;
          
          const similarEventsResponse = await eventService.getAllEvents(params);
          
          // Filter out the current event
          const filtered = similarEventsResponse.events.filter(
            (e: EventDetails) => e._id !== response.event._id
          );
          setSimilarEvents(filtered);
        }
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

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to register for this event");
      router.push(`/auth/login?redirect=/events/${id}`);
      return;
    }

    // Check if user is already registered
    if (userRegistration?.status === "REGISTERED") {
      // Show a subtle indication that user is already registered instead of an error
      const alreadyRegisteredElement = document.querySelector(".registration-status");
      if (alreadyRegisteredElement) {
        alreadyRegisteredElement.classList.add("animate-pulse");
        setTimeout(() => {
          alreadyRegisteredElement.classList.remove("animate-pulse");
        }, 1500);
      }
      return; // Do nothing if already registered
    }

    setIsRegistering(true);
    try {
      await registrationService.registerForEvent({ eventId: id as string });
      // Successfully registered, don't show toast notification
      
      // Refresh event data to get updated registration status
      const response = await eventService.getEventById(id as string);
      setEvent(response.event);
      setUserRegistration(response.event.userRegistration);
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to register. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    setIsRegistering(true);
    try {
      await registrationService.cancelRegistration(id as string);
      toast.success("Registration cancelled successfully");
      
      // Refresh event data
      const response = await eventService.getEventById(id as string);
      setEvent(response.event);
      setUserRegistration(response.event.userRegistration);
    } catch (error: unknown) {
      console.error("Cancellation error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to cancel registration. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  const isEventOver = () => {
    if (!event) return false;
    return new Date(event.endDateTime) < new Date();
  };

  const isSameDay = (date1: string, date2: string) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };
  
  const getEventStatus = () => {
    if (!event) return { color: "gray", text: "Unknown" };
    
    const now = new Date();
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    
    if (now > end) return { color: "gray", text: "Past" };
    if (now >= start && now <= end) return { color: "green", text: "Ongoing" };
    
    // Event is upcoming
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return { color: "orange", text: "Starting Soon" };
    return { color: "blue", text: "Upcoming" };
  };

  // Animations for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const eventStatus = getEventStatus();

  return (
    <EventLayout
      isLoading={isLoading}
      eventExists={!!event}
    >
      {event && (
        <>
          <EventStatusBadge status={eventStatus} />
          
          {/* Event Banner with Title */}
          <EventBanner 
            bannerImage={event.bannerImage} 
            title={event.title} 
            category={event.category} 
          />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <motion.div 
              className="lg:w-2/3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Organizer & Date */}
              <EventOrganizerInfo 
                organizerName={typeof event.organizerId === 'object' && event.organizerId !== null && event.organizerId.name ? event.organizerId.name : "Event Organizer"}
                startDateTime={event.startDateTime}
                endDateTime={event.endDateTime}
                formatDate={formatDate}
                isSameDay={isSameDay}
              />
              
              {/* Description */}
              <EventDescription description={event.description} />
              
              {/* Event Details */}
              <EventInfo 
                event={event} 
                formatDate={formatDate}
                isSameDay={isSameDay}
              />
              
              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <SimilarEvents events={similarEvents} />
              )}
            </motion.div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Registration Card */}
              <RegistrationCard 
                isEventOver={isEventOver()}
                isRegistering={isRegistering}
                userRegistration={userRegistration}
                organizerEmail={typeof event.organizerId === 'object' && event.organizerId !== null ? event.organizerId.email : undefined}
                handleRegister={handleRegister}
                handleCancelRegistration={handleCancelRegistration}
              />
            </div>
          </div>
        </>
      )}
    </EventLayout>
  );
}