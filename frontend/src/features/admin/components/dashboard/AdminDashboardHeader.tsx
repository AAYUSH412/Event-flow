import { Bell, CalendarClock, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";

interface Action {
  label: string;
  href: string;
  primary?: boolean;
}

interface AdminDashboardHeaderProps {
  title: string;
  username?: string;
  actions?: Action[];
}

export function AdminDashboardHeader({ title, username, actions = [] }: AdminDashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {username ? `Welcome back, ${username}` : title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with EventFlow today.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <CalendarClock size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <Settings size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          
          {actions.map((action, index) => (
            <Link 
              key={index}
              href={action.href} 
              className={`ml-2 flex items-center gap-2 ${
                action.primary 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
              } px-4 py-2 rounded-lg font-medium text-sm transition-colors`}
            >
              {action.primary && <PlusCircle size={16} />}
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
