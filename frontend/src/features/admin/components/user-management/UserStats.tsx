import { User } from "@/features/common/services";
import { UserIcon, Users, UserCog, UsersIcon } from "lucide-react";

interface UserStatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string; // "indigo", "purple", "green", "blue"
}

function UserStatsCard({ title, value, icon, trend, color }: UserStatsCardProps) {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      text: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-800/30",
      trendUp: "text-green-600 dark:text-green-400",
      trendDown: "text-red-600 dark:text-red-400"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-800/30",
      trendUp: "text-green-600 dark:text-green-400",
      trendDown: "text-red-600 dark:text-red-400"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-800/30",
      trendUp: "text-green-600 dark:text-green-400",
      trendDown: "text-red-600 dark:text-red-400"
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-800/30",
      trendUp: "text-green-600 dark:text-green-400",
      trendDown: "text-red-600 dark:text-red-400"
    }
  };

  const classes = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className={`${classes.bg} p-5 rounded-xl border border-gray-100 dark:border-gray-800`}>
      <div className="flex items-center justify-between">
        <div className={`${classes.iconBg} p-2.5 rounded-lg`}>
          <div className={classes.text}>{icon}</div>
        </div>
        
        {trend && (
          <div className={`text-xs font-medium ${trend.isPositive ? classes.trendUp : classes.trendDown}`}>
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
      </div>
    </div>
  );
}

interface UserStatsProps {
  users: User[];
}

export function UserStats({ users }: UserStatsProps) {
  // Calculate stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === 'ADMIN').length;
  const totalOrganizers = users.filter(user => user.role === 'ORGANIZER').length;
  const totalStudents = users.filter(user => user.role === 'STUDENT').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <UserStatsCard
        title="Total Users"
        value={totalUsers}
        icon={<UsersIcon className="h-5 w-5" />}
        trend={{ value: 12, isPositive: true }}
        color="indigo"
      />
      
      <UserStatsCard
        title="Administrators"
        value={totalAdmins}
        icon={<UserCog className="h-5 w-5" />}
        color="purple"
      />
      
      <UserStatsCard
        title="Organizers"
        value={totalOrganizers}
        icon={<Users className="h-5 w-5" />}
        trend={{ value: 8, isPositive: true }}
        color="blue"
      />
      
      <UserStatsCard
        title="Students"
        value={totalStudents}
        icon={<UserIcon className="h-5 w-5" />}
        trend={{ value: 15, isPositive: true }}
        color="green"
      />
    </div>
  );
}
