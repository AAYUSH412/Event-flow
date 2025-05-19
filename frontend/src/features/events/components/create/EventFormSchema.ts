"use client";

import * as yup from "yup";

// Define the form data interface matching the API's expected data structure
export interface EventFormData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
  bannerImage?: string;
}

// Define validation schema
export const eventSchema = yup.object({
  title: yup.string().required("Event title is required"),
  description: yup.string().required("Event description is required"),
  startDateTime: yup.string().required("Start date and time are required"),
  endDateTime: yup
    .string()
    .required("End date and time are required")
    .test(
      "is-after-start",
      "End date/time must be after start date/time",
      function (value) {
        const { startDateTime } = this.parent;
        return new Date(value) > new Date(startDateTime);
      }
    ),
  location: yup.string().required("Location is required"),
  department: yup.string().optional(),
  club: yup.string().optional(),
  category: yup.string().optional(),
  maxParticipants: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Max participants must be a positive number")
    .integer("Max participants must be a whole number")
    .optional(),
  bannerImage: yup.string().optional(),
});

export default eventSchema;
