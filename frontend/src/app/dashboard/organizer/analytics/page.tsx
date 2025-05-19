"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { PatternBackground } from "@/components/ui/animated-elements";
import { registrationService } from "@/features/common/services";

// Import analytics components
import {
  AnalyticsHeader,
  AnalyticsStats,
  AnalyticsChart,
  AnalyticsNoData,
  AnalyticsLoader
} from "@/features/organizer/components/analytics";

export default function OrganizerAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("last6months");
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    registrationsByEvent: [],
    registrationsByMonth: [],
    attendanceRate: 0,
    popularCategories: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Mock data since backend endpoint is missing
      // In a production environment, you would use:
      // const response = await registrationService.getOrganizerAnalytics(timeframe);
      // setStats(response.data);
      
      // For now, generate realistic mock data based on timeframe
      setTimeout(() => {
        const mockData = generateMockData(timeframe);
        setStats(mockData);
        setIsLoading(false);
      }, 1200); // Simulate API call delay
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to load analytics data");
      setIsLoading(false);
    }
  };

  const generateMockData = (timeframe) => {
    // Generate different data ranges based on timeframe
    const monthCount = 
      timeframe === "last3months" ? 3 :
      timeframe === "last6months" ? 6 :
      timeframe === "lastyear" ? 12 : 24;
    
    // Generate month labels
    const now = new Date();
    const months = [];
    for (let i = monthCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleString('default', { month: 'short' }));
    }
    
    // Generate event names
    const eventNames = [
      "Web Development Workshop", 
      "AI Conference", 
      "Data Science Bootcamp",
      "UX Design Masterclass",
      "Cloud Computing Summit",
      "Mobile App Hackathon",
      "Blockchain Symposium",
      "DevOps Training",
      "Cybersecurity Webinar",
      "Game Development Workshop"
    ];
    
    // Generate category names
    const categories = [
      "Workshop", 
      "Conference", 
      "Bootcamp", 
      "Hackathon", 
      "Webinar",
      "Symposium", 
      "Training", 
      "Masterclass"
    ];
    
    // Registration by month data
    const registrationsByMonth = months.map((month, index) => ({
      name: month,
      value: Math.floor(Math.random() * 50) + 10 + (index * 3)
    }));
    
    // Registration by event data (use subset of events)
    const registrationsByEvent = eventNames
      .slice(0, 5)
      .map(name => ({
        name,
        value: Math.floor(Math.random() * 100) + 20
      }));
    
    // Popular categories
    const popularCategories = categories
      .slice(0, 5)
      .map(name => ({
        name,
        value: Math.floor(Math.random() * 60) + 10
      }))
      .sort((a, b) => b.value - a.value);
    
    return {
      totalEvents: Math.floor(Math.random() * 10) + monthCount + 5,
      totalAttendees: Math.floor(Math.random() * 200) + (monthCount * 30),
      attendanceRate: Math.floor(Math.random() * 25) + 65, // 65-90%
      registrationsByMonth,
      registrationsByEvent,
      popularCategories
    };
  };

  if (isLoading) {
    return <AnalyticsLoader />;
  }

  const hasData = stats.totalEvents > 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
      </div>
      
      <div className="relative z-10 space-y-8">
        {/* Header with timeframe selector */}
        <AnalyticsHeader 
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
        
        {!hasData ? (
          <AnalyticsNoData message={`No event data available for the ${timeframe === 'alltime' ? 'selected period' : 'last ' + timeframe.replace('last', '').replace('months', ' months').replace('year', ' year')}.`} />
        ) : (
          <>
            {/* Stats Cards */}
            <AnalyticsStats stats={stats} />
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalyticsChart 
                title="Registrations by Event"
                description="Number of registrations per event"
                data={stats.registrationsByEvent}
                type="bar"
                delay={0.4}
              />
              
              <AnalyticsChart 
                title="Registration Trends"
                description="Monthly registration numbers"
                data={stats.registrationsByMonth}
                type="line"
                delay={0.5}
              />
            </div>
            
            {/* Categories Chart */}
            <AnalyticsChart 
              title="Popular Event Categories"
              description="Number of registrations by event category"
              data={stats.popularCategories}
              type="horizontal-bar"
              delay={0.6}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
