"use client";

import React from "react";
import { motion } from "framer-motion";

interface EventCreateBackgroundProps {
  children: React.ReactNode;
}

const EventCreateBackground: React.FC<EventCreateBackgroundProps> = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen relative bg-slate-50 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-70"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-indigo-50 blur-3xl opacity-70"></div>
        
        {/* Bottom left circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-50 blur-3xl opacity-70"></div>
        <div className="absolute bottom-40 -left-20 w-72 h-72 rounded-full bg-pink-50 blur-3xl opacity-70"></div>

        {/* Dot pattern */}
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.2))]"></div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default EventCreateBackground;
