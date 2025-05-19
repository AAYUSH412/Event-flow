"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateEventData, eventService } from "@/features/common/services";
import { motion } from "framer-motion";

// Import our modern components for event creation
import {
  EventCreateHeader,
  EventBasicInfoSection,
  EventDateTimeSection,
  EventLocationSection,
  EventDetailsSection,
  EventMediaSection,
  EventCreateBackground,
  EventFormProvider,
  EventFormData,
  SectionWrapper
} from "@/features/events/components/create";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const eventData: CreateEventData = {
        ...data,
        maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : undefined,
      };

      const response = await eventService.createEvent(eventData);
      toast.success("Event created successfully!");
      router.push(`/events/${response.event._id}`);
    } catch (error: any) {
      console.error("Create event error:", error);
      const errorMessage = error.response?.data?.message || "Failed to create event. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EventCreateBackground>
      <motion.div 
        className="max-w-4xl mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <EventCreateHeader />
        
        <EventFormProvider onSubmit={handleSubmit}>
          <div className="space-y-8">
            <SectionWrapper delay={0.1}>
              <EventBasicInfoSection />
            </SectionWrapper>
            
            <SectionWrapper delay={0.2}>
              <EventDateTimeSection />
            </SectionWrapper>
            
            <SectionWrapper delay={0.3}>
              <EventLocationSection />
            </SectionWrapper>
            
            <SectionWrapper delay={0.4}>
              <EventDetailsSection />
            </SectionWrapper>
            
            <SectionWrapper delay={0.5}>
              <EventMediaSection />
            </SectionWrapper>
            
            {/* Submit Buttons */}
            <motion.div 
              className="flex justify-end space-x-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Event"
                )}
              </button>
            </motion.div>
          </motion.div>
        </EventFormProvider>
      </motion.div>
    </EventCreateBackground>
  );
}