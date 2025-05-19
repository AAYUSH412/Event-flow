"use client";

import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend
} from "chart.js";
import { TrendingUp, Users } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface UserRole {
  role: string;
  count: number;
}

interface UserActivityProps {
  usersByRole: UserRole[];
  newUsersThisMonth: number;
  userGrowthRate: number;
}

export function UserActivity({ 
  usersByRole, 
  newUsersThisMonth, 
  userGrowthRate 
}: UserActivityProps) {
  // Calculate total users
  const totalUsers = usersByRole.reduce((sum, item) => sum + item.count, 0);
  
  // Chart data
  const chartData = {
    labels: usersByRole.map(item => item.role),
    datasets: [
      {
        data: usersByRole.map(item => item.count),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',  // Indigo (Admin)
          'rgba(168, 85, 247, 0.8)',   // Purple (Organizer)
          'rgba(59, 130, 246, 0.8)',   // Blue (Student)
          'rgba(236, 72, 153, 0.8)',   // Pink (Other roles if any)
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / totalUsers) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Distribution by role</p>
        </div>
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
          <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 flex flex-col items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">New Users This Month</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{newUsersThisMonth}</div>
          <div className="flex items-center text-green-600 dark:text-green-400 text-sm mt-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{userGrowthRate}% increase</span>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 flex flex-col items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Users</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Across all roles</div>
        </div>
      </div>

      <div className="h-64 relative">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      
      <div className="mt-6 space-y-2">
        {usersByRole.map((item) => (
          <div key={item.role} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className={`h-3 w-3 rounded-full mr-2 ${
                  item.role === 'ADMIN' ? 'bg-indigo-500' :
                  item.role === 'ORGANIZER' ? 'bg-purple-500' :
                  item.role === 'STUDENT' ? 'bg-blue-500' : 'bg-pink-500'
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.role}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({Math.round((item.count / totalUsers) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UserActivity;
