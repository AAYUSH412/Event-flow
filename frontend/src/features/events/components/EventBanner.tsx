"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";

interface EventBannerProps {
  bannerImage?: string;
  title: string;
  category?: string;
}

const EventBanner = ({ bannerImage, title, category }: EventBannerProps) => {
  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden mb-8">
      <Image
        src={bannerImage || '/images/event-placeholder.jpg'}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Event title */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{title}</h1>
        
        {/* Category badge */}
        {category && (
          <span className="inline-flex items-center bg-indigo-600/90 text-white text-sm font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            <Tag className="w-3 h-3 mr-1.5" />
            {category}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default EventBanner;
