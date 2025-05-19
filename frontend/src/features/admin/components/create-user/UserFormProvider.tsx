"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactNode } from 'react';

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  role: yup.string().oneOf(["ADMIN", "ORGANIZER", "STUDENT"], "Invalid role").required("Role is required"),
  department: yup.string().optional(),
}).required();

export type UserFormData = yup.InferType<typeof schema>;

interface UserFormProviderProps {
  children: ReactNode;
  onSubmit: (data: UserFormData) => Promise<void>;
  defaultValues?: Partial<UserFormData>;
}

export const UserFormProvider = ({ 
  children, 
  onSubmit,
  defaultValues = {
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    department: "",
  }
}: UserFormProviderProps) => {
  const methods = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues as UserFormData,
  });

  const handleFormSubmit = methods.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { methods });
        }
        return child;
      })}
    </form>
  );
};

export default UserFormProvider;
