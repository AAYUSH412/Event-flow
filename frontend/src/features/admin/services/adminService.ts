import api from '@/features/common/services/api';
import { User } from '@/features/auth/services/authService';
import { AdminUpdateUserData } from './types';

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'ORGANIZER' | 'STUDENT';
  department?: string;
}

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },
  
  // Get dashboard analytics
  getDashboardAnalytics: async (timeframe: string = 'last6months') => {
    const response = await api.get('/api/admin/analytics', {
      params: { timeframe }
    });
    return response.data;
  },
  
  // Get all users with filtering and pagination
  getUsers: async (filters: UserFilters = {}) => {
    const response = await api.get('/api/admin/users', {
      params: filters
    });
    return response.data;
  },
  
  // Get a single user by ID
  getUserById: async (userId: string) => {
    const response = await api.get(`/api/admin/users/${userId}`);
    return response.data;
  },
  
  // Create a new user
  createUser: async (userData: CreateUserData) => {
    const response = await api.post('/api/admin/users', userData);
    return response.data;
  },
  
  // Update a user
  updateUser: async (userId: string, userData: Partial<UpdateProfileData>) => {
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  },
  
  // Delete a user
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  }
};

export default adminService;