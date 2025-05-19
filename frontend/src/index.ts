/**
 * Re-exports from feature modules
 */

// Auth
export { AuthProvider, useAuth } from '@/features/auth/AuthContext';

// Services
export {
  api,
  authService,
  eventService,
  registrationService,
  certificateService,
  adminService
} from '@/features/common/services';

// Types
export type {
  LoginData,
  RegisterData,
  User,
  UpdateProfileData,
  Event,
  CreateEventData,
  EventFilters,
  Registration,
  RegistrationWithEvent,
  RegisterForEventData,
  MarkAttendanceData,
  Certificate,
  UserFilters,
  CreateUserData
} from '@/features/common/services';

// Common components
export { default as LoadingSpinner } from '@/features/common/components/LoadingSpinner';

// Utils
export { formatDate } from '@/features/common/utils/dateUtils';
