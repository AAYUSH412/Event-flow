"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { formatDateShort } from "@/features/common/utils/dateUtils";
import Image from "next/image";

interface SimilarEventsProps {
  events: any[];
}

const SimilarEvents = ({ events }: SimilarEventsProps) => {
  if (!events || events.length === 0) return null;

  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Events</h2>

      <div className="grid grid-cols-1 gap-5">
        {events.map((event) => (
          <Link 
            key={event._id} 
            href={`/events/${event._id}`}
            className="group flex bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0">
              <Image
                src={event.bannerImage || '/images/event-placeholder.jpg'}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                  <span>{formatDateShort(event.startDateTime)}</span>
                </div>
              </div>
              <div className="text-xs mt-2">
                {event.category && (
                  <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                    {event.category}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarEvents;
