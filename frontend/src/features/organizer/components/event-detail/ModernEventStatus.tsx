"use client";

import { motion } from "framer-motion";
import { Event as EventType } from "@/features/common/services";
import { BackgroundGradient } from "@/components/ui/animated-elements";

interface ModernEventStatusProps {
  event: EventType;
  regStats: {
    registered: number;
  };
}

const ModernEventStatus = ({ event, regStats }: ModernEventStatusProps) => {
  // Calculate event status
  const now = new Date();
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);
  
  let eventStatus = "";
  let statusColor = "";
  let statusBg = "";
  
  if (now < startDate) {
    eventStatus = "Upcoming";
    statusColor = "text-blue-800";
    statusBg = "bg-blue-100";
  } else if (now > endDate) {
    eventStatus = "Past";
    statusColor = "text-gray-800";
    statusBg = "bg-gray-100";
  } else {
    eventStatus = "Ongoing";
    statusColor = "text-green-800";
    statusBg = "bg-green-100";
  }
  
  // Calculate registration status
  let registrationStatus = "";
  let regStatusColor = "";
  let regStatusBg = "";
  
  if (event.maxParticipants && regStats.registered >= event.maxParticipants) {
    registrationStatus = "Full (Waitlisting)";
    regStatusColor = "text-orange-800";
    regStatusBg = "bg-orange-100";
  } else if (now > startDate) {
    registrationStatus = "Closed";
    regStatusColor = "text-red-800";
    regStatusBg = "bg-red-100";
  } else {
    registrationStatus = "Open";
    regStatusColor = "text-green-800";
    regStatusBg = "bg-green-100";
  }
  
  // Calculate time until event
  let timeUntil = "";
  if (now > endDate) {
    timeUntil = "Event has ended";
  } else if (now > startDate) {
    timeUntil = "Event is ongoing";
  } else {
    const days = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    timeUntil = `${days} days remaining`;
  }

  const items = [
    {
      label: "Current Status",
      value: eventStatus,
      valueColor: statusColor,
      valueBg: statusBg
    },
    {
      label: "Registration Status",
      value: registrationStatus,
      valueColor: regStatusColor,
      valueBg: regStatusBg
    },
    {
      label: "Time Until Event",
      value: timeUntil,
      valueColor: "text-gray-900",
      valueBg: "bg-transparent"
    },
    {
      label: "Start Date",
      value: startDate.toLocaleDateString(),
      valueColor: "text-gray-900",
      valueBg: "bg-transparent"
    },
    {
      label: "End Date",
      value: endDate.toLocaleDateString(),
      valueColor: "text-gray-900",
      valueBg: "bg-transparent"
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden h-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6 h-full">
          <h2 className="text-xl font-semibold mb-6">Event Status</h2>
          
          <div className="space-y-5">
            {items.map((item, index) => (
              <div key={index} className="space-y-2">
                <span className="block text-sm text-gray-500">{item.label}</span>
                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${item.valueColor} ${item.valueBg}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ModernEventStatus;
