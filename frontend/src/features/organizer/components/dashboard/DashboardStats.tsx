"use client";

import React from 'react';
import { Calendar, Users, BarChart3 } from "lucide-react";
import StatsCard from './StatsCard';

interface DashboardStatsProps {
  eventsCount: number;
  totalAttendees: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ eventsCount, totalAttendees }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        icon={Calendar}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-100"
        title="My Events"
        value={eventsCount}
        linkText="Manage events"
        linkHref="/dashboard/organizer/events"
        animationDelay={0.1}
      />
      
      <StatsCard 
        icon={Users}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-100"
        title="Total Attendees"
        value={totalAttendees}
        linkText="Manage attendees"
        linkHref="/dashboard/organizer/attendees"
        animationDelay={0.2}
      />
      
      <StatsCard 
        icon={BarChart3}
        iconColor="text-violet-600"
        iconBgColor="bg-violet-100"
        title="Event Analytics"
        value="-"
        linkText="View analytics"
        linkHref="/dashboard/organizer/analytics"
        animationDelay={0.3}
      />
    </div>
  );
};

export default DashboardStats;
