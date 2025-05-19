"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventType } from './EventCard';
import { CalendarDays, Calendar, Users, Clock } from 'lucide-react';

interface EventsAnalyticsProps {
  events: EventType[];
}

export default function EventsAnalytics({ events }: EventsAnalyticsProps) {
  const now = new Date();
  
  // Calculate statistics
  const upcomingEvents = events.filter((event) => new Date(event.startDateTime) > now).length;
  const pastEvents = events.filter((event) => new Date(event.endDateTime) < now).length;
  const activeEvents = events.filter((event) => {
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    return now >= start && now <= end;
  }).length;
  
  // Calculate categories distribution
  const categoriesCount: Record<string, number> = {};
  events.forEach((event) => {
    if (event.category) {
      categoriesCount[event.category] = (categoriesCount[event.category] || 0) + 1;
    }
  });
  
  // Find top category
  let topCategory = { name: 'None', count: 0 };
  Object.entries(categoriesCount).forEach(([category, count]) => {
    if (count > topCategory.count) {
      topCategory = { name: category, count };
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Events
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{events.length}</div>
          <p className="text-xs text-muted-foreground pt-1">
            All events in the system
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Events
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingEvents}</div>
          <div className="text-xs text-muted-foreground pt-1">
            <span className={upcomingEvents > 0 ? 'text-green-500' : ''}>
              {upcomingEvents > 0 
                ? `Next event ${getNextEventTimeframe(events)}` 
                : 'No upcoming events'}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Events
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeEvents}</div>
          <p className={`text-xs pt-1 ${activeEvents > 0 ? 'text-amber-500' : 'text-muted-foreground'}`}>
            {activeEvents > 0 ? 'Live right now' : 'No active events'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Top Category
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategory.name}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {topCategory.count} event{topCategory.count !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to get timeframe of next event
function getNextEventTimeframe(events: EventType[]): string {
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDateTime) > now)
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  
  if (upcomingEvents.length === 0) return '';
  
  const nextEvent = upcomingEvents[0];
  const nextEventDate = new Date(nextEvent.startDateTime);
  
  // Calculate differences
  const diffTime = nextEventDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays < 7) return `in ${diffDays} days`;
  if (diffDays < 30) return `in ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  return `in ${nextEventDate.toLocaleDateString('en-US', { month: 'short' })}`;
}
