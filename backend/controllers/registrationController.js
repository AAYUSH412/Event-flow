import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

// Register user for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event has already passed
    if (new Date(event.endDateTime) < new Date()) {
      return res.status(400).json({ message: 'Cannot register for past events' });
    }

    // Check if registration already exists
    const existingRegistration = await Registration.findOne({ userId, eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event has max participants and if it's full
    if (event.maxParticipants) {
      const registrationCount = await Registration.countDocuments({ 
        eventId,
        status: 'REGISTERED'
      });
      
      if (registrationCount >= event.maxParticipants) {
        // Create waitlist registration
        const registration = new Registration({
          userId,
          eventId,
          status: 'WAITLISTED'
        });
        
        await registration.save();
        return res.status(200).json({ 
          registration, 
          message: 'Event is full. You have been added to the waitlist.' 
        });
      }
    }

    // Create registration
    const registration = new Registration({
      userId,
      eventId,
      status: 'REGISTERED'
    });

    await registration.save();
    
    // Send confirmation email
    try {
      const user = await User.findById(userId);
      const organizer = await User.findById(event.organizerId);
      
      // Import email service
      const { sendRegistrationConfirmation, notifyOrganizerOfRegistration } = await import('../services/emailService.js');
      
      // Send confirmation to user
      await sendRegistrationConfirmation(registration, user, event);
      
      // Notify organizer
      await notifyOrganizerOfRegistration(organizer, user, event);
    } catch (emailError) {
      console.error('Error sending registration emails:', emailError);
      // Continue with registration process despite email error
    }
    
    res.status(201).json({ 
      registration, 
      message: 'Successfully registered for the event' 
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel registration for an event
export const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Find registration
    const registration = await Registration.findOne({ userId, eventId });
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if event has already passed
    const event = await Event.findById(eventId);
    if (new Date(event.startDateTime) < new Date()) {
      return res.status(400).json({ message: 'Cannot cancel registration for ongoing or past events' });
    }

    // Update registration status to cancelled
    registration.status = 'CANCELLED';
    await registration.save();

    // If there are waitlisted users, move one to registered
    if (event.maxParticipants) {
      const waitlistedRegistration = await Registration.findOne({
        eventId,
        status: 'WAITLISTED'
      }).sort({ createdAt: 1 }); // Get the earliest waitlisted user
      
      if (waitlistedRegistration) {
        waitlistedRegistration.status = 'REGISTERED';
        await waitlistedRegistration.save();
        
        // Send notification about moving from waitlist to registered
        try {
          const waitlistedUser = await User.findById(waitlistedRegistration.userId);
          
          // Import email service
          const { sendWaitlistToRegisteredNotification } = await import('../services/emailService.js');
          
          // Send notification to the user who was moved from waitlist
          await sendWaitlistToRegisteredNotification(waitlistedUser, event);
        } catch (emailError) {
          console.error('Error sending waitlist notification email:', emailError);
        }
      }
    }
    
    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get registrations for an event (for organizers)
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.query;

    // Check if event exists and user is authorized
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is organizer or admin
    if (!event.organizerId.equals(req.user._id) && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to view registrations' });
    }

    // Build query
    const query = { eventId };
    if (status) {
      query.status = status;
    }

    // Get registrations with user details
    const registrations = await Registration.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: 1 });

    // Get counts by status
    const registeredCount = await Registration.countDocuments({ 
      eventId, 
      status: 'REGISTERED' 
    });
    
    const waitlistedCount = await Registration.countDocuments({ 
      eventId, 
      status: 'WAITLISTED' 
    });
    
    const cancelledCount = await Registration.countDocuments({ 
      eventId, 
      status: 'CANCELLED' 
    });

    res.json({ 
      registrations,
      counts: {
        registered: registeredCount,
        waitlisted: waitlistedCount,
        cancelled: cancelledCount,
        total: registrations.length
      }
    });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark attendance for event participants
export const markAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { attendees } = req.body;

    // Check if event exists and user is authorized
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is organizer or admin
    if (!event.organizerId.equals(req.user._id) && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to mark attendance' });
    }

    // Update attendance for each attendee
    const updatePromises = attendees.map(async (attendeeData) => {
      const { userId, attended } = attendeeData;
      
      return Registration.findOneAndUpdate(
        { userId, eventId, status: 'REGISTERED' },
        { attended },
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's registered events
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const registrations = await Registration.find({ 
      userId,
      status: { $in: ['REGISTERED', 'WAITLISTED'] }
    }).populate({
      path: 'eventId',
      populate: {
        path: 'organizerId',
        select: 'name'
      }
    });

    // Format response to include event details
    const formattedRegistrations = registrations.map(reg => ({
      _id: reg._id,
      userId: reg.userId,
      eventId: reg.eventId._id,
      status: reg.status,
      attended: reg.attended,
      createdAt: reg.createdAt,
      updatedAt: reg.updatedAt,
      event: reg.eventId // Include the entire event object
    }));

    res.json({ registrations: formattedRegistrations });
  } catch (error) {
    console.error('Get user registrations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
