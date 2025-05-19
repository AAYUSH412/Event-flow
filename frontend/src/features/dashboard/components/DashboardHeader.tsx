"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  Search, 
  Settings, 
  MessageSquare, 
  HelpCircle,
  Calendar,
  ChevronDown
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  // Sample notifications
  const notifications = [
    { id: 1, title: "New event registration", message: "3 new students registered for Tech Conference", time: "5 min ago", read: false },
    { id: 2, title: "Certificate issued", message: "Your certificate for JavaScript Workshop is ready", time: "1 hour ago", read: false },
    { id: 3, title: "Event reminder", message: "Web Development Workshop starts in 24 hours", time: "3 hours ago", read: true },
  ];

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Toggle sidebar visibility (will be used for mobile)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // You would typically use a context or state to control the sidebar from the parent
    document.dispatchEvent(new CustomEvent('toggle-sidebar', { detail: !isSidebarOpen }));
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-30 w-full transition-all duration-200">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold tracking-tight hidden sm:block">
            {user?.role === "ADMIN" ? "Admin Dashboard" : 
             user?.role === "ORGANIZER" ? "Organizer Dashboard" : "Student Dashboard"}
          </h1>
        </div>
        
        {/* Search bar */}
        <div className="hidden md:block max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, certificates..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Calendar button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hidden md:flex"
            title="Calendar"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
            </Button>
            
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-background rounded-lg shadow-lg z-10 border border-border overflow-hidden"
                >
                  <div className="p-3 border-b border-border bg-background">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Notifications</span>
                      <Button variant="ghost" size="sm" className="text-xs hover:text-primary">
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "p-3 border-b border-border hover:bg-accent/50 transition-colors cursor-pointer",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <div className="flex gap-3 items-start">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            notification.read ? "bg-muted" : "bg-primary"
                          )} />
                          <div>
                            <div className="font-medium text-sm">{notification.title}</div>
                            <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="p-6 text-center">
                        <p className="text-muted-foreground">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-border bg-background">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-center text-primary hover:text-primary"
                    >
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Help button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hidden md:flex"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {/* Profile menu */}
          <div className="relative" ref={profileRef}>
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-2 sm:px-3 rounded-full hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-sm hidden sm:inline truncate max-w-[100px]">
                {user?.name?.split(' ')[0]}
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isProfileOpen ? "rotate-180" : ""
              )} />
            </Button>
            
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-lg z-10 border border-border overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <Link href="/dashboard/profile" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors w-full text-left">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors w-full text-left">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link href="/help-support" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors w-full text-left">
                      <MessageSquare className="w-4 h-4" />
                      Help & Support
                    </Link>
                    <div className="h-px bg-border my-2" />
                    <button 
                      onClick={logout}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}