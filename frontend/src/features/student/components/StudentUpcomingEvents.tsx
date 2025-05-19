import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';

interface StudentUpcomingEventsProps {
  events: any[];
}

const StudentUpcomingEvents: React.FC<StudentUpcomingEventsProps> = ({
  events
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div 
              key={event._id} 
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <h3 className="font-medium">{event.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(event.startDateTime).toLocaleDateString()}</span>
                {event.location && (
                  <>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </>
                )}
              </div>
              <Link 
                href={`/events/${event._id}`}
                className="mt-2 inline-block text-sm text-indigo-600 font-medium"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming events.</p>
      )}
    </div>
  );
};

export default StudentUpcomingEvents;
