import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Award, ChevronRight } from 'lucide-react';

interface ModernDashboardStatsProps {
  upcomingEvents: any[];
  registrations: any[];
}

const ModernDashboardStats: React.FC<ModernDashboardStatsProps> = ({
  upcomingEvents,
  registrations
}) => {
  const statItems = [
    {
      title: 'Upcoming Events',
      count: upcomingEvents.length,
      icon: <Calendar className="w-6 h-6 text-white" />,
      linkText: 'View all events',
      linkHref: '/dashboard/events',
      bgClass: 'from-blue-500 to-indigo-600',
      iconBgClass: 'bg-blue-600/50',
    },
    {
      title: 'My Registrations',
      count: registrations.length,
      icon: <Clock className="w-6 h-6 text-white" />,
      linkText: 'View registrations',
      linkHref: '/dashboard/registrations',
      bgClass: 'from-purple-500 to-pink-600',
      iconBgClass: 'bg-purple-600/50',
    },
    {
      title: 'Certificates',
      count: 0,
      icon: <Award className="w-6 h-6 text-white" />,
      linkText: 'View certificates',
      linkHref: '/dashboard/certificates',
      bgClass: 'from-green-500 to-emerald-600',
      iconBgClass: 'bg-green-600/50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {statItems.map((item, index) => (
        <div 
          key={index} 
          className={`rounded-xl overflow-hidden relative shadow-md`}
        >
          <div className={`bg-gradient-to-br ${item.bgClass} p-6 text-white h-full`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white/80 mb-1">{item.title}</h3>
                <p className="text-3xl font-bold">{item.count}</p>
              </div>
              <div className={`${item.iconBgClass} p-3 rounded-lg`}>
                {item.icon}
              </div>
            </div>
            <Link 
              href={item.linkHref} 
              className="mt-4 inline-flex items-center text-sm text-white/90 hover:text-white font-medium group"
            >
              {item.linkText}
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernDashboardStats;
