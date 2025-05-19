import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getRandomInt } from '@/lib/utils';

interface EventPopupProps {
  title: string;
  date: string;
  color: string;
  index: number;
}

const eventTitles = [
  "Tech Symposium",
  "Career Fair",
  "Art Exhibition",
  "Guest Lecture",
  "Music Festival",
  "Hackathon",
  "Workshop",
  "Sports Tournament",
  "Cultural Night",
  "Research Conference"
];

const eventColors = [
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-cyan-500"
];

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const generateRandomEvent = (index: number): EventPopupProps => {
  const month = months[getRandomInt(0, 11)];
  const day = getRandomInt(1, 28);
  return {
    title: eventTitles[index % eventTitles.length],
    date: `${month} ${day}`,
    color: eventColors[index % eventColors.length],
    index
  };
};

const EventPopup: React.FC<EventPopupProps> = ({ title, date, color, index }) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-lg shadow-lg p-3 text-white w-40 z-10",
        color
      )}
      initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, y: 0, x: index % 2 === 0 ? -80 : 80 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      style={{
        top: `${20 + (index * 15)}%`,
        right: index % 2 === 0 ? 'auto' : '0',
        left: index % 2 === 0 ? '0' : 'auto',
      }}
    >
      <div className="text-xs font-bold">{date}</div>
      <div className="font-semibold text-sm">{title}</div>
    </motion.div>
  );
};

export const CalendarAnimation: React.FC = () => {
  const [events, setEvents] = useState<EventPopupProps[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Change month every 3 seconds
      setCurrentMonth(prev => (prev + 1) % 12);
      
      // Add a new event
      if (events.length < 4) {
        setEvents(prev => [...prev, generateRandomEvent(prev.length)]);
      } else {
        // Replace a random event
        setEvents(prev => {
          const newEvents = [...prev];
          newEvents[getRandomInt(0, 3)] = generateRandomEvent(getRandomInt(0, 9));
          return newEvents;
        });
      }
    }, 3000);

    // Initialize with 2 events
    setEvents([generateRandomEvent(0), generateRandomEvent(1)]);

    return () => clearInterval(interval);
  }, []);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-4 w-64"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-3 rounded-t-lg text-center font-bold">
          {months[currentMonth]} 2025
        </div>
        <div className="grid grid-cols-7 gap-1 my-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-b-lg">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => {
                const isActive = events.some(event => {
                  const eventDay = parseInt(event.date.split(" ")[1]);
                  return eventDay === day;
                });
                return (
                  <motion.div 
                    key={dayIndex}
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium m-0.5",
                      isActive 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                    whileHover={{ scale: 1.1 }}
                  >
                    {day}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {events.map((event, i) => (
          <EventPopup key={i} {...event} />
        ))}
      </AnimatePresence>
    </div>
  );
};
