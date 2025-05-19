import React from "react";
import Link from "next/link";

interface OrganizerEventQuickLinksProps {
  id: string;
}

export default function OrganizerEventQuickLinks({ id }: OrganizerEventQuickLinksProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
      
      <div className="space-y-2">
        <Link
          href={`/dashboard/organizer/events/${id}/attendees`}
          className="block text-indigo-600 hover:text-indigo-800"
        >
          • Manage Attendees
        </Link>
        
        <Link
          href={`/dashboard/organizer/events/${id}/analytics`}
          className="block text-indigo-600 hover:text-indigo-800"
        >
          • View Analytics
        </Link>
        
        <Link
          href={`/dashboard/organizer/events/${id}/certificates`}
          className="block text-indigo-600 hover:text-indigo-800"
        >
          • Generate Certificates
        </Link>
        
        <Link
          href={`/dashboard/organizer/events/create?clone=${id}`}
          className="block text-indigo-600 hover:text-indigo-800"
        >
          • Clone Event
        </Link>
      </div>
    </div>
  );
}
