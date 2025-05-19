import express from 'express';
import { 
  registerForEvent, cancelRegistration, getEventRegistrations, 
  markAttendance, getUserRegistrations 
} from '../controllers/registrationController.js';
import { authenticate, isOrganizerOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// User registration routes
router.post('/', registerForEvent);
router.delete('/:eventId', cancelRegistration);
router.get('/user', getUserRegistrations);

// Organizer routes
router.get('/event/:eventId', getEventRegistrations);
router.post('/attendance/:eventId', markAttendance);

export default router;
