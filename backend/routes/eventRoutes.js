import express from 'express';
import { 
  createEvent, getAllEvents, getEventById, 
  updateEvent, deleteEvent, getMyEvents,
  toggleEventPublished, toggleEventHighlighted,
  getEventStats
} from '../controllers/eventController.js';
import { authenticate, isOrganizerOrAdmin, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Stats for admin dashboard
router.get('/analytics/stats', authenticate, isAdmin, getEventStats);

// Protected routes
router.post('/', authenticate, isOrganizerOrAdmin, createEvent);
router.get('/user/my-events', authenticate, getMyEvents);

// Admin-only routes
router.put('/:id/publish', authenticate, isAdmin, toggleEventPublished);
router.put('/:id/highlight', authenticate, isAdmin, toggleEventHighlighted);

// Specific ID-based routes - these should come after more specific routes
router.put('/:id', authenticate, updateEvent); // Organizer check is in controller
router.delete('/:id', authenticate, deleteEvent); // Organizer check is in controller

export default router;
