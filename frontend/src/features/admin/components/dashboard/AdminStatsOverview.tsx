import { TrendingUp, TrendingDown, Users, Calendar, Award, CheckSquare } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  suffix?: string;
  bgColor: string;
}

function StatCard({ title, value, icon, trend, suffix = "", bgColor }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {value}{suffix}
          </h3>
          
          {trend !== undefined && (
            <div className={`flex items-center mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? 
                <TrendingUp size={16} className="mr-1" /> : 
                <TrendingDown size={16} className="mr-1" />
              }
              <span className="text-sm font-medium">{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        
        <div className={`${bgColor} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface AdminStatsOverviewProps {
  totalUsers: number;
  totalEvents: number;
  activeEvents: number;
  completionRate: number;
  userGrowth?: number;
  eventGrowth?: number;
}

export function AdminStatsOverview({ 
  totalUsers, 
  totalEvents, 
  activeEvents, 
  completionRate,
  userGrowth = 12,
  eventGrowth = 8
}: AdminStatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Users"
        value={totalUsers}
        icon={<Users size={24} className="text-indigo-600" />}
        trend={userGrowth}
        bgColor="bg-indigo-50 dark:bg-indigo-900/20"
      />
      
      <StatCard 
        title="Total Events"
        value={totalEvents}
        icon={<Calendar size={24} className="text-purple-600" />}
        trend={eventGrowth}
        bgColor="bg-purple-50 dark:bg-purple-900/20"
      />
      
      <StatCard 
        title="Active Events"
        value={activeEvents}
        icon={<CheckSquare size={24} className="text-green-600" />}
        bgColor="bg-green-50 dark:bg-green-900/20"
      />
      
      <StatCard 
        title="Completion Rate"
        value={completionRate}
        suffix="%"
        icon={<Award size={24} className="text-amber-600" />}
        trend={2}
        bgColor="bg-amber-50 dark:bg-amber-900/20"
      />
    </div>
  );
}
