import React from "react";
import Link from "next/link";

const OrganizerEventNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-lg font-medium text-gray-900 mb-2">Event not found</p>
      <Link href="/dashboard/organizer/events" className="text-indigo-600 hover:text-indigo-800">
        Back to my events
      </Link>
    </div>
  );
};

export default OrganizerEventNotFound;
