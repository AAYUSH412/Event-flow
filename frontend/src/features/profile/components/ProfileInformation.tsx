import React from "react";
import { User } from "@/features/common/services";
import { ProfileFormData } from "@/features/profile/hooks/useProfileUpdate";
import { UseFormReturn } from "react-hook-form";

interface ProfileInformationProps {
  user: User | null;
  formMethods: any; // Keep using any to avoid TypeScript issues
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({ 
  user, 
  formMethods 
}) => {
  const { register, formState: { errors } } = formMethods;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <label htmlFor="role" className="text-sm font-medium text-gray-700">
          Role
        </label>
        <input
          id="role"
          type="text"
          value={user?.role || ""}
          disabled
          className="bg-gray-100 border border-gray-300 text-gray-700 rounded-md py-2 px-3 focus:outline-none"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`border ${
              errors.name ? "border-red-300" : "border-gray-300"
            } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            disabled
            {...register("email")}
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-md py-2 px-3 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="department" className="text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            {...register("department")}
            className={`border ${
              errors.department ? "border-red-300" : "border-gray-300"
            } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
