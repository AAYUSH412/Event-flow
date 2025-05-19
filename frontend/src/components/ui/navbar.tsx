"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/features/auth/AuthContext";
import { useTheme } from "next-themes";
import { 
  Calendar,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun,
  Award,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { href: string; label: string; icon?: React.ReactNode }[];
  isLoggedIn: boolean;
}

const NavItem = ({ href, label, icon, active, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-all duration-200 relative flex items-center gap-1.5 rounded-lg group",
        active 
          ? "text-primary bg-primary/5 dark:bg-primary/10" 
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      {icon && <span className="text-primary/80">{icon}</span>}
      <span>{label}</span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

const MobileMenu = ({ isOpen, onClose, navItems, isLoggedIn }: MobileMenuProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-dvh w-3/4 max-w-sm bg-background/95 backdrop-blur-sm border-l border-border shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <Logo size="sm" />
                <Button 
                  onClick={onClose}
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-muted-foreground">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun size={16} className="text-amber-300" />
                  ) : (
                    <Moon size={16} />
                  )}
                </Button>
              </div>

              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "px-3 py-2.5 rounded-lg transition duration-200 flex items-center gap-3",
                      pathname === item.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto pt-6 border-t border-border">
                {isLoggedIn ? (
                  <>
                    {user && (
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-accent/50">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    )}
                    <Link 
                      href="/dashboard"
                      onClick={onClose}
                      className="flex items-center px-3 py-2.5 mb-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors w-full"
                    >
                      <User className="w-4 h-4 mr-3 text-primary" />
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 py-2">
                    <Link
                      href="/auth/login"
                      onClick={onClose}
                      className="w-full px-4 py-2 text-sm font-medium text-center rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={onClose}
                      className="w-full px-4 py-2 text-sm font-medium text-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Ref for the profile dropdown menu
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Close profile dropdown when navigating
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [pathname]);

  // Navigation items
  const navItems = [
    { href: "/", label: "Home", icon: <Calendar className="h-4 w-4" /> },
    { href: "/events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
    { href: "/#about", label: "About", icon: <ExternalLink className="h-4 w-4" /> },
    { href: "/#contact", label: "Contact", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 border-b",
          isScrolled 
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
            : "bg-background"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-6 md:gap-10">
              {/* Logo */}
              <Link href="/" className="hidden md:block">
                <Logo size="md" />
              </Link>
              
              <Link href="/" className="md:hidden">
                <Logo size="sm" hideTextOnMobile />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavItem 
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={pathname === item.href}
                  />
                ))}
              </nav>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hidden md:flex"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-300" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Notification bell for logged in users */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative hidden md:flex"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              )}

              {/* Auth buttons */}
              {isAuthenticated ? (
                <div className="relative hidden md:block">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-3"
                    onClick={toggleProfileMenu}
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden sm:inline font-normal">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4 opacity-50 transition-transform" />
                  </Button>

                  {/* Profile dropdown menu */}
                  {isProfileMenuOpen && (
                    <div 
                      ref={profileMenuRef}
                      className="absolute right-0 mt-2 w-60 origin-top-right rounded-md border bg-card text-card-foreground shadow-lg z-50"
                    >
                      <div className="p-2 flex flex-col gap-0.5">
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Dashboard
                        </Link>
                        
                        {user?.role === "STUDENT" && (
                          <Link 
                            href="/dashboard/certificates" 
                            className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                          >
                            <Award className="w-4 h-4" />
                            Certificates
                          </Link>
                        )}
                        
                        <div className="h-px bg-muted my-1" />
                        
                        <button 
                          onClick={() => logout()}
                          className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden rounded-full"
                onClick={toggleMobileMenu}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navItems}
        isLoggedIn={isAuthenticated}
      />
    </>
  );
}