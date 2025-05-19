import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsTickerProps {
  className?: string;
}

export const StatsTicker: React.FC<StatsTickerProps> = ({ className }) => {
  const [eventCount, setEventCount] = useState(3450);
  const [studentCount, setStudentCount] = useState(12780);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the stats randomly to show "real-time" updates
      setEventCount(prev => prev + Math.floor(Math.random() * 5));
      setStudentCount(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className={cn(
        "flex flex-wrap justify-center bg-black/80 text-white px-4 py-2 rounded-full shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center mr-6">
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full mr-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="font-medium mr-2">Events Managed:</span>
        <motion.span 
          className="font-bold"
          key={eventCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {eventCount.toLocaleString()}
        </motion.span>
      </div>
      
      <div className="flex items-center">
        <motion.div
          className="w-3 h-3 bg-purple-500 rounded-full mr-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        />
        <span className="font-medium mr-2">Students Registered:</span>
        <motion.span 
          className="font-bold"
          key={studentCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {studentCount.toLocaleString()}
        </motion.span>
      </div>
    </motion.div>
  );
};
