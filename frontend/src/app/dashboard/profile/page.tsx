"use client";

import { useProfileUpdate } from "@/features/profile/hooks/useProfileUpdate";
import { ModernProfileInformation } from "@/features/profile/components/ModernProfileInformation";
import { ModernProfilePassword } from "@/features/profile/components/ModernProfilePassword";
import { motion } from "framer-motion";
import { PatternBackground } from "@/components/ui/animated-elements";
import { Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { formMethods, isLoading, updateProfile, user } = useProfileUpdate();
  
  // Create a type-safe wrapper for the form submission
  const handleFormSubmit = formMethods.handleSubmit((data) => {
    return updateProfile(data);
  });
  
  return (
    <motion.div 
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <PatternBackground 
          dotColor="rgba(99, 102, 241, 0.07)"
          dotSize={1.5}
          dotSpacing={20}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            My Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your account information and password
          </p>
        </motion.div>
        
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <ModernProfileInformation user={user} formMethods={formMethods} />
          
          {/* Password Section */}
          <ModernProfilePassword formMethods={formMethods} />
          
          {/* Form Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
