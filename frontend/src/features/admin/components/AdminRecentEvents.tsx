"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ExternalLink, User } from "lucide-react";
import { formatDate } from "@/features/common/utils/dateUtils";

interface EventType {
  _id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  organizerId: {
    _id: string;
    name: string;
    email: string;
  };
  category?: string;
  maxParticipants?: number;
  // Add other properties as needed
}

interface AdminRecentEventsProps {
  events: EventType[];
}

export default function AdminRecentEvents({ events }: AdminRecentEventsProps) {
  // Helper function to determine if an event is in the past
  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Events</h2>
        <Link href="/dashboard/admin/events" className="text-sm text-indigo-600 font-medium">
          View all
        </Link>
      </div>
      
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/dashboard/admin/events/${event._id}`} className="hover:text-indigo-600">
                      {event.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {event.organizerId?.name || "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(event.startDateTime)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(event.startDateTime, 'time')} - {formatDate(event.endDateTime, 'time')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      isEventPast(event.endDateTime) 
                        ? 'bg-gray-100 text-gray-800' 
                        : new Date() > new Date(event.startDateTime)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isEventPast(event.endDateTime) 
                        ? 'Past' 
                        : new Date() > new Date(event.startDateTime)
                          ? 'Ongoing'
                          : 'Upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/events/${event._id}`}
                        className="text-gray-500 hover:text-gray-700"
                        title="View public page"
                        target="_blank"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/dashboard/admin/events/${event._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No events found.</p>
        </div>
      )}
    </div>
  );
}
