import api from '@/features/common/services/api';

// Types
export interface Event {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  bannerImage?: string;
  organizerId: string;
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  bannerImage?: string;
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
}

export interface EventFilters {
  department?: string;
  club?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Event API services
const eventService = {
  // Get all events with optional filters
  getAllEvents: async (filters: EventFilters = {}) => {
    const response = await api.get('/api/events', { params: filters });
    return response.data;
  },

  // Get event by ID
  getEventById: async (id: string) => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },

  // Create new event
  createEvent: async (data: CreateEventData) => {
    const response = await api.post('/api/events', data);
    return response.data;
  },

  // Update event
  updateEvent: async (id: string, data: Partial<CreateEventData>) => {
    const response = await api.put(`/api/events/${id}`, data);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id: string) => {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  },

  // Get events created by current user (for organizers)
  getMyEvents: async () => {
    const response = await api.get('/api/events/user/my-events');
    return response.data;
  },
};

export default eventService;