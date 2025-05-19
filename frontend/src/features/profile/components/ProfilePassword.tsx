import React from "react";
import { ProfileFormData } from "@/features/profile/hooks/useProfileUpdate";
import { UseFormReturn } from "react-hook-form";

interface ProfilePasswordProps {
  formMethods: UseFormReturn<ProfileFormData>;
}

export const ProfilePassword: React.FC<ProfilePasswordProps> = ({ formMethods }) => {
  const { register, formState: { errors } } = formMethods;

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900">Password</h3>
      <p className="mt-1 text-sm text-gray-500">
        Leave blank if you don't want to change your password.
      </p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`border ${
              errors.password ? "border-red-300" : "border-gray-300"
            } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`border ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePassword;
