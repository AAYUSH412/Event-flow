"use client";

import React from "react";
import { Calendar, MapPin, Clock, Badge, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Registration, Event } from "@/features/common/services";

interface RegistrationCardProps {
  registration: Registration & { event?: Event };
  onCancel: (eventId: string) => Promise<void>;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ registration, onCancel }) => {
  const [isCancelling, setIsCancelling] = React.useState(false);
  
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "REGISTERED":
        return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" };
      case "WAITLISTED":
        return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" };
      case "CANCELLED":
        return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
    }
  };

  const statusColor = getStatusColor(registration.status);
  // Check if event is over - useful for conditional rendering
  const isEventOver = registration.event?.endDateTime 
    ? new Date() > new Date(registration.event.endDateTime) 
    : false;
    
  // We use this variable later in the component for conditional rendering
  // Currently only using isUpcoming, but keeping isEventOver for future enhancements
  const isUpcoming = registration.event?.startDateTime 
    ? new Date() < new Date(registration.event.startDateTime) 
    : false;
  
  const handleCancelRegistration = async () => {
    try {
      setIsCancelling(true);
      await onCancel(registration.eventId);
    } catch (error) {
      console.error("Error cancelling registration:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!registration.event) {
    return null; // or show a placeholder/error state
  }

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="relative h-48 w-full md:h-auto md:w-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
          {registration.event.bannerImage ? (
            <Image 
              src={registration.event.bannerImage} 
              alt={registration.event.title} 
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full p-4">
              <Calendar className="w-12 h-12 text-indigo-500 mb-2" />
              <span className="text-xs text-center text-indigo-700 font-medium">
                {new Date(registration.event.startDateTime).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {/* Status badge floating on image */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
              {registration.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-col h-full justify-between">
            {/* Event details */}
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {registration.event.title}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                  <span>
                    {new Date(registration.event.startDateTime).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                {registration.event.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{registration.event.location}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                  <span>Registered on {new Date(registration.createdAt).toLocaleDateString()}</span>
                </div>
                
                {registration.event.maxParticipants && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>
                      {registration.event.maxParticipants} max participants
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/events/${registration.event._id}`}
                className="inline-flex items-center px-3 py-2 rounded-lg text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              
              {registration.status === "REGISTERED" && isUpcoming && (
                <button
                  onClick={handleCancelRegistration}
                  disabled={isCancelling}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Registration"}
                </button>
              )}
              
              {registration.attended && (
                <div className="inline-flex items-center px-3 py-2 rounded-lg text-sm bg-blue-50 text-blue-700">
                  <Badge className="w-4 h-4 mr-1" />
                  Attended
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationCard;
