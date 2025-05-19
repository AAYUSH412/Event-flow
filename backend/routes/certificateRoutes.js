import express from 'express';
import { 
  generateCertificate, generateBulkCertificates,
  getUserCertificates, getCertificate
} from '../controllers/certificateController.js';
import { authenticate, isOrganizerOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// User certificate routes
router.get('/user', getUserCertificates);
router.get('/:id', getCertificate);

// Organizer routes
router.post('/registration/:registrationId', generateCertificate);
router.post('/event/:eventId/bulk', isOrganizerOrAdmin, generateBulkCertificates);

export default router;
