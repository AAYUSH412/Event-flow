"use client";

import { Skeleton } from '@/components/ui/skeleton';
import EventCard, { EventType } from './EventCard';
import { Card, CardContent } from '@/components/ui/card';

interface EventsGridProps {
  events: EventType[];
  isLoading: boolean;
  onViewEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

export default function EventsGrid({ events, isLoading, onViewEvent, onDeleteEvent }: EventsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-5">
              <div className="grid md:grid-cols-5 gap-3 items-center">
                <div className="md:col-span-2 space-y-2">
                  <Skeleton className="h-7 w-4/5" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-5 w-28" />
                </div>
                
                <div className="md:col-span-1 flex justify-end space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-12 flex flex-col items-center justify-center">
          <div className="rounded-full bg-muted p-3 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">No events found</h3>
          <p className="text-muted-foreground text-center mt-1 mb-4">
            No events match your current filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {events.map((event) => (
        <EventCard 
          key={event._id}
          event={event}
          onView={onViewEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
}
