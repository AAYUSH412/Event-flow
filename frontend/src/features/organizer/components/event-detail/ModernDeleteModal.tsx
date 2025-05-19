"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertCircle, X } from "lucide-react";

interface ModernDeleteModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: () => void;
  eventTitle?: string;
}

const ModernDeleteModal = ({ 
  isOpen, 
  isDeleting, 
  onCancel, 
  onDelete,
  eventTitle = "this event"
}: ModernDeleteModalProps) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onCancel}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden mx-4">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Delete Event</h3>
                  <button
                    onClick={onCancel}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold">{eventTitle}</span>?
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      This action cannot be undone. All related registrations and data will be permanently deleted.
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-end">
                  <button
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Event</span>
                      </>
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
