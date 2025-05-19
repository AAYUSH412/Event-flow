"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
    <div className="relative h-20 w-20">
      <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
        <div className="h-12 w-12 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-300 border-l-transparent rounded-full animate-spin"></div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
        <div className="h-8 w-8 border-4 border-t-transparent border-r-indigo-300 border-b-transparent border-l-indigo-600 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <motion.div 
    className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <AlertCircle className="h-20 w-20 text-red-500 mb-6" />
    <h1 className="text-2xl font-bold text-gray-800 mb-3">Event Not Found</h1>
    <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
    <Link
      href="/events"
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
    >
      Browse Events
    </Link>
  </motion.div>
);

interface EventLayoutProps {
  isLoading: boolean;
  eventExists: boolean;
  children: React.ReactNode;
}

const EventLayout = ({ isLoading, eventExists, children }: EventLayoutProps) => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (isLoading) return <LoadingSpinner />;
  if (!eventExists) return <NotFound />;
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export { LoadingSpinner, NotFound, EventLayout };
