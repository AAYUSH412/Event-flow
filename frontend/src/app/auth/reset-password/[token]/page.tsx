"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/features/auth/AuthContext";

// Define validation schema
const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState<string>("");

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (params.token) {
      setToken(params.token);
    }
  }, [params]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { resetPassword } = useAuth();
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await resetPassword(token, data.password);
      
      toast.success("Password has been reset successfully.");
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      // Handle API error response
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const errorMessage = ((error as ApiError).response?.data?.message) || "Failed to reset password. The token may be invalid or expired.";
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
      {/* Left side - Reset Password Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <ThemeToggle />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Reset Your Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new password for your account
            </p>
          </motion.div>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                  Password Reset Successful
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => router.push('/auth/login')}
                  className="w-full h-11 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
                >
                  Proceed to Login
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              {/* New Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    autoFocus
                    {...register("password")}
                    className={`pl-10 w-full rounded-lg border ${
                      errors.password 
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                    } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 6 characters
                </p>
              </div>
              
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                    className={`pl-10 w-full rounded-lg border ${
                      errors.confirmPassword 
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                    } bg-white dark:bg-gray-800 py-2 px-4 text-gray-900 dark:text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
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
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <span>Reset Password</span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Secure Password Reset</h2>
            <p className="text-lg text-white/80">
              Creating a strong password helps protect your account. Make sure to use a combination of letters, numbers, and special characters.
            </p>
          </motion.div>
          
          {/* Floating shapes for visual interest */}
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
        </div>
      </div>
    </div>
  );
}
