"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Clock, Award, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor: string;
  delay?: number;
}

function StatCard({ 
  title, 
  value, 
  icon, 
  linkText, 
  linkHref,
  trend,
  bgColor,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`${bgColor} p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden`}
    >
      <div className="absolute right-0 top-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-white/10 z-0"></div>
      <div className="absolute left-0 bottom-0 w-16 h-16 -mb-4 -ml-4 rounded-full bg-black/5 z-0"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        <div className="p-2 bg-white/20 dark:bg-black/20 rounded-full">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-1 relative z-10">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <div className={`mb-1 flex items-center text-sm ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
      
      {linkText && linkHref && (
        <Link 
          href={linkHref}
          className="mt-4 text-sm text-gray-700 dark:text-gray-200 font-medium flex items-center relative z-10 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {linkText}
          <Eye className="h-4 w-4 ml-1" />
        </Link>
      )}
    </motion.div>
  );
}

interface StatisticsProps {
  stats: {
    totalEvents: number;
    totalUsers: number;
    pendingApprovals: number;
    totalRegistrations: number;
    todayEvents: number;
    revenueGenerated?: number;
  };
}

export function Statistics({ stats }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Events"
        value={stats.totalEvents}
        icon={<Calendar className="h-6 w-6 text-white" />}
        linkText="View all events"
        linkHref="/dashboard/admin/events"
        trend={{ value: 12, isPositive: true }}
        bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
        delay={0.1}
      />
      
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<Users className="h-6 w-6 text-white" />}
        linkText="Manage users"
        linkHref="/dashboard/admin/users"
        trend={{ value: 8, isPositive: true }}
        bgColor="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        delay={0.2}
      />
      
      <StatCard
        title="Pending Approvals"
        value={stats.pendingApprovals}
        icon={<Clock className="h-6 w-6 text-white" />}
        linkText="Review pending"
        linkHref="/dashboard/admin/approvals"
        bgColor="bg-gradient-to-br from-amber-500 to-amber-600 text-white"
        delay={0.3}
      />
      
      <StatCard
        title="Total Registrations"
        value={stats.totalRegistrations}
        icon={<Award className="h-6 w-6 text-white" />}
        linkText="View registrations"
        linkHref="/dashboard/admin/registrations"
        trend={{ value: 15, isPositive: true }}
        bgColor="bg-gradient-to-br from-green-500 to-green-600 text-white"
        delay={0.4}
      />
      
      <StatCard
        title="Today's Events"
        value={stats.todayEvents}
        icon={<Calendar className="h-6 w-6 text-white" />}
        linkText="View today's schedule"
        linkHref="/dashboard/admin/events?filter=today"
        bgColor="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        delay={0.5}
      />
      
      {stats.revenueGenerated !== undefined && (
        <StatCard
          title="Revenue Generated"
          value={`$${stats.revenueGenerated.toLocaleString()}`}
          icon={<Award className="h-6 w-6 text-white" />}
          linkText="View financial details"
          linkHref="/dashboard/admin/finance"
          trend={{ value: 23, isPositive: true }}
          bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
          delay={0.6}
        />
      )}
    </div>
  );
}

export default Statistics;
