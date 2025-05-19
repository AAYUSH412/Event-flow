"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Import components
import EventHeader from "@/features/admin/components/event-detail/EventHeader";
import EventTabs from "@/features/admin/components/event-detail/EventTabs";
import EventDetailsTab from "@/features/admin/components/event-detail/EventDetailsTab";
import AttendeesTab from "@/features/admin/components/event-detail/AttendeesTab";
import EventAnalyticsTab from "@/features/admin/components/event-detail/EventAnalyticsTab";
import DeleteEventModal from "@/features/admin/components/DeleteEventModal";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";
import EventNotFound from "@/features/admin/components/EventNotFound";

// Import hooks
import { useEventDetail } from "@/features/events/hooks/useEventDetail";
import { useEventDeletion } from "@/features/events/hooks/useEventDeletion";

export default function AdminEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = id as string;
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'analytics'>('details');
  
  // Use custom hooks for data fetching and event deletion
  const { event, isLoading, regStats, registrations } = useEventDetail(eventId);
  const { 
    isDeleteModalOpen, 
    isDeleting, 
    openDeleteModal, 
    closeDeleteModal, 
    handleDeleteEvent 
  } = useEventDeletion(eventId);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // Show not found component if event doesn't exist
  if (!event) {
    return <EventNotFound />;
  }

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-6 pb-12 max-w-7xl mx-auto px-4 sm:px-6 relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-purple-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
      </div>
      
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-300 to-indigo-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
      </div>
      {/* Event Header Component */}
      <EventHeader 
        event={event} 
        openDeleteModal={openDeleteModal} 
      />
      
      {/* Navigation Tabs Component */}
      <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'details' && (
          <EventDetailsTab event={event} />
        )}
        
        {activeTab === 'attendees' && (
          <AttendeesTab eventId={eventId} registrations={registrations} />
        )}
        
        {activeTab === 'analytics' && (
          <EventAnalyticsTab eventId={eventId} regStats={regStats} />
        )}
      </div>
      
      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onDelete={handleDeleteEvent}
        eventTitle={event.title}
      />
    </motion.div>
  );
}