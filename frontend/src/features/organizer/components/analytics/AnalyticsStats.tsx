"use client";

import { motion } from "framer-motion";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/animated-elements";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: "calendar" | "users" | "trend";
  color: "indigo" | "green" | "blue";
  delay?: number;
}

const iconMap = {
  calendar: <Calendar className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  trend: <TrendingUp className="h-6 w-6" />,
};

const colorMap = {
  indigo: {
    bg: "bg-indigo-600",
    gradient: "from-indigo-600 to-indigo-400",
    text: "text-indigo-600",
    ringLight: "ring-indigo-500/20",
    ringDark: "ring-indigo-500/30",
  },
  green: {
    bg: "bg-emerald-600",
    gradient: "from-emerald-600 to-emerald-400",
    text: "text-emerald-600",
    ringLight: "ring-emerald-500/20",
    ringDark: "ring-emerald-500/30",
  },
  blue: {
    bg: "bg-blue-600",
    gradient: "from-blue-600 to-blue-400",
    text: "text-blue-600",
    ringLight: "ring-blue-500/20",
    ringDark: "ring-blue-500/30",
  },
};

const StatsCard = ({ title, value, icon, color, delay = 0 }: StatsCardProps) => {
  const colors = colorMap[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <BackgroundGradient
        containerClassName="h-full"
        className="h-full"
      >
        <div className="p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100/50 h-full">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.gradient} shadow-lg`}>
              <div className="text-white">
                {iconMap[icon]}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <h3 className={`text-2xl font-bold ${colors.text}`}>
                {typeof value === 'number' && title.includes('Rate') ? `${value}%` : value}
              </h3>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

interface AnalyticsStatsProps {
  stats: {
    totalEvents: number;
    totalAttendees: number;
    attendanceRate: number;
  };
}

export const AnalyticsStats = ({ stats }: AnalyticsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Total Events"
        value={stats.totalEvents}
        icon="calendar"
        color="indigo"
        delay={0.1}
      />
      <StatsCard
        title="Total Attendees"
        value={stats.totalAttendees}
        icon="users"
        color="green"
        delay={0.2}
      />
      <StatsCard
        title="Attendance Rate"
        value={stats.attendanceRate}
        icon="trend"
        color="blue"
        delay={0.3}
      />
    </div>
  );
};

export default AnalyticsStats;
