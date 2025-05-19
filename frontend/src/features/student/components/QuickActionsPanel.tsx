import React from 'react';
import Link from 'next/link';
import { Calendar, Bookmark, Award, User } from 'lucide-react';

interface QuickActionItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  bgColor: string;
}

const QuickActionsPanel: React.FC = () => {
  const quickActions: QuickActionItem[] = [
    {
      label: "Browse Events",
      icon: <Calendar className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />,
      link: "/dashboard/events",
      bgColor: "bg-indigo-100/50 group-hover:bg-indigo-100"
    },
    {
      label: "My Registrations",
      icon: <Bookmark className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />,
      link: "/dashboard/registrations",
      bgColor: "bg-purple-100/50 group-hover:bg-purple-100"
    },
    {
      label: "View Certificates",
      icon: <Award className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />,
      link: "/dashboard/certificates",
      bgColor: "bg-amber-100/50 group-hover:bg-amber-100"
    },
    {
      label: "Edit Profile",
      icon: <User className="w-5 h-5 text-cyan-600 group-hover:text-cyan-700" />,
      link: "/dashboard/profile",
      bgColor: "bg-cyan-100/50 group-hover:bg-cyan-100"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-indigo-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link 
            key={index}
            href={action.link}
            className="bg-white hover:bg-gray-50 transition-colors p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transform transition-all"
          >
            <div className={`p-3 rounded-full mb-3 ${action.bgColor} transition-colors`}>
              {action.icon}
            </div>
            <span className="text-gray-700 font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
