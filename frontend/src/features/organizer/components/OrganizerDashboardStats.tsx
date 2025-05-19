"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, BarChart3 } from "lucide-react";
import { EventType } from "@/types";

interface OrganizerDashboardStatsProps {
  eventsCount: number;
  totalAttendees: number;
}

export default function OrganizerDashboardStats({
  eventsCount,
  totalAttendees
}: OrganizerDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg mr-3">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold">My Events</h2>
        </div>
        <p className="text-3xl font-bold">{eventsCount}</p>
        <Link 
          href="/dashboard/organizer/events" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          Manage events
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-100 rounded-lg mr-3">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Total Attendees</h2>
        </div>
        <p className="text-3xl font-bold">{totalAttendees}</p>
        <Link 
          href="/dashboard/organizer/attendees" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          Manage attendees
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-amber-100 rounded-lg mr-3">
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold">Event Analytics</h2>
        </div>
        <p className="text-3xl font-bold">View</p>
        <Link 
          href="/dashboard/organizer/analytics" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          View analytics
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
