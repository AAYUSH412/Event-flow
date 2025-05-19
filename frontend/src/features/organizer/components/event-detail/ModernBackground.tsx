"use client";

import { ReactNode } from "react";
import { PatternBackground } from "@/components/ui/animated-elements";
import { motion } from "framer-motion";

interface ModernBackgroundProps {
  children: ReactNode;
}

const ModernBackground = ({ children }: ModernBackgroundProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-purple-50/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 pt-6">
        {children}
      </div>
    </motion.div>
  );
};

export default ModernBackground;
