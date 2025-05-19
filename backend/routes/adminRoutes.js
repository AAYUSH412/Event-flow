import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  getEventRegistrationStats,
  getMonthlyStats,
  getEventAttendance,
  getDepartmentStats,
  deleteUser,
  getEventAdminStats,
  getAdminEvents
} from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes here require authentication and admin privileges
router.use(authenticate, isAdmin);

// Dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Event statistics and management
router.get('/events', getAdminEvents); // Admin events list with advanced filtering
router.get('/events/stats', getEventAdminStats); // Event statistics
router.get('/events/:id/registration-stats', getEventRegistrationStats);
router.get('/events/:id/attendance', getEventAttendance);

// Analytics
router.get('/analytics/monthly', getMonthlyStats);
router.get('/analytics/departments', getDepartmentStats);

export default router;
