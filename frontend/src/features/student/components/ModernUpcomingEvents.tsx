import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

interface ModernUpcomingEventsProps {
  events: any[];
}

const ModernUpcomingEvents: React.FC<ModernUpcomingEventsProps> = ({
  events
}) => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
        <Link 
          href="/dashboard/events"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <Link 
              key={event._id}
              href={`/events/${event._id}`}
              className="block bg-white rounded-lg p-4 border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm hover:shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 bg-indigo-100 rounded-lg p-2 h-14 w-14 flex flex-col items-center justify-center">
                  <span className="text-xs text-indigo-600 font-medium">
                    {new Date(event.startDateTime).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    {new Date(event.startDateTime).getDate()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap mt-2 gap-x-3 gap-y-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                      <span>
                        {new Date(event.startDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 h-full flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">No upcoming events.</p>
          <Link 
            href="/dashboard/events"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModernUpcomingEvents;
