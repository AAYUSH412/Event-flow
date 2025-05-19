import React from "react";
import { PatternBackground } from "@/components/ui/animated-elements";
import { motion } from "framer-motion";

interface ProfileBackgroundProps {
  children: React.ReactNode;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <PatternBackground
          dotColor="rgba(99, 102, 241, 0.08)"
          dotSize={1.5}
          dotSpacing={25}
        />
      </div>
      
      {/* Top decorative shape */}
      <motion.div
        className="absolute top-0 -right-20 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Bottom decorative shape */}
      <motion.div
        className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      {/* Content container */}
      <div className="relative z-10 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default ProfileBackground;
