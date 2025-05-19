"use client";

import React from "react";
import { Calendar, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const EmptyRegistrationState: React.FC = () => {
  return (
    <motion.div 
      className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-indigo-100 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto w-20 h-20 flex items-center justify-center bg-indigo-50 rounded-full mb-6">
        <Calendar className="h-10 w-10 text-indigo-500" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Registrations Yet</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        You haven&apos;t registered for any events yet. Explore our upcoming events and find something exciting to attend!
      </p>
      
      <Link
        href="/events"
        className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
      >
        <Search className="w-5 h-5 mr-2" />
        Discover Events
      </Link>
    </motion.div>
  );
};

export default EmptyRegistrationState;
