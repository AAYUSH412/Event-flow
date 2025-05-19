import Certificate from '../models/Certificate.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// For ES Module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate certificate for an event participant
export const generateCertificate = async (req, res) => {
  try {
    const { registrationId } = req.params;
    
    // Find registration
    const registration = await Registration.findById(registrationId);
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    
    // Check if user attended the event
    if (!registration.attended) {
      return res.status(400).json({ message: 'Certificate can only be issued to attendees' });
    }
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      userId: registration.userId,
      eventId: registration.eventId
    });
    
    if (existingCertificate) {
      return res.json({ 
        certificate: existingCertificate,
        message: 'Certificate already generated' 
      });
    }
    
    // Get event and user details
    const event = await Event.findById(registration.eventId);
    const user = await User.findById(registration.userId);
    
    if (!event || !user) {
      return res.status(404).json({ message: 'Event or User not found' });
    }
    
    // In a real application, you would generate a PDF certificate here
    // For this example, we'll simulate certificate generation
    
    // Create certificate entry with URL (in a real app, this would be the actual file URL)
    const certificate = new Certificate({
      userId: user._id,
      eventId: event._id,
      certificateUrl: `/certificates/${event._id}_${user._id}.pdf` // Simulated path
    });
    
    await certificate.save();
    
    res.status(201).json({ 
      certificate,
      message: 'Certificate generated successfully' 
    });
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generate certificates in bulk for all attendees of an event
export const generateBulkCertificates = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Check if event exists and user is authorized
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is organizer or admin
    if (!event.organizerId.equals(req.user._id) && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to generate certificates' });
    }
    
    // Find all attended registrations without certificates
    const registrations = await Registration.find({
      eventId,
      attended: true,
      status: 'REGISTERED'
    });
    
    // Generate certificates for each attendee
    const results = [];
    
    for (const registration of registrations) {
      // Check if certificate already exists
      const existingCertificate = await Certificate.findOne({
        userId: registration.userId,
        eventId
      });
      
      if (!existingCertificate) {
        // Create certificate
        const certificate = new Certificate({
          userId: registration.userId,
          eventId,
          certificateUrl: `/certificates/${eventId}_${registration.userId}.pdf` // Simulated path
        });
        
        await certificate.save();
        results.push(certificate);
      }
    }
    
    res.json({ 
      message: `${results.length} certificates generated successfully`,
      certificates: results
    });
  } catch (error) {
    console.error('Generate bulk certificates error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all certificates for current user
export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get certificates with event details
    const certificates = await Certificate.find({ userId })
      .populate({
        path: 'eventId',
        select: 'title startDateTime endDateTime'
      })
      .sort({ issuedAt: -1 });
    
    res.json({ certificates });
  } catch (error) {
    console.error('Get user certificates error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single certificate by ID
export const getCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Find certificate
    const certificate = await Certificate.findById(id)
      .populate({
        path: 'eventId',
        select: 'title startDateTime endDateTime organizerId'
      })
      .populate({
        path: 'userId',
        select: 'name email'
      });
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Check if user is authorized to view this certificate
    const isOwner = certificate.userId._id.equals(userId);
    const isOrganizer = certificate.eventId.organizerId.equals(userId);
    const isAdmin = req.user.role === 'ADMIN';
    
    if (!isOwner && !isOrganizer && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this certificate' });
    }
    
    res.json({ certificate });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
