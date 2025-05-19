import api from '@/features/common/services/api';

// Types
export interface Certificate {
  _id: string;
  userId: string;
  eventId: string;
  registrationId: string;
  certificateUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Certificate API services
const certificateService = {
  // Generate certificate for a registration
  generateCertificate: async (registrationId: string) => {
    const response = await api.post(`/api/certificates/registration/${registrationId}`);
    return response.data;
  },

  // Generate certificates in bulk for an event
  generateBulkCertificates: async (eventId: string) => {
    const response = await api.post(`/api/certificates/event/${eventId}/bulk`);
    return response.data;
  },

  // Get user's certificates
  getUserCertificates: async () => {
    const response = await api.get('/api/certificates/user');
    return response.data;
  },

  // Get certificate by ID
  getCertificate: async (id: string) => {
    const response = await api.get(`/api/certificates/${id}`);
    return response.data;
  },
};

export default certificateService;