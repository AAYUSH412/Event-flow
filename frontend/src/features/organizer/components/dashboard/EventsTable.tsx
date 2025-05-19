"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  registeredCount?: number;
  maxParticipants?: number;
}

interface EventsTableProps {
  events: Event[];
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-indigo-100/50 p-4 sm:p-6 overflow-hidden w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
        <Link href="/dashboard/organizer/events" className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition">
          View all
        </Link>
      </div>
      
      {events.length > 0 ? (
        <div className="overflow-x-auto rounded-lg w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Location
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Attendees
                </th>
                <th scope="col" className="relative px-4 py-3 w-20">
                  <span className="sr-only">Manage</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.slice(0, 5).map((event, index) => (
                <motion.tr 
                  key={event._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                >
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{event.title}</div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-600">
                      {formatDate(event.startDateTime)}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-600 line-clamp-1">{event.location}</div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell text-sm text-gray-600">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                      {event.registeredCount || 0} / {event.maxParticipants || '∞'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <Link 
                      href={`/dashboard/organizer/events/${event._id}`} 
                      className="text-indigo-600 hover:text-indigo-900 transition"
                    >
                      Manage
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <motion.div 
          className="text-center py-12 rounded-xl bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-gray-600 mb-6">You haven't created any events yet.</p>
          <Link 
            href="/dashboard/organizer/events/create"
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventsTable;
