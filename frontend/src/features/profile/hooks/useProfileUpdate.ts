import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authService, UpdateProfileData } from "@/features/common/services";
import { useAuth } from "@/features/auth/AuthContext";

// Define validation schema
export const profileSchema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Must be a valid email").required("Email is required"),
  department: yup.string().required("Department is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").optional(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .optional(),
}).required();

export type ProfileFormData = yup.InferType<typeof profileSchema>;

export function useProfileUpdate() {
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const formMethods = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      department: user?.department || "",
      password: "",
      confirmPassword: "",
    },
  });

  const updateProfile = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      // Only include password in update if it's provided
      const updateData: UpdateProfileData = {
        name: data.name,
        department: data.department,
      };
      
      if (data.password) {
        updateData.password = data.password;
      }
      
      await authService.updateProfile(updateData);
      toast.success("Profile updated successfully!");
      
      // Refresh user data after successful update
      if (refreshUser) {
        refreshUser();
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formMethods,
    isLoading,
    updateProfile,
    user
  };
}
