import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

interface ModernProfilePasswordProps {
  // Use a more generic type for form methods
  formMethods: UseFormReturn<Record<string, unknown>>;
}

export const ModernProfilePassword: React.FC<ModernProfilePasswordProps> = ({ formMethods }) => {
  const { register, formState: { errors } } = formMethods;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <motion.div 
      className="rounded-xl bg-white p-6 shadow-lg border border-indigo-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Lock className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          <p className="text-sm text-gray-500">
            Update your password or leave blank to keep your current one
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full rounded-lg border ${
                errors.password ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
              } px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 transition duration-200 bg-white/50 backdrop-blur-sm`}
              placeholder="••••••"
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`w-full rounded-lg border ${
                errors.confirmPassword ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
              } px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 transition duration-200 bg-white/50 backdrop-blur-sm`}
              placeholder="••••••"
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
              onClick={toggleConfirmPasswordVisibility}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message as string}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProfilePassword;
