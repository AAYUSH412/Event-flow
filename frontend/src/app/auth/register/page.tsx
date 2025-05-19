"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, User, GraduationCap, Building } from "lucide-react";
import { authService, RegisterData } from "@/features/common/services";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  department: yup.string().required("Department is required"),
  role: yup.string().required("Role is required")
}).required();

type FormData = {
  name: string;
  email: string;
  password: string;
  department: string;
  role: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "STUDENT" // Default role
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const registerData: RegisterData = {
        name: data.name,
        email: data.email,
        password: data.password,
        department: data.department,
        role: data.role as 'ADMIN' | 'ORGANIZER' | 'STUDENT' | undefined
      };
      
      const response = await authService.register(registerData);
      
      // Store token and user data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      toast.success("Registration successful!");
      
      // Redirect based on user role
      const userRole = response.user.role;
      if (userRole === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (userRole === "ORGANIZER") {
        router.push("/dashboard/organizer");
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      // Handle API error response
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const errorMessage = ((error as ApiError).response?.data?.message) || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Registration Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo and Theme Toggle */}
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8 pt-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create your account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in your details to get started with EventFlow
            </p>
          </motion.div>
          
          {/* Form */}
          <motion.form 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6" 
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  {...register("name")}
                  className={`pl-10 w-full rounded-lg border ${
                    errors.name 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
              )}
            </div>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`pl-10 w-full rounded-lg border ${
                    errors.email 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register("password")}
                  className={`pl-10 w-full rounded-lg border ${
                    errors.password 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            {/* Department Field */}
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="department"
                  {...register("department")}
                  className={`pl-10 w-full rounded-lg border ${
                    errors.department 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
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
                <p className="text-sm text-red-600 dark:text-red-400">{errors.department.message}</p>
              )}
            </div>
            
            {/* Role Selection Field */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  {...register("role")}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 transition-colors"
                >
                  <option value="STUDENT">Student</option>
                  <option value="ORGANIZER">Organizer</option>
                </select>
              </div>
            </div>
            
            {/* Terms and conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </motion.form>
          
          {/* Login Link */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center"
              >
                Sign in
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-900/40"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold">Create moments that matter</h2>
            <p className="text-lg text-white/80">
              Join EventFlow today and be part of a vibrant campus community. Organize, discover, and participate in events that shape your campus experience.
            </p>
            
            <div className="pt-6">
              <div className="flex -space-x-2 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 15}.jpg`}
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/90">
                Join thousands of students and organizers using EventFlow
              </p>
            </div>
          </motion.div>
          
          {/* Floating shapes for visual interest */}
          <motion.div 
            className="absolute top-20 right-20 w-20 h-20 rounded-full bg-purple-500/30 blur-xl"
            animate={{ 
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-32 left-20 w-16 h-16 rounded-full bg-indigo-500/30 blur-xl"
            animate={{ 
              x: [0, -15, 15, 0],
              y: [0, 15, -15, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>
      </div>
    </div>
  );
}