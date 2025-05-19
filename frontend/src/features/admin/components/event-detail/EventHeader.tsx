"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Edit, Trash2, Share2 } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/animated-elements";
import { SpotlightButton } from "@/components/ui/aceternity-elements";
import { formatDate } from "@/features/common/utils/dateUtils";
import { Event as EventType } from "@/features/common/services";

interface EventHeaderProps {
  event: EventType;
  openDeleteModal: () => void;
}

const EventHeader = ({ event, openDeleteModal }: EventHeaderProps) => {
  // Check if event is past or ongoing
  const isEventPast = event ? new Date(event.endDateTime) < new Date() : false;
  const isEventStarted = event ? new Date(event.startDateTime) < new Date() : false;
  const id = event._id;
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const eventUrl = `${window.location.origin}/events/${id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: eventUrl
        });
      } else {
        await navigator.clipboard.writeText(eventUrl);
        alert("Event link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl"
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link
                href="/dashboard/admin/events"
                className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to all events
              </Link>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {event.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center flex-wrap gap-3">
                <span className="flex items-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                    {formatDate(event.startDateTime)}
                  </span>
                </span>
                <span className="flex items-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    {event.location}
                  </span>
                </span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/events/${id}`}
                target="_blank"
                className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>Preview</span>
              </Link>
              
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                <span>{isSharing ? "Sharing..." : "Share"}</span>
              </button>
              
              {!isEventPast && (
                <Link
                  href={`/dashboard/admin/events/${id}/edit`}
                  className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Edit</span>
                </Link>
              )}                {!isEventStarted && (
                  <SpotlightButton>
                    <button
                      onClick={openDeleteModal}
                      className="inline-flex items-center px-3 py-2 rounded-lg text-white hover:bg-opacity-90 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span>Delete</span>
                    </button>
                  </SpotlightButton>
                )}
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default EventHeader;
