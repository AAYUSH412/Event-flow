"use client";

import React from "react";
import { Ticket, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface RegistrationsHeaderProps {
  totalRegistrations: number;
}

const RegistrationsHeader: React.FC<RegistrationsHeaderProps> = ({ totalRegistrations }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white shadow-md mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="bg-white/20 p-3 rounded-lg mr-4">
          <Ticket className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Registrations</h1>
          <p className="text-indigo-100 mt-1">
            {totalRegistrations === 0 
              ? "No events registered yet" 
              : totalRegistrations === 1 
                ? "1 event registered" 
                : `${totalRegistrations} events registered`
            }
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-4 mt-6">
        <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Your event tickets are all in one place</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationsHeader;
