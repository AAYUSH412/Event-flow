"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, Clock, FileCheck } from "lucide-react";

interface AdminDashboardStatsProps {
  totalEvents: number;
  totalUsers: number;
  pendingApprovals: number;
}

export default function AdminDashboardStats({
  totalEvents,
  totalUsers,
  pendingApprovals
}: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">Total Events</h3>
          <div className="p-2 bg-indigo-100 rounded-full">
            <Calendar className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <p className="text-3xl font-bold">{totalEvents}</p>
        <Link 
          href="/dashboard/admin/events" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          View all events
          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <div className="p-2 bg-green-100 rounded-full">
            <Users className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="text-3xl font-bold">{totalUsers}</p>
        <Link 
          href="/dashboard/admin/users" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          Manage users
          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">Pending Approvals</h3>
          <div className="p-2 bg-yellow-100 rounded-full">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
        <p className="text-3xl font-bold">{pendingApprovals}</p>
        <Link 
          href="/dashboard/admin/approvals" 
          className="mt-4 text-sm text-indigo-600 font-medium flex items-center"
        >
          Review approvals
          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
