"use client";

import Link from "next/link";
import { CheckSquare } from "lucide-react";

interface EventRegistrationStatsProps {
  id: string;
  regStats: {
    total: number;
    registered: number;
    waitlisted: number;
    cancelled: number;
  };
}

export default function EventRegistrationStats({ id, regStats }: EventRegistrationStatsProps) {
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
      
      <Link 
        href={`/dashboard/admin/events/${id}/attendees`}
        className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
      >
        <CheckSquare className="h-4 w-4 mr-2" />
        Manage Attendees
      </Link>
    </div>
  );
}
