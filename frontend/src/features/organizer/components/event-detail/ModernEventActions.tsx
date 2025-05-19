"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Edit, Trash2, Share2, Copy, ExternalLink, ChevronRight } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/animated-elements";
import { SpotlightButton } from "@/components/ui/aceternity-elements";

interface ModernEventActionsProps {
  id: string;
  onDeleteClick: () => void;
  isEventPast: boolean;
  isEventStarted: boolean;
}

const ModernEventActions = ({ 
  id, 
  onDeleteClick, 
  isEventPast, 
  isEventStarted 
}: ModernEventActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden h-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6 h-full">
          <h2 className="text-xl font-semibold mb-6">Actions</h2>
          
          <div className="space-y-3">
            <Link href={`/events/${id}`} target="_blank">
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                    <ExternalLink className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>View Public Page</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
            
            {!isEventPast && (
              <Link href={`/dashboard/organizer/events/${id}/edit`}>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 rounded-lg mr-3">
                      <Edit className="w-5 h-5 text-amber-600" />
                    </div>
                    <span>Edit Event</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            )}
            
            <Link href={`/dashboard/organizer/events/create?clone=${id}`}>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Copy className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Clone Event</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
            
            <button 
              onClick={() => {
                // In a real app, this would trigger a share dialog
                navigator.clipboard.writeText(`${window.location.origin}/events/${id}`);
                toast.success("Event link copied to clipboard");
              }}
              className="w-full"
            >
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Share2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Share Event</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
            
            {!isEventStarted && (
              <div className="pt-2">
                <SpotlightButton className="w-full">
                  <button
                    onClick={onDeleteClick}
                    className="w-full text-center p-3 rounded-lg text-white"
                  >
                    <div className="flex items-center justify-center">
                      <Trash2 className="w-5 h-5 mr-2" />
                      <span>Delete Event</span>
                    </div>
                  </button>
                </SpotlightButton>
              </div>
            )}
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ModernEventActions;
