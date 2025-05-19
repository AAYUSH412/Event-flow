"use client";

import Link from "next/link";

interface EventActionsProps {
  id: string;
  onDeleteClick: () => void;
}

export default function EventActions({ id, onDeleteClick }: EventActionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Actions</h2>
      
      <div className="space-y-3">
        <Link
          href={`/dashboard/admin/events/${id}/edit`}
          className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Edit Event
        </Link>
        
        <button
          onClick={onDeleteClick}
          className="block w-full text-center px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
        >
          Delete Event
        </button>
        
        <Link
          href={`/events/${id}`}
          target="_blank"
          className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          View Public Page
        </Link>
      </div>
    </div>
  );
}
