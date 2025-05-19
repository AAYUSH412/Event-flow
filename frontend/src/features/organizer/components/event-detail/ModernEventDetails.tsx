"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag, School, Users, Clock, ChevronRight, ChevronDown } from "lucide-react";
import { Event as EventType } from "@/features/common/services";
import { formatDate } from "@/features/common/utils/dateUtils";
import { BackgroundGradient } from "@/components/ui/animated-elements";

interface ModernEventDetailsProps {
  event: EventType;
  regStats: {
    registered: number;
    waitlisted: number;
    cancelled: number;
    total: number;
  };
}

const ModernEventDetails = ({ event, regStats }: ModernEventDetailsProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Determine if event is upcoming, ongoing or past
  const now = new Date();
  const eventStartDate = new Date(event.startDateTime);
  const eventEndDate = new Date(event.endDateTime);
  
  let eventStatus = "";
  let statusColor = "";
  
  if (now < eventStartDate) {
    eventStatus = "Upcoming";
    statusColor = "bg-blue-100 text-blue-800";
  } else if (now > eventEndDate) {
    eventStatus = "Past";
    statusColor = "bg-gray-100 text-gray-800";
  } else {
    eventStatus = "Ongoing";
    statusColor = "bg-green-100 text-green-800";
  }
  
  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Truncate description if it's too long
  const shortDescription = event.description.length > 300
    ? `${event.description.substring(0, 300)}...`
    : event.description;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 overflow-hidden">
          {/* Event Banner */}
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={event.bannerImage || '/images/event-placeholder.jpg'}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                {eventStatus}
              </span>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-y-6 gap-x-8 mb-6">
              {/* Date & Time */}
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium">{formatDate(event.startDateTime)}</p>
                </div>
              </div>
              
              {/* Time */}
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="font-medium">
                    {formatTime(event.startDateTime)} - {formatTime(event.endDateTime)}
                  </p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
              
              {/* Capacity */}
              {event.maxParticipants && (
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Capacity</p>
                    <p className="font-medium">
                      {regStats.registered} / {event.maxParticipants} registered
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {event.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <Tag className="h-4 w-4 mr-1.5" />
                  {event.category}
                </span>
              )}
              
              {event.department && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <School className="h-4 w-4 mr-1.5" />
                  {event.department}
                </span>
              )}
            </div>
            
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  {showFullDescription ? event.description : shortDescription}
                </p>
                
                {event.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 inline-flex items-center text-sm font-medium"
                  >
                    {showFullDescription ? (
                      <>
                        Show less
                        <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read more
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ModernEventDetails;
