"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  ExternalLink, 
  Edit, 
  Trash2,
  Tag
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatDate } from '@/features/common/utils/dateUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/ui/spotlight-components';

export interface EventType {
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

interface EventCardProps {
  event: EventType;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function EventCard({ event, onView, onDelete }: EventCardProps) {
  // Check event status
  const isPast = new Date(event.endDateTime) < new Date();
  const now = new Date();
  const start = new Date(event.startDateTime);
  const isActive = now >= start && !isPast;
  
  // Format date for display
  const startDate = new Date(event.startDateTime);
  const timeFromNow = formatDistanceToNow(startDate, { addSuffix: true });
  
  return (
    <SpotlightCard className="group cursor-pointer overflow-hidden">
      <Card 
        className="h-full border border-border/40 bg-background/60 transition-all hover:border-primary/20 hover:shadow-lg"
        onClick={() => onView(event._id)}
      >
        <CardContent className="p-5">
          <div className="grid md:grid-cols-5 gap-3 items-center">
            {/* Event Title & Category */}
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-lg font-medium truncate">{event.title}</h3>
              
              <div className="flex flex-wrap gap-2 mt-1">
                {event.department && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {event.department}
                  </Badge>
                )}
                
                {event.category && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    <Tag className="w-3.5 h-3.5 mr-1" />
                    {event.category}
                  </Badge>
                )}
                
                <Badge 
                  variant="outline" 
                  className={`${
                    isPast 
                      ? 'bg-gray-50 text-gray-700 border-gray-200' 
                      : isActive
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {isPast ? 'Past' : isActive ? 'Active' : 'Upcoming'}
                </Badge>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="md:col-span-2 space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                <span>{event.organizerId?.name || "Unknown"}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(event.startDateTime)} ({timeFromNow})</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{formatDate(event.startDateTime, 'time')} - {formatDate(event.endDateTime, 'time')}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="md:col-span-1 flex justify-end space-x-3 md:justify-end" onClick={(e) => e.stopPropagation()}>
              <Link 
                href={`/events/${event._id}`}
                className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-600"
                title="View public page"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              
              <Link 
                href={`/dashboard/admin/events/${event._id}/edit`}
                className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 text-blue-600"
                title="Edit event"
              >
                <Edit className="w-4 h-4" />
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(event._id);
                }}
                className="bg-red-100 p-2 rounded-full hover:bg-red-200 text-red-600"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SpotlightCard>
  );
}
