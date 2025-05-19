"use client";

import { Calendar } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { EventFormData } from "./EventFormSchema";

const DateTimeSection = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
          2
        </span>
        Date & Time
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">
            Start Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="startDateTime"
              type="datetime-local"
              {...register("startDateTime")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.startDateTime ? "border-red-300 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            />
          </div>
          {errors.startDateTime && (
            <p className="mt-1 text-sm text-red-600">{errors.startDateTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">
            End Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="endDateTime"
              type="datetime-local"
              {...register("endDateTime")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.endDateTime ? "border-red-300 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            />
          </div>
          {errors.endDateTime && (
            <p className="mt-1 text-sm text-red-600">{errors.endDateTime.message}</p>
          )}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-xs text-gray-500">
          All times are displayed in your local timezone
        </p>
      </div>
    </motion.div>
  );
};

export default DateTimeSection;
