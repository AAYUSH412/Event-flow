import React from "react";
import { User } from "@/features/common/services";
import { User as UserIcon, Mail, Building } from "lucide-react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

interface ModernProfileInformationProps {
  user: User | null;
  // Use a more generic type
  formMethods: UseFormReturn<Record<string, unknown>>;
}

export const ModernProfileInformation: React.FC<ModernProfileInformationProps> = ({
  user,
  formMethods,
}) => {
  const { register, formState: { errors } } = formMethods;

  return (
    <motion.div 
      className="rounded-xl bg-white p-6 shadow-lg border border-indigo-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <UserIcon className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <p className="text-sm text-gray-500">
            Your basic profile details and contact information
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Role - Read Only */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
            <span className="text-gray-700 font-medium">{user?.role || "Student"}</span>
            <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 py-0.5 px-2 rounded-full">
              {user?.role === "ADMIN" ? "Administrator" : 
               user?.role === "ORGANIZER" ? "Event Organizer" : "Student"}
            </span>
          </div>
          <p className="text-xs text-gray-500">This is your assigned role in the system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span>Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Your full name"
                className={`w-full rounded-lg border ${
                  errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                } px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 transition duration-200`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
            )}
          </div>
          
          {/* Email - Read Only */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span>Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                disabled
                {...register("email")}
                className="w-full bg-gray-50 rounded-lg border border-gray-300 text-gray-700 px-4 py-2.5 pl-10 focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-500">Contact admin to update your email</p>
          </div>
          
          {/* Department */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="department" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span>Department</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="department"
                {...register("department")}
                className={`w-full rounded-lg border ${
                  errors.department ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                } pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition duration-200 bg-white appearance-none`}
              >
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Arts">Arts</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department.message as string}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProfileInformation;
