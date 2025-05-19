import React from "react";
import Link from "next/link";

const EventNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-lg font-medium text-gray-900 mb-2">Event not found</p>
      <Link href="/dashboard/admin/events" className="text-indigo-600 hover:text-indigo-800">
        Back to all events
      </Link>
    </div>
  );
};

export default EventNotFound;
