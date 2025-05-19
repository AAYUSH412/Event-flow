import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Award } from 'lucide-react';

interface StudentDashboardStatsProps {
  upcomingEvents: any[];
  registrations: any[];
}

const StudentDashboardStats: React.FC<StudentDashboardStatsProps> = ({
  upcomingEvents,
  registrations
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
        </div>
        <p className="text-3xl font-bold">{upcomingEvents.length}</p>
        <Link 
          href="/dashboard/events" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          View all events
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold">My Registrations</h2>
        </div>
        <p className="text-3xl font-bold">{registrations.length}</p>
        <Link 
          href="/dashboard/registrations" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          View registrations
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-100 rounded-lg mr-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Certificates</h2>
        </div>
        <p className="text-3xl font-bold">0</p>
        <Link 
          href="/dashboard/certificates" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          View certificates
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardStats;
