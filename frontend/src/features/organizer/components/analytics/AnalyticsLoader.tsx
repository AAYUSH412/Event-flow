"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PatternBackground } from "@/components/ui/animated-elements";
import LoadingSpinner from "@/features/common/components/LoadingSpinner";

interface AnalyticsLoaderProps {
  message?: string;
}

export const AnalyticsLoader = ({ message = "Loading analytics data..." }: AnalyticsLoaderProps) => {
  const [dotCount, setDotCount] = useState(0);

  // Animate the dots
  useState(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 400);
    
    return () => clearInterval(interval);
  });

  const dots = ".".repeat(dotCount);

  return (
    <div className="relative min-h-[60vh]">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center h-full py-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <LoadingSpinner size="lg" variant="ripple" color="indigo" />
          </div>
          <p className="text-center text-gray-600 text-lg">
            {message}<span className="inline-block w-8">{dots}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsLoader;
