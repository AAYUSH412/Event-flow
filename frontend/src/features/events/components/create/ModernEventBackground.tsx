"use client";

import React from "react";
import { motion } from "framer-motion";

interface ModernEventBackgroundProps {
  children: React.ReactNode;
}

const ModernEventBackground: React.FC<ModernEventBackgroundProps> = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ModernEventBackground;
