import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Tag, School, Users } from "lucide-react";
import { Event as EventType } from "@/features/common/services";
import { formatDate } from "@/features/common/utils/dateUtils";

interface OrganizerEventDetailsProps {
  event: EventType;
  regStats: {
    registered: number;
    waitlisted: number;
    cancelled: number;
    total: number;
  };
}

export default function OrganizerEventDetails({ event, regStats }: OrganizerEventDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <Image
          src={event.bannerImage || '/images/event-placeholder.jpg'}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-1.5 text-indigo-500" />
          <span>{formatDate(event.startDateTime)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-1.5 text-indigo-500" />
          <span>{event.location}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {event.category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            <Tag className="h-3 w-3 mr-1" />
            {event.category}
          </span>
        )}
        
        {event.department && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <School className="h-3 w-3 mr-1" />
            {event.department}
          </span>
        )}
        
        {event.maxParticipants && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Users className="h-3 w-3 mr-1" />
            {regStats.registered}/{event.maxParticipants} participants
          </span>
        )}
      </div>
      
      <div className="prose max-w-none text-gray-700">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p>{event.description}</p>
      </div>
    </div>
  );
}
