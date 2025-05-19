"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Edit, Trash2, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { SpotlightButton } from "@/components/ui/aceternity-elements";

interface ModernEventHeaderProps {
  id: string;
  onDeleteClick: () => void;
  isEventPast: boolean;
  isEventStarted: boolean;
  title: string;
}

const ModernEventHeader = ({ 
  id, 
  onDeleteClick, 
  isEventPast, 
  isEventStarted,
  title
}: ModernEventHeaderProps) => {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-indigo-100/50 p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => router.push('/dashboard/organizer/events')}
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to my events
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {title}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/events/${id}`}
            target="_blank"
            className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>Preview</span>
          </Link>
          
          <Link
            href={`#`}
            className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            <span>Share</span>
          </Link>
          
          {!isEventPast && (
            <Link
              href={`/dashboard/organizer/events/${id}/edit`}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </Link>
          )}
          
          {!isEventStarted && (
            <SpotlightButton>
              <button
                onClick={onDeleteClick}
                className="inline-flex items-center px-3 py-2 rounded-lg text-white hover:bg-opacity-90 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </button>
            </SpotlightButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernEventHeader;
