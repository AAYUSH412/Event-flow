"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Lock, Shield } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

// Define validation schema
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
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
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Use the login function from auth context
      await login(data.email, data.password);
      
      toast.success("Login successful!");
      
      // Redirect to admin dashboard - the router in AuthContext will handle redirection if not admin
      router.push("/dashboard/admin");
    } catch (error: unknown) {
      console.error("Login error:", error);
      // Handle API error response
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const errorMessage = ((error as ApiError).response?.data?.message) || "Login failed. Please check your credentials.";
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
      {/* Left side - Admin Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo and Theme Toggle */}
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your administrator credentials to access the system
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
                  autoFocus
                  {...register("email")}
                  className={`pl-10 w-full rounded-lg border ${
                    errors.email 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
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
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  <span>Sign in as Admin</span>
                </div>
              )}
            </Button>
            
            {/* Regular Login */}
            <div className="text-center pt-2">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Return to regular login
              </Link>
            </div>
          </motion.form>
          
          {/* Note */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page is restricted to system administrators only.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-slate-800 via-slate-700 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-gray-900/40"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Admin Control Center</h2>
            <p className="text-lg text-white/80">
              Access the administration dashboard to manage events, users, and system settings for EventFlow.
            </p>
            
            <div className="pt-6">
              <div className="flex justify-center">
                <div className="w-full max-w-sm p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm font-medium">System Status: Online</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-white/20 w-full">
                      <div className="h-2 rounded-full bg-purple-500 w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Active users: 248</span>
                      <span>Events today: 12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Floating shapes for visual interest */}
          <motion.div 
            className="absolute top-20 left-20 w-20 h-20 rounded-full bg-slate-500/30 blur-xl"
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
            className="absolute bottom-32 right-20 w-16 h-16 rounded-full bg-gray-500/30 blur-xl"
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
