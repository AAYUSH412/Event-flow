"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ExternalLink, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/features/common/utils/dateUtils";

interface EventType {
  _id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  // Add other properties as needed
}

interface OrganizerEventsListProps {
  events: EventType[];
  onDeleteEvent: (id: string) => void;
}

export default function OrganizerEventsList({ events, onDeleteEvent }: OrganizerEventsListProps) {
  // Helper function to determine if an event is in the past
  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Events</h2>
        <Link href="/dashboard/organizer/events" className="text-sm text-indigo-600 font-medium">
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
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.slice(0, 5).map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/dashboard/organizer/events/${event._id}`} className="hover:text-indigo-600">
                      {event.title}
                    </Link>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/events/${event._id}`}
                        className="text-gray-500 hover:text-gray-700"
                        title="View public page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {!isEventPast(event.endDateTime) && (
                        <>
                          <Link 
                            href={`/dashboard/organizer/events/${event._id}/edit`}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit event"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => onDeleteEvent(event._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
          <Link
            href="/dashboard/organizer/events/create"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Create Your First Event
          </Link>
        </div>
      )}
    </div>
  );
}
