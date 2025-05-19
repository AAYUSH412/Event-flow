"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Users } from "lucide-react";
import { EventFormData } from "./EventFormSchema";
import Image from "next/image";

const EventMediaSection: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<EventFormData>();
  const [imageError, setImageError] = useState(false);
  const bannerImage = watch("bannerImage");
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Users className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Participation</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-slate-700">
            Maximum Participants
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="maxParticipants"
              type="number"
              min="1"
              {...register("maxParticipants")}
              className={`block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border ${
                errors.maxParticipants ? "border-red-300 bg-red-50" : "border-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
              placeholder="e.g., 100"
            />
          </div>
          {errors.maxParticipants && (
            <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            Leave empty for unlimited participants
          </p>
        </div>

        {bannerImage && (
          <div className="mt-4">
            <p className="block text-sm font-medium text-slate-700 mb-2">Banner Image Preview</p>
            <div className="relative h-44 w-full rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={imageError ? '/images/event-placeholder.jpg' : bannerImage}
                alt="Banner preview"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventMediaSection;
