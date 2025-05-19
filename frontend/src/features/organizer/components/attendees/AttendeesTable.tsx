"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, MapPin, Mail } from 'lucide-react';

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface EventType {
  _id: string;
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  maxParticipants?: number;
}

interface AttendeeType {
  _id: string;
  user: UserType;
  event: EventType;
  status: 'REGISTERED' | 'WAITLISTED' | 'CANCELLED';
  attended: boolean;
  createdAt: string;
}

interface AttendeesTableProps {
  attendees: AttendeeType[];
  formatDate: (date: string) => string;
}

const AttendeesTable: React.FC<AttendeesTableProps> = ({ attendees, formatDate }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-indigo-100/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Attendee
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Registered On
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendees.map((attendee, index) => (
              <motion.tr 
                key={attendee._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-inner">
                      {attendee.user.profileImage ? (
                        <Image 
                          src={attendee.user.profileImage} 
                          alt={attendee.user.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{attendee.user.name}</div>
                      <div className="text-xs text-gray-500 mt-1 px-2 py-0.5 bg-gray-100 rounded-full inline-block">
                        {attendee.user.role.charAt(0).toUpperCase() + attendee.user.role.slice(1).toLowerCase()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{attendee.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2 p-1.5 bg-indigo-100 rounded-full">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{attendee.event.title}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {attendee.event.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(attendee.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${attendee.status === 'REGISTERED' ? 'bg-green-100 text-green-800' : 
                      attendee.status === 'WAITLISTED' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {attendee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`mailto:${attendee.user.email}`}
                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    Email
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AttendeesTable;
