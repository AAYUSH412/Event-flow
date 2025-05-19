"use client";

import { useAuth } from "@/features/auth/AuthContext";
import { useStudentDashboard } from "@/features/student/hooks/useStudentDashboard";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/animated-elements";
import StudentDashboardLoader from "@/features/student/components/StudentDashboardLoader";

// Modern Components
import DashboardBackground from "@/features/student/components/DashboardBackground";
import WelcomeHeader from "@/features/student/components/WelcomeHeader";
import ModernDashboardStats from "@/features/student/components/ModernDashboardStats";
import ModernRecentRegistrations from "@/features/student/components/ModernRecentRegistrations";
import ModernUpcomingEvents from "@/features/student/components/ModernUpcomingEvents";
import QuickActionsPanel from "@/features/student/components/QuickActionsPanel";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { upcomingEvents, registrations, isLoading } = useStudentDashboard();

  if (isLoading) {
    return <StudentDashboardLoader />;
  }

  return (
    <motion.div 
      className="relative min-h-[85vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardBackground>
        {/* Welcome Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WelcomeHeader userName={user?.name} />
        </motion.div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ModernDashboardStats 
            upcomingEvents={upcomingEvents} 
            registrations={registrations} 
          />
        </motion.div>
        
        {/* Quick Actions Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <QuickActionsPanel />
        </motion.div>
        
        {/* Recent Events and Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BackgroundGradient className="h-full" containerClassName="h-full">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-indigo-100/50 h-full shadow-md">
                <ModernRecentRegistrations registrations={registrations} />
              </div>
            </BackgroundGradient>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BackgroundGradient className="h-full" containerClassName="h-full">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-indigo-100/50 h-full shadow-md">
                <ModernUpcomingEvents events={upcomingEvents} />
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>
      </DashboardBackground>
    </motion.div>
  );
}
