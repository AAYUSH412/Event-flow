import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { 
      title, description, startDateTime, endDateTime, 
      location, bannerImage, department, club, category, maxParticipants 
    } = req.body;

    // Basic validation
    if (!title || !description || !startDateTime || !endDateTime || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create new event
    const newEvent = new Event({
      title,
      description,
      startDateTime,
      endDateTime,
      location,
      bannerImage,
      organizerId: req.user._id,
      department,
      club,
      category,
      maxParticipants
    });

    await newEvent.save();
    res.status(201).json({ event: newEvent, message: 'Event created successfully' });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events with filtering options
export const getAllEvents = async (req, res) => {
  try {
    const { 
      department, club, category, 
      startDate, endDate, search, page = 1, limit = 10,
      sortBy = 'startDateTime', order = 'asc', status, isHighlighted, isPublished
    } = req.query;

    const query = {};

    // Apply filters if provided
    if (department) query.department = department;
    if (club) query.club = club;
    if (category) query.category = category;
    if (isHighlighted !== undefined) query.isHighlighted = isHighlighted === 'true';
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';
    
    // Date filtering
    if (startDate || endDate) {
      query.startDateTime = {};
      if (startDate) query.startDateTime.$gte = new Date(startDate);
      if (endDate) query.endDateTime = { $lte: new Date(endDate) };
    }

    // Status filtering (upcoming, ongoing, past)
    if (status) {
      const now = new Date();
      
      if (status === 'upcoming') {
        query.startDateTime = { $gt: now };
      } else if (status === 'ongoing' || status === 'active') {
        query.startDateTime = { $lte: now };
        query.endDateTime = { $gte: now };
      } else if (status === 'past') {
        query.endDateTime = { $lt: now };
      }
    }

    // Search by title, description, location, or organizer
    if (search) {
      // First check if we can find organizers that match the search
      const organizers = await mongoose.model('User').find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      
      // Get organizer IDs
      const organizerIds = organizers.map(org => org._id);
      
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
      
      // Add organizer search if we found matching organizers
      if (organizerIds.length > 0) {
        query.$or.push({ organizerId: { $in: organizerIds } });
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = order === 'desc' ? -1 : 1;
    
    // Get events
    const events = await Event.find(query)
      .populate('organizerId', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    // For each event, add registration count
    const eventsWithCounts = await Promise.all(events.map(async (event) => {
      const registrationCount = await Registration.countDocuments({
        eventId: event._id,
        status: 'REGISTERED'
      });
      
      const eventObj = event.toObject();
      eventObj.registrationCount = registrationCount;
      
      return eventObj;
    }));

    res.json({ 
      events: eventsWithCounts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate('organizerId', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Get registration count
    const registrationCount = await Registration.countDocuments({
      eventId: id,
      status: 'REGISTERED'
    });
    
    // Add registration count to response
    const eventResponse = event.toObject();
    eventResponse.registrationCount = registrationCount;
    
    // If there's a logged in user, check if they're registered
    if (req.user) {
      const userRegistration = await Registration.findOne({
        eventId: id,
        userId: req.user._id
      });
      
      if (userRegistration) {
        eventResponse.userRegistration = {
          status: userRegistration.status,
          attended: userRegistration.attended
        };
      }
    }
    
    res.json({ event: eventResponse });
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, description, startDateTime, endDateTime, 
      location, bannerImage, department, club, category, maxParticipants 
    } = req.body;
    
    // Find event
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is authorized to update this event
    if (!event.organizerId.equals(req.user._id) && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    
    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (startDateTime) event.startDateTime = startDateTime;
    if (endDateTime) event.endDateTime = endDateTime;
    if (location) event.location = location;
    if (bannerImage) event.bannerImage = bannerImage;
    if (department) event.department = department;
    if (club) event.club = club;
    if (category) event.category = category;
    if (maxParticipants) event.maxParticipants = maxParticipants;
    
    await event.save();
    
    res.json({ event, message: 'Event updated successfully' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find event
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is authorized to delete this event
    if (!event.organizerId.equals(req.user._id) && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    
    // Delete event and related registrations
    await Promise.all([
      Event.findByIdAndDelete(id),
      Registration.deleteMany({ eventId: id })
    ]);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events organized by the current user
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user._id })
      .sort({ startDateTime: 1 });
    
    res.json({ events });
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle event published status (admin only)
export const toggleEventPublished = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Toggle the flag
    event.isPublished = !event.isPublished;
    await event.save();
    
    res.json({ 
      event,
      message: `Event ${event.isPublished ? 'published' : 'unpublished'} successfully`
    });
  } catch (error) {
    console.error('Toggle event published error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle event highlighted status (admin only)
export const toggleEventHighlighted = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Toggle the flag
    event.isHighlighted = !event.isHighlighted;
    await event.save();
    
    res.json({ 
      event,
      message: `Event ${event.isHighlighted ? 'highlighted' : 'removed from highlights'} successfully`
    });
  } catch (error) {
    console.error('Toggle event highlighted error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get event statistics
export const getEventStats = async (req, res) => {
  try {
    // Get events by category
    const eventsByCategory = await Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get events by department
    const eventsByDepartment = await Event.aggregate([
      { $match: { department: { $exists: true, $ne: null } } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get upcoming vs past events
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ startDateTime: { $gt: now } });
    const pastEvents = await Event.countDocuments({ endDateTime: { $lt: now } });
    const ongoingEvents = await Event.countDocuments({ 
      startDateTime: { $lte: now },
      endDateTime: { $gte: now }
    });
    
    // Get events with highest registrations
    const topEvents = await Registration.aggregate([
      { $group: { _id: '$eventId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { 
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'event'
        }
      },
      { $unwind: '$event' },
      {
        $project: {
          _id: '$event._id',
          title: '$event.title',
          count: 1
        }
      }
    ]);
    
    res.json({
      counts: {
        total: await Event.countDocuments(),
        upcoming: upcomingEvents,
        ongoing: ongoingEvents,
        past: pastEvents,
        highlighted: await Event.countDocuments({ isHighlighted: true }),
        published: await Event.countDocuments({ isPublished: true }),
        unpublished: await Event.countDocuments({ isPublished: false })
      },
      categories: eventsByCategory.map(c => ({
        category: c._id || 'Uncategorized',
        count: c.count
      })),
      departments: eventsByDepartment.map(d => ({
        department: d._id || 'Uncategorized',
        count: d.count
      })),
      topEvents
    });
  } catch (error) {
    console.error('Get event stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
