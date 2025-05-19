import api from '@/features/common/services/api';

// Types
export interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  status: 'REGISTERED' | 'WAITLISTED' | 'CANCELLED';
  attended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationWithEvent extends Registration {
  event: any; // You can define a more specific type if needed
}

export interface RegisterForEventData {
  eventId: string;
}

export interface MarkAttendanceData {
  userId: string;
  attended: boolean;
}

// Registration API services
const registrationService = {
  // Register for an event
  registerForEvent: async (data: RegisterForEventData) => {
    const response = await api.post('/api/registrations', data);
    return response.data;
  },

  // Cancel registration
  cancelRegistration: async (eventId: string) => {
    const response = await api.delete(`/api/registrations/${eventId}`);
    return response.data;
  },

  // Get user's registrations
  getUserRegistrations: async () => {
    const response = await api.get('/api/registrations/user');
    return response.data;
  },

  // Get registrations for an event (for organizers)
  getEventRegistrations: async (eventId: string, status?: string) => {
    const response = await api.get(`/api/registrations/event/${eventId}`, {
      params: { status },
    });
    return response.data;
  },

  // Mark attendance (for organizers)
  markAttendance: async (eventId: string, data: MarkAttendanceData[]) => {
    const response = await api.post(`/api/registrations/attendance/${eventId}`, data);
    return response.data;
  },

  // Get registration statistics for an event
  getRegistrationStats: async (eventId: string) => {
    const response = await api.get(`/api/registrations/stats/${eventId}`);
    return response.data;
  },

  // Get organizer events for filtering
  getOrganizerEvents: async () => {
    const response = await api.get('/api/events/user/my-events');
    return response.data;
  },

  // Get organizer stats for dashboard
  getOrganizerStats: async () => {
    const response = await api.get('/api/registrations/organizer/stats');
    return response.data;
  },

  // Get organizer analytics with optional timeframe
  getOrganizerAnalytics: async (timeframe: string = 'last6months') => {
    const response = await api.get('/api/registrations/organizer/analytics', {
      params: { timeframe }
    });
    return response.data;
  },

  // Get all attendees for events organized by current user
  getOrganizedEventAttendees: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    eventId?: string;
  }) => {
    const response = await api.get('/api/registrations/organizer/attendees', { params });
    return response.data;
  },

  // Export attendees to CSV
  exportAttendeesCsv: async (eventId?: string) => {
    const response = await api.get('/api/registrations/organizer/export', {
      params: { eventId },
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendees-${eventId || 'all'}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return { success: true };
  },
};

export default registrationService;