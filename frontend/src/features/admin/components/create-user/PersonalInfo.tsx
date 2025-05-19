"use client";

import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './UserFormProvider';

interface PersonalInfoProps {
  methods: UseFormReturn<UserFormData>;
}

export default function PersonalInfo({ methods }: PersonalInfoProps) {
  const { control } = methods;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl bg-white p-6 shadow-md border border-gray-100 overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <User className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-lg font-medium">Personal Information</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter full name" 
                  {...field} 
                  className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Enter email address" 
                  {...field} 
                  className="border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
}
