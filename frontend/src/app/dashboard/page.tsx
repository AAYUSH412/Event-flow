"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";

// This is a redirect page that will send users to their role-specific dashboard
export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (user.role === "ORGANIZER") {
        router.push("/dashboard/organizer");
      } else {
        router.push("/dashboard/student");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}