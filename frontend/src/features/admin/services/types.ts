// Admin service types
export interface AdminUpdateUserData {
  name?: string;
  email?: string;
  role?: 'ADMIN' | 'ORGANIZER' | 'STUDENT';
  department?: string;
  profileImage?: string;
  password?: string;
}
