"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface EventStatusBadgeProps {
  status: {
    color: string;
    text: string;
  };
}

const EventStatusBadge = ({ status }: EventStatusBadgeProps) => {
  const getBgColor = () => {
    switch(status.color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'gray': 
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <Link
        href="/events"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Link>
      
      <motion.div 
        className={`px-3 py-1 rounded-full text-sm font-medium ${getBgColor()}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
      >
        {status.text}
      </motion.div>
    </div>
  );
};

export default EventStatusBadge;
