import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileSaveButtonProps {
  isLoading: boolean;
  className?: string;
}

export const ProfileSaveButton: React.FC<ProfileSaveButtonProps> = ({ isLoading, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("", className)}
    >
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full md:w-auto flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-80 shadow-md"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <span>Save Changes</span>
        )}
        
        {/* Decorative element */}
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-sm group-hover:opacity-50 transition duration-300"></div>
      </button>
    </motion.div>
  );
};

export default ProfileSaveButton;
