"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Registration, Event } from "@/features/common/services";
import RegistrationCard from "./RegistrationCard";

interface RegistrationListProps {
  registrations: (Registration & { event?: Event })[];
  onCancelRegistration: (eventId: string) => Promise<void>;
  isFiltered: boolean;
}

const RegistrationList: React.FC<RegistrationListProps> = ({
  registrations,
  onCancelRegistration,
  isFiltered
}) => {
  return (
    <AnimatePresence mode="wait">
      {registrations.length > 0 ? (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="registration-list"
        >
          {registrations.map((registration, index) => (
            <motion.div
              key={registration._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              }}
            >
              <RegistrationCard
                registration={registration}
                onCancel={onCancelRegistration}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="no-registrations"
        >
          <p className="text-gray-600 mb-2">
            {isFiltered 
              ? "No registrations match your current filters." 
              : "You don't have any registrations yet."}
          </p>
          {isFiltered && (
            <button
              className="text-indigo-600 font-medium hover:text-indigo-800"
              onClick={() => window.location.reload()}
            >
              Clear filters
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationList;
