"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ModernDeleteModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  eventTitle?: string;
  onDelete: () => void;
  onCancel: () => void;
}

const ModernDeleteModal: React.FC<ModernDeleteModalProps> = ({
  isOpen,
  isDeleting,
  eventTitle = "this event",
  onDelete,
  onCancel
}) => {
  if (!isOpen) return null;
  
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onCancel}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-200">
              {/* Header */}
              <div className="bg-red-50 p-5 flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Event</h3>
                </div>
                {!isDeleting && (
                  <button 
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete <span className="font-medium">{eventTitle}</span>? 
                  This action cannot be undone and all registrations will be lost.
                </p>
                
                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {!isDeleting && (
                    <button
                      onClick={onCancel}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center min-w-[80px] ${
                      isDeleting 
                        ? "bg-red-100 text-red-700 cursor-not-allowed" 
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete Event"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernDeleteModal;
