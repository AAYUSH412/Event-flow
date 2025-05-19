"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { eventService, Event as EventType } from "@/features/common/services";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";
import { motion } from "framer-motion";

// Import the same components used for creating events but for admin context
import {
  Background,
  EventFormHeader,
  BasicInfoSection,
  DateTimeSection,
  LocationSection,
  OrganizationSection,
  ParticipationSection,
  FormSubmitButton,
  EventFormProvider,
  EventFormData
} from "@/features/organizer/components/create-event";

export default function AdminEditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const eventId = id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);
  
  // Fetch the event data
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        const response = await eventService.getEventById(eventId);
        setEvent(response.event);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event data");
        router.push("/dashboard/admin/events");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventData();
  }, [eventId, router]);
  
  // Handle form submission for updating the event
  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      // Convert certain fields as needed
      const eventData = {
        ...data,
        maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : undefined,
      };
      
      await eventService.updateEvent(eventId, eventData);
      toast.success("Event updated successfully!");
      router.push(`/dashboard/admin/events/${eventId}`);
    } catch (error) {
      console.error("Update event error:", error);
      const typedError = error as { response?: { data?: { message?: string } } };
      const errorMessage = typedError.response?.data?.message || "Failed to update event. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner variant="ripple" size="lg" color="indigo" />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-2xl font-bold text-red-600">Event Not Found</h2>
        <p className="mt-2 text-gray-600">The event you are trying to edit does not exist.</p>
        <button 
          onClick={() => router.push("/dashboard/admin/events")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Return to Events
        </button>
      </div>
    );
  }
  
  // Convert the event data to match the form's expected data structure
  const defaultValues: EventFormData = {
    title: event.title,
    description: event.description,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    location: event.location,
    bannerImage: event.bannerImage || "",
    department: event.department || "",
    club: event.club || "",
    category: event.category || "",
    maxParticipants: event.maxParticipants?.toString() || ""
  };

  return (
    <Background>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 pb-16"
      >
        <EventFormProvider onSubmit={onSubmit} defaultValues={defaultValues}>
          <EventFormHeader isEditing={true} />
          
          {/* Form Sections */}
          <BasicInfoSection />
          <DateTimeSection />
          <LocationSection />
          <OrganizationSection />
          <ParticipationSection />
          
          {/* Submit Button */}
          <FormSubmitButton isSubmitting={isSubmitting} isEditing={true} />
        </EventFormProvider>
      </motion.div>
    </Background>
  );
}
