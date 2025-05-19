"use client";

import React from "react";
import { Users, TrendingUp, UserPlus } from "lucide-react";

interface UserGrowthProps {
  usersByRole: {
    role: string;
    count: number;
  }[];
  newUsersThisMonth: number;
  userGrowthRate: number;
}

export default function AdminUserGrowth({
  usersByRole,
  newUsersThisMonth,
  userGrowthRate
}: UserGrowthProps) {
  // Calculate total users
  const totalUsers = usersByRole.reduce((sum, item) => sum + item.count, 0);
  
  // Function to calculate percentage and ensure it's not NaN
  const calculatePercentage = (count: number) => {
    return totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">User Growth</h2>
        <div className="p-2 bg-blue-100 rounded-full">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <UserPlus className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-md font-medium text-gray-700">New Users This Month</h3>
          </div>
          <p className="text-2xl font-bold">{newUsersThisMonth}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-md font-medium text-gray-700">Growth Rate</h3>
          </div>
          <p className="text-2xl font-bold">
            {userGrowthRate > 0 && '+'}{userGrowthRate}%
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Users by Role</h3>
        <div className="space-y-4">
          {usersByRole.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600">
                  {item.role.charAt(0).toUpperCase() + item.role.slice(1).toLowerCase()}s
                </span>
                <span className="text-sm text-gray-500">
                  {item.count} ({calculatePercentage(item.count)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    index % 3 === 0 ? 'bg-indigo-600' : 
                    index % 3 === 1 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${calculatePercentage(item.count)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
