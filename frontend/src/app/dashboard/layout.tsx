"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Protect dashboard routes
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (!loading && user) {
      // Get the current pathname
      const pathname = window.location.pathname;
      
      // Redirect to appropriate dashboard based on role if accessing the generic dashboard
      if (pathname === "/dashboard" || pathname === "/dashboard/") {
        if (user.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (user.role === "ORGANIZER") {
          router.push("/dashboard/organizer");
        } else {
          router.push("/dashboard/student");
        }
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 md:ml-[240px]">
          <DashboardHeader />
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}