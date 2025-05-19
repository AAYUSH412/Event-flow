"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateUserHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard/admin/users" 
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Link>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Create New User
        </h1>
        <p className="text-gray-500 mt-2">
          Add a new user to the system. They will receive an email with their login credentials.
        </p>
      </div>
    </motion.div>
  );
}
