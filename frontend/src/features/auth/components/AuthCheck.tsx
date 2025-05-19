"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';

type AuthCheckProps = {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'ORGANIZER' | 'STUDENT')[];
};

export default function AuthCheck({ children, allowedRoles }: AuthCheckProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth is initialized and if user is not authenticated
    if (!loading) {
      if (!isAuthenticated) {
        console.log('Auth check failed: User not authenticated');
        router.push('/auth/login');
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        console.log('Auth check failed: User role not allowed', user.role, allowedRoles);
        // Redirect to appropriate dashboard based on role if they're trying to access unauthorized page
        if (user.role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else if (user.role === 'ORGANIZER') {
          router.push('/dashboard/organizer');
        } else {
          router.push('/dashboard');
        }
      } else {
        console.log('Auth check passed', user?.role);
      }
    }
  }, [isAuthenticated, loading, router, user, allowedRoles]);

  // Show nothing during loading or if not authenticated
  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If roles are specified, check if user has the required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  // If authenticated and authorized, render children
  return <>{children}</>;
}