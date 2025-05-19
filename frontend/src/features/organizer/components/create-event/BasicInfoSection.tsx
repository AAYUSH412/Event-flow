"use client";

import { ImageIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { EventFormData } from "./EventFormSchema";

const BasicInfoSection = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
          1
        </span>
        Basic Information
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={`mt-1 block w-full rounded-lg shadow-sm py-3 px-4 border ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="e.g., Annual Technical Symposium"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className={`mt-1 block w-full rounded-lg shadow-sm py-3 px-4 border ${
              errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
            placeholder="Describe your event in detail"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">
            Banner Image URL
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ImageIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="bannerImage"
              type="text"
              {...register("bannerImage")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.bannerImage ? "border-red-300 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
              placeholder="https://example.com/banner.jpg"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Provide a URL to your event banner image
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInfoSection;
