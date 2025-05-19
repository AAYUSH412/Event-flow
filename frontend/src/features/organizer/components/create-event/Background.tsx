"use client";

import React from 'react';
import { motion } from 'framer-motion';

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

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-purple-50/20" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Background;
