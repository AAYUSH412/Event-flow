"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  username: string;
  avatarUrl?: string;
  notificationCount?: number;
}

export function DashboardHeader({
  username,
  avatarUrl,
  notificationCount = 0
}: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between mb-8 bg-white dark:bg-gray-800 p-4 lg:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{username}</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening with your events today
        </p>
      </div>

      <div className="hidden md:flex items-center rounded-lg bg-gray-100 dark:bg-gray-900 px-3 py-2 w-64 mr-4">
        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white -translate-y-1/3 translate-x-1/3">
              {notificationCount}
            </span>
          )}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pr-2 rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-lg font-medium text-gray-700 dark:text-gray-300">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-10 border border-gray-100 dark:border-gray-700">
              <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                My Profile
              </Link>
              <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <Link href="/auth/logout" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHeader;
