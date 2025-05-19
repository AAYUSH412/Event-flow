import React from "react";
import { User } from "@/features/common/services";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/animated-elements";
import { Shield, CalendarDays } from "lucide-react";

interface ProfileHeaderProps {
  user: User | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // Generate initials from user name
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date helper
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundGradient className="w-full" containerClassName="w-full">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-indigo-100/50 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {getInitials(user?.name)}
              </div>
              {user?.role === "ADMIN" && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-md">
                  <Shield size={16} />
                </div>
              )}
              {user?.role === "ORGANIZER" && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-md">
                  <Shield size={16} />
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h1>
              <p className="text-indigo-600 font-medium">
                {user?.role === "ADMIN" ? "Administrator" : 
                 user?.role === "ORGANIZER" ? "Event Organizer" : "Student"}
              </p>
              
              <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <CalendarDays size={16} className="text-gray-400" />
                  <span>Member since {formatJoinDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ProfileHeader;
