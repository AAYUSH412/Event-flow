"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuth } from "@/features/auth/AuthContext";

// Define validation schema
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const { forgotPassword } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      
      toast.success("Password reset instructions have been sent to your email.");
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error("Forgot password error:", error);
      // Handle API error response
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const errorMessage = ((error as ApiError).response?.data?.message) || "Failed to process request. Please try again.";
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
      {/* Left side - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-12">
            <Logo />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Forgot Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </motion.div>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200">
                  We've sent a password reset link to your email. Please check your inbox and follow the instructions.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => router.push('/auth/login')}
                  className="w-full h-11 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
                >
                  Return to Login
                </Button>
                
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button onClick={() => setIsSubmitted(false)} className="text-purple-600 hover:text-purple-500 font-medium">
                    try again
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
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
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
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
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </Button>
              
              {/* Back to login */}
              <div className="mt-4 text-center">
                <Link 
                  href="/auth/login"
                  className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </motion.form>
          )}
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-indigo-900/40"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
          <motion.div 
            className="absolute top-20 left-20 w-20 h-20 rounded-full bg-indigo-500/30 blur-xl"
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
            className="absolute bottom-32 right-20 w-16 h-16 rounded-full bg-purple-500/30 blur-xl"
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
          
          <div className="text-center max-w-md">
            <h3 className="text-2xl font-bold mb-2">Password Recovery</h3>
            <p className="text-indigo-100">
              Don't worry! It happens to the best of us. Enter your email and we'll send you instructions to reset your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
