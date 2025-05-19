import { ArrowUpRight } from "lucide-react";
import { User, PieChart, Users } from "lucide-react";

interface UserRoleData {
  role: string;
  count: number;
}

interface AdminUserInsightsProps {
  usersByRole: UserRoleData[];
  newUsersThisMonth: number;
  userGrowthRate: number;
}

export function AdminUserInsights({ 
  usersByRole, 
  newUsersThisMonth, 
  userGrowthRate 
}: AdminUserInsightsProps) {
  // Calculate total users
  const totalUsers = usersByRole.reduce((sum, role) => sum + role.count, 0);
  
  // Color mapping for roles
  const roleColors = {
    ADMIN: { bg: "bg-purple-100", text: "text-purple-800", dark: "dark:bg-purple-900/20 dark:text-purple-300" },
    ORGANIZER: { bg: "bg-blue-100", text: "text-blue-800", dark: "dark:bg-blue-900/20 dark:text-blue-300" },
    STUDENT: { bg: "bg-green-100", text: "text-green-800", dark: "dark:bg-green-900/20 dark:text-green-300" },
    default: { bg: "bg-gray-100", text: "text-gray-800", dark: "dark:bg-gray-700 dark:text-gray-300" }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Insights</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            User distribution and growth
          </p>
        </div>
        
        <a 
          href="/dashboard/admin/users"
          className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium"
        >
          View all users
          <ArrowUpRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Growth Card */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 flex flex-col">
          <div className="flex items-center">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
              <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">New Users</p>
              <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-100">{newUsersThisMonth}</h4>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-end">
            <div>
              <div className="text-sm text-indigo-700 dark:text-indigo-300">Growth rate</div>
              <div className="flex items-center mt-1">
                <span className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">{userGrowthRate}%</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
                  <path d="M5.83301 10L9.99967 5.83334L14.1663 10" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14.1667L10 5.83334" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400">
              this month
            </div>
          </div>
        </div>
        
        {/* User Distribution */}
        <div className="md:col-span-2">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">User Distribution</h4>
          
          <div className="space-y-4">
            {usersByRole.map((role) => {
              const percentage = Math.round((role.count / totalUsers) * 100);
              const colorScheme = roleColors[role.role as keyof typeof roleColors] || roleColors.default;
              
              return (
                <div key={role.role}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${colorScheme.bg} ${colorScheme.text}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{role.role}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{role.count} ({percentage}%)</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${colorScheme.bg}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
