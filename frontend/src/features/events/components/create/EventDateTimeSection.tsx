"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";
import { EventFormData } from "./EventFormSchema";

const EventDateTimeSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Calendar className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Date & Time</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDateTime" className="block text-sm font-medium text-slate-700">
            Start Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="startDateTime"
              type="datetime-local"
              {...register("startDateTime")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.startDateTime ? "border-red-300 bg-red-50" : "border-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            />
          </div>
          {errors.startDateTime && (
            <p className="mt-1 text-sm text-red-600">{errors.startDateTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDateTime" className="block text-sm font-medium text-slate-700">
            End Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="endDateTime"
              type="datetime-local"
              {...register("endDateTime")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.endDateTime ? "border-red-300 bg-red-50" : "border-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            />
          </div>
          {errors.endDateTime && (
            <p className="mt-1 text-sm text-red-600">{errors.endDateTime.message}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800 flex items-center">
          <Info className="h-4 w-4 mr-2 text-blue-600" />
          All times are displayed in your local timezone
        </p>
      </div>
    </motion.div>
  );
};

export default EventDateTimeSection;
