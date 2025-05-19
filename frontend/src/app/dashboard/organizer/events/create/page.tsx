"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { eventService, CreateEventData } from "@/features/common/services";
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

export default function OrganizerCreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const eventData: CreateEventData = {
        ...data,
        // Convert maxParticipants to number if it exists
        maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : undefined,
      };

      const response = await eventService.createEvent(eventData);
      toast.success("Event created successfully!");
      router.push(`/dashboard/organizer/events/${response.event._id}`);
    } catch (error) {
      console.error("Create event error:", error);
      const typedError = error as { response?: { data?: { message?: string } } };
      const errorMessage = typedError.response?.data?.message || "Failed to create event. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Background>
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <EventFormProvider onSubmit={onSubmit}>
          <EventFormHeader />
          
          {/* Form Sections */}
          <BasicInfoSection />
          <DateTimeSection />
          <LocationSection />
          <OrganizationSection />
          <ParticipationSection />
          
          {/* Submit Button */}
          <FormSubmitButton isSubmitting={isSubmitting} />
        </EventFormProvider>
      </div>
    </Background>
  );
}
