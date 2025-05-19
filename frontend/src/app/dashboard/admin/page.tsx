"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { eventService, adminService } from "@/features/common/services";
import { 
  AdminDashboardHeader,
  AdminStatsOverview,
  AdminAnalyticsOverview,
  AdminRecentEventsList,
  AdminUserInsights ,
  AdminUserGrowth,
  AdminRecentEvents,
  AdminDashboardStats,
  AdminAnalyticsCard
} from "@/features/admin/components/dashboard";
import Link from "next/link";


interface AnalyticsDataPoint {
  name: string;
  value: number;
}

interface AnalyticsData {
  eventsByMonth: AnalyticsDataPoint[];
  registrationsByMonth: AnalyticsDataPoint[];
  popularCategories: AnalyticsDataPoint[];
}

interface Event {
  _id: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  attendeeCount?: number;
  organizerName?: string;
  status?: string;
  organizerId?: {
    name: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    pendingEvents: 0
  });
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userGrowthData, setUserGrowthData] = useState({
    usersByRole: [
      { role: "STUDENT", count: 85 },
      { role: "ORGANIZER", count: 30 },
      { role: "ADMIN", count: 5 }
    ],
    newUsersThisMonth: 32,
    userGrowthRate: 15
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    eventsByMonth: [],
    registrationsByMonth: [],
    popularCategories: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics data
        // In a real app, you would have admin-specific endpoints for these
        const eventsResponse = await eventService.getAllEvents({ limit: 100 });
        
        // Set placeholder statistics
        setStats({
          totalEvents: eventsResponse.events.length,
          totalUsers: 120, // This would normally come from an admin API
          pendingEvents: 5 // This would normally come from an admin API
        });
        
        // Set recent events
        setRecentEvents(eventsResponse.events.slice(0, 5));
        
        // Note: In a real app, you would fetch this data from your API
        // These are placeholder values for demonstration
        setAnalyticsData({
          eventsByMonth: [
            { name: "Jan", value: 5 },
            { name: "Feb", value: 8 },
            { name: "Mar", value: 12 },
            { name: "Apr", value: 10 },
            { name: "May", value: 15 }
          ],
          registrationsByMonth: [
            { name: "Jan", value: 25 },
            { name: "Feb", value: 38 },
            { name: "Mar", value: 42 },
            { name: "Apr", value: 30 },
            { name: "May", value: 55 }
          ],
          popularCategories: [
            { name: "Workshop", value: 24 },
            { name: "Conference", value: 18 },
            { name: "Hackathon", value: 12 },
            { name: "Seminar", value: 10 },
            { name: "Cultural", value: 8 }
          ]
        });
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <AdminDashboardHeader 
        title="Admin Dashboard" 
        actions={[
          { label: "Create Event", href: "/dashboard/admin/events/create", primary: true }
        ]}
      />
      
      {/* Dashboard Stats */}
      <AdminDashboardStats 
        totalEvents={stats.totalEvents}
        totalUsers={stats.totalUsers}
        pendingApprovals={stats.pendingEvents}
      />
      
      {/* Stats Overview - optional additional stats component */}
      <AdminStatsOverview 
        totalEvents={stats.totalEvents}
        totalUsers={stats.totalUsers}
        activeEvents={stats.totalEvents - stats.pendingEvents}
        completionRate={85}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <AdminRecentEvents events={recentEvents} />
        
        {/* User Growth */}
        <AdminUserGrowth 
          usersByRole={userGrowthData.usersByRole}
          newUsersThisMonth={userGrowthData.newUsersThisMonth}
          userGrowthRate={userGrowthData.userGrowthRate}
        />
      </div>
      
      {/* Analytics Overview */}
      <AdminAnalyticsOverview 
        eventsByMonth={analyticsData.eventsByMonth}
        registrationsByMonth={analyticsData.registrationsByMonth}
        popularCategories={analyticsData.popularCategories}
      />
    </div>
  );
}