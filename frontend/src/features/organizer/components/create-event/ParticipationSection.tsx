"use client";

import { Users, Tag } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { EventFormData } from "./EventFormSchema";

const ParticipationSection = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  const categories = [
    "Academic", "Workshop", "Conference", "Social", "Cultural",
    "Sports", "Hackathon", "Competition", "Seminar", "Other"
  ];

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
          5
        </span>
        Participation Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
            Maximum Participants
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="maxParticipants"
              type="number"
              min="1"
              {...register("maxParticipants")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.maxParticipants ? "border-red-300 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
              placeholder="e.g., 50"
            />
          </div>
          {errors.maxParticipants && (
            <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Leave empty for unlimited participants
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Event Category
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="category"
              {...register("category")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.category ? "border-red-300 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 appearance-none`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ParticipationSection;
