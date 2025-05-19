"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/AuthContext";
import { 
  Calendar, 
  Award, 
  Users, 
  BarChart3, 
  Settings, 
  PlusCircle, 
  Clock, 
  CheckSquare,
  ChevronRight,
  LogOut,
  HelpCircle,
  Bell,
  Layers,
  LayoutDashboard,
  X
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Listen for toggle sidebar events from the header
  useEffect(() => {
    const handleToggleSidebar = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsMobileOpen(customEvent.detail);
    };
    
    document.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => {
      document.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, []);

  // Define navigation categories and links based on user role
  const getNavCategories = () => {
    // Common categories for all roles
    const common = [
      {
        category: "Main",
        items: [
          {
            name: "Dashboard",
            href: user?.role === "ADMIN" ? "/dashboard/admin" : 
                  user?.role === "ORGANIZER" ? "/dashboard/organizer" : "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />
          }
        ]
      }
    ];

    // Role-specific categories
    if (user?.role === "ADMIN") {
      return [
        ...common,
        {
          category: "Management",
          items: [
            {
              name: "All Events",
              href: "/dashboard/admin/events",
              icon: <Calendar className="w-5 h-5" />
            },
            {
              name: "Users",
              href: "/dashboard/admin/users",
              icon: <Users className="w-5 h-5" />
            }
          ]
        },
        {
          category: "Insights",
          items: [
            {
              name: "Analytics",
              href: "/dashboard/admin/analytics",
              icon: <BarChart3 className="w-5 h-5" />
            },
            {
              name: "Reports",
              href: "/dashboard/admin/reports",
              icon: <Layers className="w-5 h-5" />
            }
          ]
        }
      ];
    }
    
    if (user?.role === "ORGANIZER") {
      return [
        ...common,
        {
          category: "Events",
          items: [
            {
              name: "My Events",
              href: "/dashboard/organizer/events",
              icon: <Calendar className="w-5 h-5" />
            },
            {
              name: "Create Event",
              href: "/dashboard/organizer/events/create",
              icon: <PlusCircle className="w-5 h-5" />,
              highlight: true
            },
            {
              name: "Manage Attendees",
              href: "/dashboard/organizer/attendees",
              icon: <CheckSquare className="w-5 h-5" />
            }
          ]
        },
        {
          category: "Analytics",
          items: [
            {
              name: "Event Statistics",
              href: "/dashboard/organizer/statistics",
              icon: <BarChart3 className="w-5 h-5" />
            }
          ]
        }
      ];
    }
    
    // Student-specific categories
    return [
      ...common,
      {
        category: "Events",
        items: [
          {
            name: "Upcoming Events",
            href: "/dashboard/events",
            icon: <Calendar className="w-5 h-5" />
          },
          {
            name: "My Registrations",
            href: "/dashboard/registrations",
            icon: <Clock className="w-5 h-5" />
          }
        ]
      },
      {
        category: "Resources",
        items: [
          {
            name: "My Certificates",
            href: "/dashboard/certificates",
            icon: <Award className="w-5 h-5" />
          }
        ]
      }
    ];
  };

  // Add user settings at the bottom for all roles
  const userSettings = [
    {
      name: "Profile Settings",
      href: "/dashboard/profile",
      icon: <Settings className="w-5 h-5" />
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="w-5 h-5" />
    },
    {
      name: "Help & Support",
      href: "/dashboard/help",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  const navCategories = getNavCategories();
  
  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/dashboard' || href === '/dashboard/admin' || href === '/dashboard/organizer') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Toggle category expansion for mobile
  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  // Variants for animation
  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile close button - appears when sidebar is open on mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50 md:hidden bg-background text-foreground p-2 rounded-full shadow-md"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Main sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col h-screen bg-background border-r border-border",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header with logo */}
        <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0">
          <Link href="/" className={cn(
            "flex items-center gap-2",
            collapsed ? "justify-center" : "justify-start"
          )}>
            <Logo size="sm" hideTextOnMobile={collapsed} />
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 rounded-full hidden md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform", 
              collapsed ? "rotate-0" : "rotate-180"
            )} />
          </Button>
        </div>

        {/* Navigation section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navCategories.map((category) => (
            <div key={category.category} className="space-y-1">
              {!collapsed && (
                <div className="flex items-center justify-between px-3 mb-1">
                  <h3 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                    {category.category}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full md:hidden"
                    onClick={() => toggleCategory(category.category)}
                  >
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform",
                      activeCategory === category.category ? "rotate-90" : "rotate-0"
                    )} />
                  </Button>
                </div>
              )}
              
              <AnimatePresence initial={false}>
                {(activeCategory === category.category || activeCategory === null || !isMobileOpen) && (
                  <motion.ul
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-1"
                  >
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          aria-label={item.name}
                          className={cn(
                            "flex items-center rounded-lg transition-all duration-200",
                            collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5 gap-3",
                            isActiveLink(item.href) 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground/70 hover:bg-accent hover:text-foreground",
                            item.highlight && !isActiveLink(item.href) && "bg-primary/5 text-primary"
                          )}
                        >
                          <span className={cn(
                            "flex items-center justify-center",
                            isActiveLink(item.href) ? "text-primary" : "text-muted-foreground",
                            item.highlight && !isActiveLink(item.href) && "text-primary"
                          )}>
                            {item.icon}
                          </span>
                          
                          {!collapsed && (
                            <span className="truncate font-medium text-sm">
                              {item.name}
                            </span>
                          )}
                          
                          {isActiveLink(item.href) && !collapsed && (
                            <motion.div
                              className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                              layoutId="sidebar-indicator"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* User settings section */}
        <div className={cn(
          "p-3 border-t border-border",
          collapsed ? "items-center" : "space-y-1"
        )}>
          {!collapsed && <h3 className="px-2 text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">Account</h3>}
          
          {userSettings.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-all duration-200",
                collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5 gap-3",
                isActiveLink(item.href) 
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              )}
            >
              <span className={cn(
                "flex items-center justify-center",
                isActiveLink(item.href) ? "text-primary" : "text-muted-foreground"
              )}>
                {item.icon}
              </span>
              
              {!collapsed && (
                <span className="truncate font-medium text-sm">{item.name}</span>
              )}
            </Link>
          ))}
          
          {/* Logout button */}
          <button
            onClick={() => logout()}
            className={cn(
              "flex items-center rounded-lg transition-all duration-200 w-full",
              collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5 gap-3",
              "text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && (
              <span className="truncate font-medium text-sm">Logout</span>
            )}
          </button>
          
          {/* User info - only show when expanded */}
          {!collapsed && (
            <div className="flex items-center gap-3 p-3 mt-3 rounded-lg bg-accent/50">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-sm truncate">{user?.name}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}