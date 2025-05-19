"use client";

import { Event as EventType } from "@/features/common/services";

interface EventMetadataProps {
  event: EventType;
}

export default function EventMetadata({ event }: EventMetadataProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Event Details</h2>
      
      <div className="space-y-4">
        <div>
          <span className="block text-sm font-medium text-gray-500">Event ID</span>
          <span className="block text-gray-800">{event._id}</span>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-500">Created At</span>
          <span className="block text-gray-800">{new Date(event.createdAt).toLocaleString()}</span>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-500">Updated At</span>
          <span className="block text-gray-800">{new Date(event.updatedAt).toLocaleString()}</span>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-500">Event Status</span>
          <span className="block">
            {new Date() < new Date(event.startDateTime) ? (
              <span className="text-blue-600 font-medium">Upcoming</span>
            ) : new Date() > new Date(event.endDateTime) ? (
              <span className="text-gray-600 font-medium">Past</span>
            ) : (
              <span className="text-green-600 font-medium">Ongoing</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
