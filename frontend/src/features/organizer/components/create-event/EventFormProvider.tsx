"use client";

import { ReactNode } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema, EventFormData } from "./EventFormSchema";

interface EventFormProviderProps {
  children: ReactNode;
  onSubmit: (data: EventFormData) => Promise<void>;
  defaultValues?: Partial<EventFormData>;
}

export const EventFormProvider = ({ 
  children, 
  onSubmit,
  defaultValues = {
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    department: "",
    club: "",
    category: "",
    maxParticipants: undefined,
    bannerImage: "",
  }
}: EventFormProviderProps) => {
  const methods = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: defaultValues as EventFormData,
  });

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        {children}
      </form>
    </RHFFormProvider>
  );
};

export default EventFormProvider;
