import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

interface ModernRecentRegistrationsProps {
  registrations: any[];
}

const ModernRecentRegistrations: React.FC<ModernRecentRegistrationsProps> = ({
  registrations
}) => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Recent Registrations</h2>
        <Link 
          href="/dashboard/registrations"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.slice(0, 3).map((registration) => (
            <div 
              key={registration._id} 
              className="bg-white rounded-lg p-4 border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm hover:shadow"
            >
              <Link href={`/events/${registration.event?._id}`} className="block">
                <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                  {registration.event?.title || 'Event'}
                </h3>
                
                <div className="flex items-center flex-wrap mt-2 gap-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-indigo-500" />
                    <span>{new Date(registration.registrationDate).toLocaleDateString()}</span>
                  </div>
                  
                  {registration.event?.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                      <span>{registration.event.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center ml-auto">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      registration.status === 'REGISTERED' 
                        ? 'bg-green-100 text-green-800' 
                        : registration.status === 'WAITLISTED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {registration.status}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300 h-full flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">No event registrations yet.</p>
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

export default ModernRecentRegistrations;
