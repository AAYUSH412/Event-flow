"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, Tag } from "lucide-react";
import { formatDate } from "@/features/common/utils/dateUtils";
import { Event as EventType } from "@/features/common/services";

interface EventCardProps {
  event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Helper functions for date calculations
  const isEventSoon = (dateString: string): boolean => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const getDaysUntilEvent = (dateString: string): number => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageError ? '/images/event-placeholder.jpg' : (event.bannerImage || '/images/event-placeholder.jpg')}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {event.category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              <Tag className="h-3 w-3 mr-1" />
              {event.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
            <span className="truncate">{formatDate(event.startDateTime)}</span>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          {event.maxParticipants && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Users className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
              <span>
                {event.registrationCount || 0}/{event.maxParticipants} participants
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            {isEventSoon(event.startDateTime) ? (
              <span className="text-green-600 dark:text-green-500 font-medium">Starting soon</span>
            ) : (
              <span>{getDaysUntilEvent(event.startDateTime)} days left</span>
            )}
          </span>
          
          <Link
            href={`/events/${event._id}`}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm inline-flex items-center gap-1 transition-colors"
            aria-label={`View details for ${event.title}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
