"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/animated-elements';

interface EventsHeaderProps {
  eventsCount: number;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({ eventsCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden">
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-indigo-100/50 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                My Events
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track your {eventsCount} {eventsCount === 1 ? 'event' : 'events'}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/dashboard/organizer/events/create"
                className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Event
              </Link>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default EventsHeader;
