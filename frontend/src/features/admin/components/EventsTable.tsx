import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  ExternalLink, 
  Edit, 
  Trash2,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { formatDate } from '@/features/common/utils/dateUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Types
interface EventType {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  bannerImage?: string;
  organizerId: {
    _id: string;
    name: string;
    email: string;
  };
  department?: string;
  club?: string;
  category?: string;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

interface EventsTableProps {
  events: EventType[];
  isLoading: boolean;
  onDeleteEvent: (id: string) => void;
  onViewEventDetails: (id: string) => void;
  isDeleting: boolean;
}

const EventsTable = ({ events, isLoading, onDeleteEvent, onViewEventDetails, isDeleting }: EventsTableProps) => {
  // Check if event is past
  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      } 
    })
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Event
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Organizer
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event, i) => {
              const isPast = isEventPast(event.endDateTime);
              const now = new Date();
              const start = new Date(event.startDateTime);
              const isActive = now >= start && !isPast;
              
              return (
                <motion.tr 
                  key={event._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => onViewEventDetails(event._id)}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={tableRowVariants}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      {event.bannerImage ? (
                        <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          <img 
                            src={event.bannerImage} 
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-gray-900 dark:text-gray-100 font-medium line-clamp-1">
                          {event.title}
                        </div>
                        {event.category && (
                          <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                            {event.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      <span className="line-clamp-1">{event.organizerId?.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {formatDate(event.startDateTime)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {formatDate(event.startDateTime, 'time')} - {formatDate(event.endDateTime, 'time')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isPast ? (
                      <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                        Past
                      </Badge>
                    ) : isActive ? (
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        Upcoming
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-1">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewEventDetails(event._id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link 
                              href={`/events/${event._id}`}
                              className="flex items-center w-full"
                              target="_blank"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              <span>Public Page</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link 
                              href={`/dashboard/admin/events/${event._id}/edit`}
                              className="flex items-center w-full"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Event</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                            onClick={() => onDeleteEvent(event._id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipProvider>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
