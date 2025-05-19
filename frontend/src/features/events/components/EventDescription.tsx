"use client";

import { motion } from "framer-motion";
import { Event as EventType } from "@/features/common/services";

interface EventDescriptionProps {
  description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => {
  // Convert newlines to paragraphs
  const paragraphs = description.split('\n').filter(p => p.trim().length > 0);

  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
      <div className="prose max-w-none text-gray-700">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default EventDescription;
