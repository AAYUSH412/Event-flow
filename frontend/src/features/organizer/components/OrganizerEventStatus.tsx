import React from "react";
import { Event as EventType } from "@/features/common/services";

interface OrganizerEventStatusProps {
  event: EventType;
  regStats: {
    registered: number;
  };
}

export default function OrganizerEventStatus({ event, regStats }: OrganizerEventStatusProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Event Status</h2>
      
      <div className="space-y-4">
        <div>
          <span className="block text-sm font-medium text-gray-500">Current Status</span>
          <span className="block mt-1">
            {new Date() < new Date(event.startDateTime) ? (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Upcoming</span>
            ) : new Date() > new Date(event.endDateTime) ? (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Past</span>
            ) : (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Ongoing</span>
            )}
          </span>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-500">Registration Status</span>
          <span className="block mt-1">
            {event.maxParticipants && regStats.registered >= event.maxParticipants ? (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Full (Waitlisting)</span>
            ) : new Date() > new Date(event.startDateTime) ? (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Closed</span>
            ) : (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Open</span>
            )}
          </span>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-500">Time Until Event</span>
          <span className="block font-medium text-gray-900 mt-1">
            {new Date() > new Date(event.endDateTime) ? (
              "Event has ended"
            ) : new Date() > new Date(event.startDateTime) ? (
              "Event is ongoing"
            ) : (
              `${Math.ceil((new Date(event.startDateTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
