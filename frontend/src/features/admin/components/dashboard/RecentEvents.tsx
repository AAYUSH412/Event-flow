"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Event {
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
}

interface RecentEventsProps {
  events: Event[];
}

export function RecentEvents({ events }: RecentEventsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Events</h2>
        <Link 
          href="/dashboard/admin/events" 
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-5">
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No recent events found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EventCard({ event, index }: { event: Event, index: number }) {
  const [showOptions, setShowOptions] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Check if an event is in the past, active, or upcoming
  const now = new Date();
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);
  const isActive = now >= startDate && now <= endDate;
  const isPast = now > endDate;
  const isUpcoming = now < startDate;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border border-gray-100 dark:border-gray-800 relative group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        <CalendarDays className="h-6 w-6" />
      </div>
      
      <div className="flex-grow">
        <Link 
          href={`/dashboard/admin/events/${event._id}`}
          className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {event.title}
        </Link>
        
        <div className="flex flex-wrap gap-y-1 gap-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(event.startDateTime)} • {formatTime(event.startDateTime)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            <span>{event.organizerId.name}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
        <Badge
          variant="outline"
          className={`
            ${isActive ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900' :
              isPast ? 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800' :
              'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900'}
            py-1 px-2 rounded-full text-xs
          `}
        >
          {isActive ? 'Active' : isPast ? 'Past' : 'Upcoming'}
        </Badge>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-10">
              <Link 
                href={`/dashboard/admin/events/${event._id}`} 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View Details
              </Link>
              <Link 
                href={`/dashboard/admin/events/${event._id}/edit`} 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Event
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                Cancel Event
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RecentEvents;
