"use client";

import { useState, useEffect } from "react";
import { registrationService, Registration, Event } from "@/features/common/services";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PatternBackground } from "@/components/ui/animated-elements";

// Import our custom components
import { 
  RegistrationsHeader, 
  RegistrationsFilter, 
  RegistrationList, 
  EmptyRegistrationState
} from "@/features/registrations/components";

// Extended registration type with event data
interface RegistrationWithEvent extends Omit<Registration, 'eventId'> {
  eventId: string;
  event: Event;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<RegistrationWithEvent[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationWithEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      setIsLoading(true);
      try {
        const response = await registrationService.getUserRegistrations();
        setRegistrations(response.registrations);
        setFilteredRegistrations(response.registrations);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        toast.error("Failed to load your registrations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Apply filters whenever status or search term changes
  useEffect(() => {
    let filtered = [...registrations];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(reg => reg.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.event?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.event?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRegistrations(filtered);
  }, [registrations, statusFilter, searchTerm]);

  const handleCancelRegistration = async (eventId: string) => {
    try {
      await registrationService.cancelRegistration(eventId);
      toast.success("Registration cancelled successfully");
      
      // Refresh the registrations
      const response = await registrationService.getUserRegistrations();
      setRegistrations(response.registrations);
    } catch (error) {
      console.error("Error cancelling registration:", error);
      toast.error("Failed to cancel registration");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner variant="circle" color="purple" size="lg" />
      </div>
    );
  }

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
      </div>
      
      <div className="relative z-10 space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <RegistrationsHeader totalRegistrations={registrations.length} />
        
        {/* Show Empty State or Content */}
        {registrations.length === 0 ? (
          <EmptyRegistrationState />
        ) : (
          <>
            {/* Filters */}
            <RegistrationsFilter 
              statusFilter={statusFilter}
              searchTerm={searchTerm}
              onFilterChange={setStatusFilter}
              onSearchChange={setSearchTerm}
            />
            
            {/* Registration Cards */}
            <RegistrationList 
              registrations={filteredRegistrations}
              onCancelRegistration={handleCancelRegistration}
              isFiltered={statusFilter !== "all" || searchTerm !== ""}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
