"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Download, 
  Search, 
  Mail, 
  UserCheck,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Clock 
} from 'lucide-react';

interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  status: string;
  registrationDate: string;
  user?: {
    name: string;
    email: string;
    organization?: string;
  };
}

interface AttendeesTabProps {
  eventId: string;
  registrations: Registration[];
}

const statusColors = {
  registered: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    icon: <CheckCircle className="h-4 w-4 mr-1.5 text-green-600 dark:text-green-400" />
  },
  waitlisted: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    icon: <Clock className="h-4 w-4 mr-1.5 text-amber-600 dark:text-amber-400" />
  },
  cancelled: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    icon: <XCircle className="h-4 w-4 mr-1.5 text-red-600 dark:text-red-400" />
  }
};

const AttendeesTab = ({ eventId, registrations }: AttendeesTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'registered' | 'waitlisted' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  // Sort and filter registrations
  const filteredRegistrations = registrations
    .filter(reg => {
      // Filter by status
      if (filter !== 'all' && reg.status !== filter) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const userName = reg.user?.name?.toLowerCase() || '';
        const userEmail = reg.user?.email?.toLowerCase() || '';
        const userOrg = reg.user?.organization?.toLowerCase() || '';
        
        return userName.includes(searchLower) || 
               userEmail.includes(searchLower) || 
               userOrg.includes(searchLower);
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.user?.name?.toLowerCase() || '';
        const nameB = b.user?.name?.toLowerCase() || '';
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortBy === 'date') {
        const dateA = new Date(a.registrationDate).getTime();
        const dateB = new Date(b.registrationDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'status') {
        return sortOrder === 'asc' ? 
          a.status.localeCompare(b.status) : 
          b.status.localeCompare(a.status);
      }
      return 0;
    });

  const toggleSort = (field: 'name' | 'date' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedAttendees.length === filteredRegistrations.length) {
      setSelectedAttendees([]);
    } else {
      setSelectedAttendees(filteredRegistrations.map(reg => reg._id));
    }
  };

  const toggleSelectAttendee = (id: string) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(selectedAttendees.filter(attendeeId => attendeeId !== id));
    } else {
      setSelectedAttendees([...selectedAttendees, id]);
    }
  };

  // Download attendee list as CSV
  const downloadAttendeesCSV = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Email', 'Organization', 'Status', 'Registration Date'].join(','),
      ...registrations.map(reg => [
        reg.user?.name || '',
        reg.user?.email || '',
        reg.user?.organization || '',
        reg.status,
        new Date(reg.registrationDate).toLocaleDateString()
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `event-${eventId}-attendees.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Filters and actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-2">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 text-sm border rounded-l-lg ${
                filter === 'all' 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300' 
                : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('registered')}
              className={`px-3 py-2 text-sm border-t border-b border-r ${
                filter === 'registered' 
                ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300' 
                : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
              }`}
            >
              Registered
            </button>
            <button
              onClick={() => setFilter('waitlisted')}
              className={`px-3 py-2 text-sm border-t border-b border-r ${
                filter === 'waitlisted' 
                ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300' 
                : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
              }`}
            >
              Waitlisted
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3 py-2 text-sm border-t border-b border-r rounded-r-lg ${
                filter === 'cancelled' 
                ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300' 
                : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
              }`}
            >
              Cancelled
            </button>
          </div>
          
          <button
            onClick={downloadAttendeesCSV}
            className="inline-flex items-center px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Export CSV
          </button>
          
          {selectedAttendees.length > 0 && (
            <button
              className="inline-flex items-center px-3 py-2 text-sm border border-indigo-200 dark:border-indigo-700 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
            >
              <Mail className="h-4 w-4 mr-1.5" />
              Email Selected
            </button>
          )}
        </div>
      </div>

      {/* Attendee List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 w-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedAttendees.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Attendee</span>
                    {sortBy === 'name' && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center">
                    <span>Registration Date</span>
                    {sortBy === 'date' && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((registration) => {
                  const statusStyle = statusColors[registration.status as keyof typeof statusColors];
                  
                  return (
                    <tr key={registration._id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={selectedAttendees.includes(registration._id)}
                            onChange={() => toggleSelectAttendee(registration._id)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                            {registration.user?.name?.charAt(0) || '?'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {registration.user?.name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {registration.user?.email || 'No email'}
                            </div>
                            {registration.user?.organization && (
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                {registration.user.organization}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          {statusStyle.icon}
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(registration.registrationDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          <UserCheck className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <Users className="h-10 w-10 text-gray-400 mb-2" />
                      {searchTerm || filter !== 'all' ? (
                        <p>No attendees match your search or filter criteria.</p>
                      ) : (
                        <p>No attendees registered for this event yet.</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendeesTab;