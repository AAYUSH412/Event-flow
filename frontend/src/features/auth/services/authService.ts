import api from '@/features/common/services/api';

// Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  department: string;
  role?: 'ADMIN' | 'ORGANIZER' | 'STUDENT';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ORGANIZER' | 'STUDENT';
  department?: string;
  profileImage?: string;
}

export interface UpdateProfileData {
  name?: string;
  password?: string;
  department?: string;
  profileImage?: string;
}

// Auth API services
const authService = {
  // Login user
  login: async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  // Register new user
  register: async (data: RegisterData) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
  
  // Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  },
  
  // Reset password
  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/api/auth/reset-password', { token, password });
    return response.data;
  },
};

export default authService;