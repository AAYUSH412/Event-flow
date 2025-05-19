"use client";

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { BackgroundGradient } from '@/components/ui/animated-elements';

interface EventsHeaderProps {
  totalEvents: number;
}

export default function EventsHeader({ totalEvents }: EventsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Event Management
        </h1>
        <p className="text-muted-foreground mt-1">
          {totalEvents} total events in your system
        </p>
      </div>
      
      <BackgroundGradient className="rounded-lg">
        <Link 
          href="/dashboard/admin/events/create" 
          className="group relative inline-flex items-center gap-1.5 rounded-lg bg-black px-4 py-2.5 text-white shadow-lg transition-all hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Event</span>
        </Link>
      </BackgroundGradient>
    </div>
  );
}
