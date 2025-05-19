import React from "react";
import Link from "next/link";
import { CheckSquare, PieChart, Download } from "lucide-react";
import { toast } from "react-toastify";

interface OrganizerEventRegistrationStatsProps {
  id: string;
  regStats: {
    registered: number;
    waitlisted: number;
    cancelled: number;
    total: number;
  };
}

export default function OrganizerEventRegistrationStats({ 
  id, 
  regStats 
}: OrganizerEventRegistrationStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Registrations</h2>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-indigo-50 p-3 rounded-lg text-center">
          <span className="block text-2xl font-bold text-indigo-600">{regStats.total}</span>
          <span className="text-xs text-gray-500">Total</span>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <span className="block text-2xl font-bold text-green-600">{regStats.registered}</span>
          <span className="text-xs text-gray-500">Registered</span>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <span className="block text-2xl font-bold text-yellow-600">{regStats.waitlisted}</span>
          <span className="text-xs text-gray-500">Waitlisted</span>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <span className="block text-2xl font-bold text-red-600">{regStats.cancelled}</span>
          <span className="text-xs text-gray-500">Cancelled</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Link 
          href={`/dashboard/organizer/events/${id}/attendees`}
          className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <CheckSquare className="inline-block h-4 w-4 mr-2" />
          Manage Attendees
        </Link>
        
        <Link 
          href={`/dashboard/organizer/events/${id}/analytics`}
          className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          <PieChart className="inline-block h-4 w-4 mr-2" />
          View Analytics
        </Link>
        
        <button 
          onClick={() => {
            // In a real app, this would download the attendee list
            toast.info("Downloading attendee list is not implemented in this demo");
          }}
          className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          <Download className="inline-block h-4 w-4 mr-2" />
          Download Attendee List
        </button>
      </div>
    </div>
  );
}
