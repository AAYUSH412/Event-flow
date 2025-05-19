"use client";

import { MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { EventFormData } from "./EventFormSchema";

const LocationSection = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
          3
        </span>
        Location
      </h2>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Event Location <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="location"
            type="text"
            {...register("location")}
            className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
              errors.location ? "border-red-300 bg-red-50" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="e.g., Conference Hall, Building A"
          />
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Specify the exact location where the event will be held
        </p>
      </div>
    </motion.div>
  );
};

export default LocationSection;
