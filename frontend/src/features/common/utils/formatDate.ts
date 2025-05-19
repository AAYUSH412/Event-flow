/**
 * Format date utilities for the application
 */

/**
 * Format a date string to a human readable format
 * @param dateString - The date string to format
 * @returns The formatted date string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a date and time string to a human readable format
 * @param dateString - The date string to format
 * @returns The formatted date and time string
 */
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * Check if an event is in the past
 * @param endDateTime - The end date time of the event
 * @returns Boolean indicating if the event is in the past
 */
export const isEventPast = (endDateTime: string): boolean => {
  return new Date(endDateTime) < new Date();
};

/**
 * Check if an event is upcoming
 * @param startDateTime - The start date time of the event
 * @returns Boolean indicating if the event is upcoming
 */
export const isEventUpcoming = (startDateTime: string): boolean => {
  return new Date(startDateTime) > new Date();
};

/**
 * Check if an event is ongoing
 * @param startDateTime - The start date time of the event
 * @param endDateTime - The end date time of the event
 * @returns Boolean indicating if the event is ongoing
 */
export const isEventOngoing = (startDateTime: string, endDateTime: string): boolean => {
  const now = new Date();
  return new Date(startDateTime) <= now && now <= new Date(endDateTime);
};
