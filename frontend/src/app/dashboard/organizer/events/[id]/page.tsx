"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Import modern components for event details page
import {
  ModernBackground,
  ModernEventHeader,
  ModernEventDetails,
  ModernRegistrationStats,
  ModernEventStatus,
  ModernEventActions,
  ModernQuickLinks,
  ModernDeleteModal
} from "@/features/organizer/components/event-detail";
import OrganizerEventNotFound from "@/features/organizer/components/OrganizerEventNotFound";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";

// Import hooks
import { useOrganizerEventDetail } from "@/features/organizer/hooks/useOrganizerEventDetail";

export default function OrganizerEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = id as string;
  
  // Use custom hook for data fetching and event management
  const { 
    event, 
    isLoading, 
    regStats, 
    isDeleteModalOpen, 
    isDeleting, 
    handleDeleteEvent, 
    isEventPast, 
    isEventStarted, 
    openDeleteModal, 
    closeDeleteModal 
  } = useOrganizerEventDetail(eventId);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner variant="ellipsis" className="h-64" />;
  }

  // Show not found component if event doesn't exist
  if (!event) {
    return <OrganizerEventNotFound />;
  }

  return (
    <ModernBackground>
      {/* Header with navigation and actions */}
      <ModernEventHeader 
        id={eventId} 
        onDeleteClick={openDeleteModal}
        isEventPast={isEventPast()}
        isEventStarted={isEventStarted()}
        title={event.title}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - event details and registration stats */}
        <div className="lg:col-span-2 space-y-6">
          <ModernEventDetails event={event} regStats={regStats} />
          <ModernRegistrationStats id={eventId} regStats={regStats} />
        </div>
        
        {/* Sidebar - event status, actions, and quick links */}
        <div className="space-y-6">
          <ModernEventStatus event={event} regStats={regStats} />
          <ModernEventActions 
            id={eventId} 
            onDeleteClick={openDeleteModal}
            isEventPast={isEventPast()}
            isEventStarted={isEventStarted()}
          />
          <ModernQuickLinks id={eventId} />
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      <ModernDeleteModal 
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onCancel={closeDeleteModal}
        onDelete={handleDeleteEvent}
        eventTitle={event.title}
      />
    </ModernBackground>
  );
}
