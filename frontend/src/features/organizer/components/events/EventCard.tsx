"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Event as EventType } from '@/features/common/services';
import { formatDate } from '@/features/common/utils/dateUtils';

interface EventCardProps {
  event: EventType;
  onDeleteClick: (id: string) => void;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDeleteClick, index }) => {
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Helper functions for event status
  const isEventPast = (endDateTime: string): boolean => {
    return new Date(endDateTime) < new Date();
  };

  const isEventUpcoming = (startDateTime: string): boolean => {
    return new Date(startDateTime) > new Date();
  };

  const isEventOngoing = (startDateTime: string, endDateTime: string): boolean => {
    const now = new Date();
    return new Date(startDateTime) <= now && new Date(endDateTime) >= now;
  };

  const getEventStatus = () => {
    if (isEventPast(event.endDateTime)) {
      return { 
        label: 'Past', 
        color: 'bg-gray-700',
        shadow: 'shadow-gray-400/20'
      };
    } else if (isEventOngoing(event.startDateTime, event.endDateTime)) {
      return { 
        label: 'Ongoing', 
        color: 'bg-green-500',
        shadow: 'shadow-green-400/30'
      };
    } else {
      return { 
        label: 'Upcoming', 
        color: 'bg-blue-500',
        shadow: 'shadow-blue-400/30'
      };
    }
  };

  const status = getEventStatus();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg 
        ${status.shadow} transition-all duration-300 ${isHovered ? 'translate-y-[-5px] shadow-xl' : ''}`}>
          <div className="relative h-48">
            <Image
              src={imageError ? '/images/event-placeholder.jpg' : (event.bannerImage || '/images/event-placeholder.jpg')}
              alt={event.title}
              fill
              className={`object-cover transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
              onError={() => setImageError(true)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
              <div>
                <span className={`${status.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                  {status.label}
                </span>
              </div>
              
              {event.category && (
                <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                  {event.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="p-5 flex-grow">
            <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors">
              <Link href={`/dashboard/organizer/events/${event._id}`}>
                {event.title}
              </Link>
            </h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                <span>{formatDate(event.startDateTime)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                <span>
                  {new Date(event.startDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                  {new Date(event.endDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                <span className="truncate">{event.location}</span>
              </div>
              
              {event.maxParticipants && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-indigo-600" />
                  <span>Max capacity: {event.maxParticipants}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>
          </div>
          
          <div className="px-5 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
            <Link
              href={`/dashboard/organizer/events/${event._id}`}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center"
            >
              View Details
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </Link>
            
            <div className="flex space-x-3">
              {!isEventPast(event.endDateTime) && (
                <Link
                  href={`/dashboard/organizer/events/${event._id}/edit`}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              )}
              
              {isEventUpcoming(event.startDateTime) && (
                <button
                  onClick={() => onDeleteClick(event._id)}
                  className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
    </motion.div>
  );
};

export default EventCard;
