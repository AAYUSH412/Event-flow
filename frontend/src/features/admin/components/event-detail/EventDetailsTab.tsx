"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, MapPin, Tag, School, Users, 
  Clock, ChevronDown, ChevronUp, Globe, 
  Bookmark, FileText, Award, ExternalLink 
} from "lucide-react";
import { Event as EventType } from "@/features/common/services";
import { formatDate } from "@/features/common/utils/dateUtils";
import { PatternBackground, FloatingAnimation } from "@/components/ui/animated-elements";

interface EventDetailsTabProps {
  event: EventType;
}

const EventDetailsTab = ({ event }: EventDetailsTabProps) => {
  // Mock registration stats for improved UI - these would typically come from a prop
  const regStats = {
    registered: 42,
    waitlisted: 15,
    cancelled: 3,
    total: 60
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const getEventStatusClass = () => {
    const now = new Date();
    const startDate = new Date(event.startDateTime);
    const endDate = new Date(event.endDateTime);
    
    if (now < startDate) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
    } else if (now > endDate) {
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    } else {
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
    }
  };
  
  const getEventStatusText = () => {
    const now = new Date();
    const startDate = new Date(event.startDateTime);
    const endDate = new Date(event.endDateTime);
    
    if (now < startDate) {
      return "Upcoming";
    } else if (now > endDate) {
      return "Past";
    } else {
      return "Ongoing";
    }
  };

  const primaryInfoItems = [
    {
      icon: <Calendar className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Date",
      value: formatDate(event.startDateTime) !== formatDate(event.endDateTime) 
        ? `${formatDate(event.startDateTime)} - ${formatDate(event.endDateTime)}`
        : formatDate(event.startDateTime)
    },
    {
      icon: <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Time",
      value: `${new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    },
    {
      icon: <MapPin className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Location",
      value: event.location,
      isLink: event.location.includes('maps.google.com') || event.location.includes('goo.gl/maps')
    },
    {
      icon: <Users className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Attendance",
      value: event.maxParticipants 
        ? `${regStats.registered} / ${event.maxParticipants} registered (${regStats.waitlisted} waitlisted)`
        : `${regStats.registered} registered (unlimited spots)`
    }
  ];

  const secondaryInfoItems = [
    {
      icon: <Tag className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Category",
      value: event.category || "General"
    },
    {
      icon: <School className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Department",
      value: event.department || "All Departments"
    },
    {
      icon: <Bookmark className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Club/Organization",
      value: event.club || "N/A"
    },
    {
      icon: <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      label: "Event ID",
      value: event._id
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Left column */}
      <div className="md:col-span-2 space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="relative">
            <PatternBackground className="opacity-5" />
            
            {/* Event Banner */}
            <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
              <Image
                src={imageError ? '/images/event-placeholder.jpg' : (event.bannerImage || '/images/event-placeholder.jpg')}
                alt={event.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEventStatusClass()}`}>
                  {getEventStatusText()}
                </span>
              </div>
            </div>
            
            {/* Event Title and Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{event.title}</h2>
              
              <div className="relative">
                <div className={`prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 ${!showFullDescription && 'line-clamp-3'}`}>
                  {event.description}
                </div>
                
                {event.description && event.description.length > 200 && (
                  <button
                    onClick={toggleDescription}
                    className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                  >
                    {showFullDescription ? (
                      <>Show less <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show more <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Primary Event Info */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Event Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {primaryInfoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                  {item.isLink ? (
                    <a 
                      href={item.value} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                    >
                      View on Maps <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Right column */}
      <div className="space-y-6">
        {/* Event Status Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <FloatingAnimation className="opacity-10">
            <div className="absolute -right-6 -top-6 text-indigo-100 dark:text-indigo-900">
              <Award className="w-24 h-24" />
            </div>
          </FloatingAnimation>
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Registration Stats</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{regStats.registered}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                  style={{ 
                    width: event.maxParticipants 
                      ? `${Math.min(100, (regStats.registered / event.maxParticipants) * 100)}%`
                      : `100%`
                  }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Waitlisted</p>
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{regStats.waitlisted}</p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Cancelled</p>
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{regStats.cancelled}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Secondary Event Info */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Additional Details</h3>
          
          <div className="space-y-4">
            {secondaryInfoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-gray-800 dark:text-gray-200">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetailsTab;
