import { CalendarCheck, ChevronRight, Users, Clock } from "lucide-react";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  description?: string;
  startDateTime: string;
  attendeeCount?: number;
  organizerName?: string;
  status?: string;
  location?: string;
}

interface AdminRecentEventsListProps {
  events: Event[];
}

export function AdminRecentEventsList({ events }: AdminRecentEventsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Events</h3>
        
        <Link href="/dashboard/admin/events" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center">
          View all
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="space-y-5">
        {events.length > 0 ? events.map((event) => (
          <div key={event._id} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg">
              <CalendarCheck size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <div className="ml-4 flex-1">
              <Link href={`/dashboard/admin/events/${event._id}`} className="text-gray-900 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {event.title}
              </Link>
              
              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-x-4 gap-y-1">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {formatDate(event.startDateTime)}
                </div>
                
                {event.attendeeCount !== undefined && (
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {event.attendeeCount} attendees
                  </div>
                )}
                
                {event.status && (
                  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                    ${event.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                      event.status === 'LIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                      event.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      event.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {event.status}
                  </div>
                )}
              </div>
              
              {event.organizerName && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Organized by {event.organizerName}
                </p>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
