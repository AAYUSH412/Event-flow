"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Download, 
  Users, 
  Calendar,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { eventService } from '@/features/common/services';

interface EventAnalyticsTabProps {
  eventId: string;
  regStats: {
    registered: number;
    waitlisted: number;
    cancelled: number;
    total: number;
  };
}

const EventAnalyticsTab = ({ eventId, regStats }: EventAnalyticsTabProps) => {
  const [selectedChart, setSelectedChart] = useState<'attendance' | 'registrations' | 'demographics'>('registrations');
  const [eventData, setEventData] = useState<any>(null);

  // Fetch event data if needed
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await eventService.getEventById(eventId);
        setEventData(response.event);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    
    fetchEventData();
  }, [eventId]);

  // For more advanced implementations, use real chart libraries like recharts or chart.js
  const renderChart = () => {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 h-64 flex items-center justify-center">
        {selectedChart === 'registrations' && (
          <div className="text-center">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 border border-indigo-100 dark:border-indigo-900 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered</h4>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{regStats.registered}</span>
                </div>
              </div>
              <div className="p-4 border border-amber-100 dark:border-amber-900 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Waitlisted</h4>
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{regStats.waitlisted}</span>
                </div>
              </div>
              <div className="p-4 border border-red-100 dark:border-red-900 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cancelled</h4>
                <div className="flex items-center mt-2">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{regStats.cancelled}</span>
                </div>
              </div>
            </div>
            
            {/* Registration Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">Registration Progress</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {eventData?.maxParticipants 
                    ? `${regStats.registered} / ${eventData.maxParticipants}` 
                    : `${regStats.registered} registered`}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {eventData?.maxParticipants ? (
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ 
                      width: `${Math.min(100, (regStats.registered / eventData.maxParticipants) * 100)}%` 
                    }}
                  />
                ) : (
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: '100%' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        
        {selectedChart === 'attendance' && (
          <div className="text-center p-6">
            <p className="text-gray-500 dark:text-gray-400">Attendance data will be available after the event.</p>
          </div>
        )}
        
        {selectedChart === 'demographics' && (
          <div className="text-center p-6">
            <p className="text-gray-500 dark:text-gray-400">Demographics data coming soon.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Chart Type Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Analytics Dashboard</h2>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
              selectedChart === 'registrations' 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedChart('registrations')}
          >
            <Users className="h-4 w-4" />
            <span>Registrations</span>
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
              selectedChart === 'attendance' 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedChart('attendance')}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Attendance</span>
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
              selectedChart === 'demographics' 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedChart('demographics')}
          >
            <PieChart className="h-4 w-4" />
            <span>Demographics</span>
          </button>
        </div>
      </div>
      
      {/* Chart Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/30 dark:to-purple-950/30" />
        
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {selectedChart === 'registrations' && 'Registration Analytics'}
              {selectedChart === 'attendance' && 'Attendance Analytics'}
              {selectedChart === 'demographics' && 'Demographics Analytics'}
            </h3>
            
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1 text-sm">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          
          {renderChart()}
          
          {/* Key Performance Indicators */}
          {selectedChart === 'registrations' && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
                <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400">Fill Rate</h4>
                <p className="text-lg font-semibold mt-1 text-gray-800 dark:text-gray-200">
                  {event.maxParticipants 
                    ? `${Math.round((regStats.registered / event.maxParticipants) * 100)}%` 
                    : 'N/A'}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
                <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400">Available Spots</h4>
                <p className="text-lg font-semibold mt-1 text-gray-800 dark:text-gray-200">
                  {event.maxParticipants 
                    ? Math.max(0, event.maxParticipants - regStats.registered)
                    : 'Unlimited'}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
                <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400">Waitlist Ratio</h4>
                <p className="text-lg font-semibold mt-1 text-gray-800 dark:text-gray-200">
                  {regStats.registered > 0 
                    ? `${Math.round((regStats.waitlisted / regStats.registered) * 100)}%`
                    : '0%'}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
                <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400">Conversion Rate</h4>
                <p className="text-lg font-semibold mt-1 text-gray-800 dark:text-gray-200">
                  {regStats.total > 0 
                    ? `${Math.round((regStats.registered / regStats.total) * 100)}%`
                    : '0%'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Registration Trends - Placeholder for future implementation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Event Timeline</h3>
        <div className="relative">
          <div className="border-l-2 border-indigo-200 dark:border-indigo-800 ml-3 pl-6 py-2 space-y-6">
            <div className="relative">
              <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full border-2 border-indigo-500 absolute -left-9 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Event Created</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(event.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="relative">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full border-2 border-purple-500 absolute -left-9 flex items-center justify-center">
                <Users className="h-3 w-3 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">First Registration</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {regStats.registered > 0 ? "Soon after publication" : "No registrations yet"}
              </p>
            </div>
            <div className="relative">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full border-2 border-blue-500 absolute -left-9 flex items-center justify-center">
                <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Event Start</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(event.startDateTime).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventAnalyticsTab;
