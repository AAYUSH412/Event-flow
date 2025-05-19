"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { MapPin } from "lucide-react";
import { EventFormData } from "./EventFormSchema";

const EventLocationSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <MapPin className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Location</h2>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-700">
          Event Location <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="location"
            type="text"
            {...register("location")}
            className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
              errors.location ? "border-red-300 bg-red-50" : "border-slate-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="e.g., Main Auditorium, Block A or Google Maps link"
          />
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
        <p className="mt-1 text-xs text-slate-500">
          You can enter a physical address or a Google Maps link
        </p>
      </div>
    </motion.div>
  );
};

export default EventLocationSection;
