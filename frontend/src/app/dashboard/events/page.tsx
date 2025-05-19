"use client";

import { useEffect, useState } from "react";
import { eventService } from "@/features/common/services";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await eventService.getAllEvents({
          limit: 50,
          filter: "upcoming"
        });
        setEvents(response.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
      
      {events.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600 mb-4">No upcoming events found.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(event.startDateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-2">{event.description}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/events/${event._id}`}
                  className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  View Details
                </Link>
                <Link
                  href={`/events/${event._id}/register`}
                  className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
