"use client";

import React from 'react';
import { motion } from "framer-motion";

interface PatternBackgroundProps {
  dotColor: string;
  dotSize: number;
  dotSpacing: number;
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  dotColor, 
  dotSize, 
  dotSpacing 
}) => {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent 0)`,
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`
      }}
    />
  );
};

interface ModernBackgroundProps {
  children: React.ReactNode;
}

const ModernBackground: React.FC<ModernBackgroundProps> = ({ children }) => {
  return (
    <motion.div 
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default ModernBackground;
