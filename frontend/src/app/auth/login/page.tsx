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
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from "lucide-react";
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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setErrorMessage(null); // Reset error message on new submit
    try {
      // Use the login function from auth context
      const loggedInUser = await login(data.email, data.password);
      
      toast.success("Welcome back! Login successful.");
      
      // Redirect based on user role from returned login result
      if (loggedInUser.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (loggedInUser.role === "ORGANIZER") {
        router.push("/dashboard/organizer");
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      // Handle API error response with more detail
      interface ApiError {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
          status?: number;
        };
        message?: string;
      }
      
      const err = error as ApiError;
      let displayErrorMessage = "Login failed. Please check your credentials.";
      
      if (err.response?.data?.message) {
        displayErrorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        displayErrorMessage = err.response.data.error;
      } else if (err.message) {
        displayErrorMessage = err.message;
      }
      
      setErrorMessage(displayErrorMessage);
      toast.error(displayErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo and Theme Toggle */}
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </motion.div>
          
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-300">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}
          
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
                  placeholder="you@example.com"
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
            
            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me for 30 days
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
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  <span>Sign in</span>
                </div>
              )}
            </Button>
            
            {/* Admin Login */}
            <div className="text-center pt-2">
              <Link
                href="/auth/admin"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Login as administrator
              </Link>
            </div>
          </motion.form>
          
          {/* Register Link */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center"
              >
                Create an account
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </motion.div>
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
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold">Join the campus revolution</h2>
            <p className="text-lg text-white/80">
              EventFlow makes campus event management seamless. Discover, join, and manage events all in one place.
            </p>
            
            <div className="pt-6">
              <div className="flex -space-x-2 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`}
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