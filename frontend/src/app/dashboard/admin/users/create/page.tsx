"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Import our newly created components
import {
  CreateUserHeader,
  UserFormProvider,
  PersonalInfo,
  AccountDetails,
  FormActions,
  UserFormData
} from "@/features/admin/components/create-user";

export default function CreateUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: UserFormData) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would use the service
      // await adminService.createUser(formData);
      
      // Simulate successful creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("User created successfully!");
      router.push("/dashboard/admin/users");
    } catch (error: unknown) {
      console.error("Create user error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full opacity-40" />
      
      <motion.div 
        className="max-w-3xl mx-auto py-8 px-4 sm:px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CreateUserHeader />
        
        <UserFormProvider onSubmit={handleFormSubmit}>
          <div className="space-y-8">
            <PersonalInfo methods={null as any} />
            <AccountDetails methods={null as any} />
            <FormActions isSubmitting={isSubmitting} />
          </div>
        </UserFormProvider>
      </motion.div>
    </div>
  );
}
