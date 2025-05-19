"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Event as EventType } from '@/features/common/services';
import EventCard from './EventCard';
import { formatDate } from '@/features/common/utils/formatDate';

interface EventsGridProps {
  events: EventType[];
  onDeleteClick: (id: string) => void;
  isFiltered?: boolean;
}

const EventsGrid: React.FC<EventsGridProps> = ({
  events,
  onDeleteClick,
  isFiltered = false
}) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {events.map((event, index) => (
        <EventCard 
          key={event._id} 
          event={event} 
          onDeleteClick={onDeleteClick} 
          index={index} 
          formatDate={formatDate}
        />
      ))}
    </motion.div>
  );
};

export default EventsGrid;
