"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Info, ImageIcon } from "lucide-react";
import { EventFormData } from "./EventFormSchema";

const EventBasicInfoSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Info className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Basic Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={`mt-1 block w-full rounded-lg shadow-sm py-3 px-4 border ${
              errors.title ? "border-red-300 bg-red-50" : "border-slate-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="e.g., Annual Technical Symposium"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className={`mt-1 block w-full rounded-lg shadow-sm py-3 px-4 border ${
              errors.description ? "border-red-300 bg-red-50" : "border-slate-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="Describe your event in detail. Include information about what attendees can expect."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bannerImage" className="block text-sm font-medium text-slate-700">
            Banner Image URL
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ImageIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="bannerImage"
              type="text"
              {...register("bannerImage")}
              className={`block w-full pl-10 pr-4 py-3 border ${
                errors.bannerImage ? "border-red-300 bg-red-50" : "border-slate-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
              placeholder="https://example.com/banner-image.jpg"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Add a banner image URL to make your event more attractive
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventBasicInfoSection;
