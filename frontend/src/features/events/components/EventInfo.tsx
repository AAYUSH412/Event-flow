"use client";

import { 
  CalendarIcon, 
  MapPin, 
  Users, 
  School, 
  Tag
} from "lucide-react";
import { useEffect, useState } from "react";
import { Event as EventType } from "@/features/common/services";
import { motion } from "framer-motion";

interface EventInfoProps {
  event: EventType;
  formatDate: (date: string) => string;
  isSameDay: (date1: string, date2: string) => boolean;
}

const EventInfo = ({ event, formatDate, isSameDay }: EventInfoProps) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if location is a Google Maps URL
    if (event.location && (
      event.location.includes('maps.google.com') || 
      event.location.includes('goo.gl/maps')
    )) {
      setMapUrl(event.location);
    }
  }, [event.location]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
      
      <motion.div 
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CalendarIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Date and Time</h3>
            <p className="text-gray-700">
              {formatDate(event.startDateTime)}
              {!isSameDay(event.startDateTime, event.endDateTime) && (
                <>
                  <br />
                  <span>to {formatDate(event.endDateTime)}</span>
                </>
              )}
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Location</h3>
            {mapUrl ? (
              <a 
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                View on Google Maps
              </a>
            ) : (
              <p className="text-gray-700">{event.location}</p>
            )}
          </div>
        </motion.div>
        
        {event.department && (
          <motion.div variants={item} className="flex items-start gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <School className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Department</h3>
              <p className="text-gray-700">{event.department}</p>
            </div>
          </motion.div>
        )}
        
        {event.club && (
          <motion.div variants={item} className="flex items-start gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Tag className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Organizing Club</h3>
              <p className="text-gray-700">{event.club}</p>
            </div>
          </motion.div>
        )}
        
        {event.maxParticipants && (
          <motion.div variants={item} className="flex items-start gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Capacity</h3>
              <div className="flex flex-col">
                <p className="text-gray-700">
                  {event.registrationCount || 0}/{event.maxParticipants} participants
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ 
                      width: `${Math.min(((event.registrationCount || 0) / event.maxParticipants) * 100, 100)}%` 
                    }}
                  />
                </div>
                {event.maxParticipants > 0 && event.registrationCount >= event.maxParticipants && (
                  <span className="text-amber-600 text-sm mt-1">
                    Event is at full capacity. New registrations will be waitlisted.
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EventInfo;
