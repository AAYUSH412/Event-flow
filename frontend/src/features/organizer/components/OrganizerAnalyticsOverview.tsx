"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsDataPoint {
  name: string;
  value: number;
}

interface OrganizerAnalyticsOverviewProps {
  registrationsByEvent: AnalyticsDataPoint[];
  registrationsByMonth: AnalyticsDataPoint[];
}

export default function OrganizerAnalyticsOverview({
  registrationsByEvent,
  registrationsByMonth,
}: OrganizerAnalyticsOverviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Registrations by Event</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationsByEvent}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Registrations" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Registrations by Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationsByMonth}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Registrations" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
