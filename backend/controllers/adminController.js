import User from '../models/User.js';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import Certificate from '../models/Certificate.js';
import mongoose from 'mongoose';

// Get dashboard overview statistics
export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    
    // Get counts
    const [
      totalUsers, 
      totalEvents, 
      totalRegistrations,
      totalCertificates,
      activeEvents,
      usersByRole,
      recentEvents,
      upcomingEvents,
      registrationsByStatus,
      usersByDepartment
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Registration.countDocuments(),
      Certificate.countDocuments(),
      Event.countDocuments({
        startDateTime: { $lte: now },
        endDateTime: { $gte: now }
      }),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]),
      Event.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('organizerId', 'name email'),
      Event.find({ startDateTime: { $gt: now } })
        .sort({ startDateTime: 1 })
        .limit(5)
        .populate('organizerId', 'name email'),
      Registration.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      User.aggregate([
        { $match: { department: { $exists: true, $ne: null } } },
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);
    
    res.json({
      counts: {
        users: totalUsers,
        events: totalEvents,
        registrations: totalRegistrations,
        certificates: totalCertificates,
        activeEvents
      },
      usersByRole: usersByRole.reduce((obj, item) => {
        obj[item._id] = item.count;
        return obj;
      }, {}),
      recentEvents,
      upcomingEvents,
      registrationsByStatus: registrationsByStatus.reduce((obj, item) => {
        obj[item._id] = item.count;
        return obj;
      }, {}),
      usersByDepartment: usersByDepartment.reduce((arr, item) => {
        arr.push({ department: item._id, count: item.count });
        return arr;
      }, [])
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users with pagination and filtering
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (role) query.role = role;
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users
    const users = await User.find(query)
      .select('-password')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['ADMIN', 'ORGANIZER', 'STUDENT'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent demoting yourself if you're an admin
    if (user._id.toString() === req.user._id.toString() && role !== 'ADMIN') {
      return res.status(400).json({ message: 'Cannot change your own admin status' });
    }
    
    user.role = role;
    await user.save();
    
    // Remove sensitive data
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ user: userResponse, message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get registration statistics
export const getEventRegistrationStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate that event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Get registration statistics
    const stats = await Registration.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(id) } },
      { $group: { 
        _id: '$status', 
        count: { $sum: 1 },
        attended: { 
          $sum: { $cond: [ { $eq: ['$attended', true] }, 1, 0 ] } 
        }
      }}
    ]);
    
    // Get registrations by department
    const departmentStats = await Registration.aggregate([
      { 
        $match: { 
          eventId: new mongoose.Types.ObjectId(id),
          status: 'REGISTERED' 
        } 
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $group: { 
        _id: '$user.department', 
        count: { $sum: 1 } 
      }},
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      event: {
        _id: event._id,
        title: event.title,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        maxParticipants: event.maxParticipants || 0
      },
      registrationStats: stats.reduce((obj, item) => {
        obj[item._id] = {
          count: item.count,
          attended: item.attended
        };
        return obj;
      }, {}),
      departmentStats: departmentStats.map(item => ({
        department: item._id || 'Not Specified',
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Get event registration stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get monthly event and registration statistics
export const getMonthlyStats = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    // Get monthly events count
    const eventStats = await Event.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Get monthly registration count
    const registrationStats = await Registration.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Format the data into months (1-12)
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    
    const formattedEventStats = months.map(month => {
      const found = eventStats.find(stat => stat._id === month);
      return { month, count: found ? found.count : 0 };
    });
    
    const formattedRegistrationStats = months.map(month => {
      const found = registrationStats.find(stat => stat._id === month);
      return { month, count: found ? found.count : 0 };
    });
    
    res.json({
      year: parseInt(year),
      events: formattedEventStats,
      registrations: formattedRegistrationStats
    });
  } catch (error) {
    console.error('Get monthly stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get event attendance status
export const getEventAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Get all registrations for this event
    const registrations = await Registration.find({ eventId: id })
      .populate('userId', 'name email department')
      .sort('createdAt');
    
    // Get attendance percentage
    const totalRegistered = registrations.filter(reg => reg.status === 'REGISTERED').length;
    const totalAttended = registrations.filter(reg => reg.attended).length;
    
    const attendancePercentage = totalRegistered > 0 
      ? Math.round((totalAttended / totalRegistered) * 100) 
      : 0;
    
    res.json({
      event: {
        _id: event._id,
        title: event.title,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime
      },
      attendanceSummary: {
        registered: totalRegistered,
        attended: totalAttended,
        percentage: attendancePercentage
      },
      registrations: registrations.map(reg => ({
        _id: reg._id,
        user: {
          _id: reg.userId._id,
          name: reg.userId.name,
          email: reg.userId.email,
          department: reg.userId.department
        },
        status: reg.status,
        attended: reg.attended,
        createdAt: reg.createdAt
      }))
    });
  } catch (error) {
    console.error('Get event attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get department-wise event participation statistics
export const getDepartmentStats = async (req, res) => {
  try {
    // Get events by department
    const eventsByDepartment = await Event.aggregate([
      { $match: { department: { $exists: true, $ne: null } } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get registrations by user department
    const registrationsByDepartment = await Registration.aggregate([
      { $match: { status: 'REGISTERED' } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $match: { 'user.department': { $exists: true, $ne: null } } },
      { $group: { _id: '$user.department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      eventsByDepartment: eventsByDepartment.map(item => ({
        department: item._id,
        count: item.count
      })),
      registrationsByDepartment: registrationsByDepartment.map(item => ({
        department: item._id,
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Get department stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Don't allow deleting yourself
    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    // Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user
    await User.findByIdAndDelete(id);
    
    // Clean up related data
    // 1. Delete events organized by this user or reassign them
    await Event.updateMany(
      { organizerId: id },
      { organizerId: req.user._id } // Reassign to the admin who is performing the delete
    );
    
    // 2. Delete user's registrations
    await Registration.deleteMany({ userId: id });
    
    // 3. Delete user's certificates
    await Certificate.deleteMany({ userId: id });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin event statistics
export const getEventAdminStats = async (req, res) => {
  try {
    const now = new Date();
    
    // Get counts for different event statuses
    const [totalEvents, upcomingEvents, activeEvents, pastEvents] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ startDateTime: { $gt: now } }),
      Event.countDocuments({
        startDateTime: { $lte: now },
        endDateTime: { $gte: now }
      }),
      Event.countDocuments({ endDateTime: { $lt: now } })
    ]);
    
    // Get event counts by category
    const eventsByCategory = await Event.aggregate([
      { $match: { category: { $exists: true, $ne: null } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get event counts by department
    const eventsByDepartment = await Event.aggregate([
      { $match: { department: { $exists: true, $ne: null } } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get total registration counts
    const registrationStats = await Registration.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Get monthly event counts for the current year
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1); // Jan 1
    
    const monthlyEvents = await Event.aggregate([
      { $match: { 
        startDateTime: { $gte: startOfYear }
      }},
      {
        $group: {
          _id: { month: { $month: "$startDateTime" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);
    
    // Format the monthly data for charts
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const monthlyData = Array(12).fill(0);
    monthlyEvents.forEach(item => {
      const monthIndex = item._id.month - 1; // Convert 1-based to 0-based
      monthlyData[monthIndex] = item.count;
    });
    
    res.json({
      counts: {
        total: totalEvents,
        upcoming: upcomingEvents,
        active: activeEvents,
        past: pastEvents
      },
      categories: eventsByCategory.map(cat => ({
        name: cat._id,
        count: cat.count
      })),
      departments: eventsByDepartment.map(dept => ({
        name: dept._id,
        count: dept.count
      })),
      registrations: registrationStats.reduce((obj, item) => {
        obj[item._id] = item.count;
        return obj;
      }, {}),
      monthlyData: {
        labels: monthNames,
        data: monthlyData
      }
    });
  } catch (error) {
    console.error('Get event admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events for the admin panel with enhanced filtering
export const getAdminEvents = async (req, res) => {
  try {
    const { 
      department, category, status, search,
      page = 1, limit = 10, sort = 'startDateTime', order = 'desc' 
    } = req.query;
    
    // Build query
    const query = {};
    
    // Apply filters
    if (department) query.department = department;
    if (category) query.category = category;
    
    // Status filtering
    if (status) {
      const now = new Date();
      
      if (status === 'upcoming') {
        query.startDateTime = { $gt: now };
      } else if (status === 'active') {
        query.startDateTime = { $lte: now };
        query.endDateTime = { $gte: now };
      } else if (status === 'past') {
        query.endDateTime = { $lt: now };
      }
    }
    
    // Search functionality
    if (search) {
      // First find organizers that match the search
      const organizers = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      
      const organizerIds = organizers.map(org => org._id);
      
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
      
      if (organizerIds.length > 0) {
        query.$or.push({ organizerId: { $in: organizerIds } });
      }
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    // Get events with organizer info
    const events = await Event.find(query)
      .populate('organizerId', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get registration count for each event
    const eventsWithStats = await Promise.all(events.map(async (event) => {
      const [registrationCount, attendeeCount] = await Promise.all([
        Registration.countDocuments({ eventId: event._id, status: 'REGISTERED' }),
        Registration.countDocuments({ eventId: event._id, attended: true })
      ]);
      
      const eventObj = event.toObject();
      eventObj.registrationCount = registrationCount;
      eventObj.attendeeCount = attendeeCount;
      
      return eventObj;
    }));
    
    // Get total count
    const total = await Event.countDocuments(query);
    
    res.json({
      events: eventsWithStats,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get admin events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
