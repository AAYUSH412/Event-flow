"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PatternBackground } from '@/components/ui/animated-elements';

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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </motion.div>
  );
};

export default ModernBackground;
