"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Briefcase, BookOpen, Tag } from "lucide-react";
import { EventFormData } from "./EventFormSchema";

const EventDetailsSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<EventFormData>();
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <BookOpen className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Event Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-700">
            Department
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-slate-400" />
            </div>
            <select
              id="department"
              {...register("department")}
              className="block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              <option value="">Select a department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Arts & Humanities">Arts & Humanities</option>
              <option value="Sciences">Sciences</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="club" className="block text-sm font-medium text-slate-700">
            Club/Organization
          </label>
          <input
            id="club"
            type="text"
            {...register("club")}
            className="mt-1 block w-full rounded-lg shadow-sm py-3 px-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            placeholder="e.g., Coding Club"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-slate-400" />
            </div>
            <select
              id="category"
              {...register("category")}
              className="block w-full rounded-lg shadow-sm py-3 pl-10 pr-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              <option value="">Select a category</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Competition">Competition</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Academic">Academic</option>
              <option value="Social">Social</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetailsSection;
