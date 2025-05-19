"use client";

import React from "react";
import { BarChart3, TrendingUp, Activity } from "lucide-react";

interface AnalyticsData {
  name: string;
  value: number;
}

interface AdminAnalyticsOverviewProps {
  eventsByMonth: AnalyticsData[];
  userRegistrationsByMonth: AnalyticsData[];
  popularCategories: AnalyticsData[];
}

export default function AdminAnalyticsOverview({
  eventsByMonth,
  userRegistrationsByMonth,
  popularCategories
}: AdminAnalyticsOverviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Analytics Overview</h2>
        <div className="p-2 bg-purple-100 rounded-full">
          <BarChart3 className="h-6 w-6 text-purple-600" />
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-md font-medium text-gray-700">Events by Month</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* In a real app, you would render a chart here using libraries like Recharts */}
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Activity className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-md font-medium text-gray-700">User Registrations by Month</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* In a real app, you would render a chart here using libraries like Recharts */}
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">Popular Event Categories</h3>
          <div className="space-y-2">
            {popularCategories.length > 0 ? (
              popularCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{category.name}</span>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium mr-2">{category.value}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${(category.value / Math.max(...popularCategories.map(c => c.value))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
