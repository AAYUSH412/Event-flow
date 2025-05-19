import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Edit, Trash2 } from "lucide-react";

interface OrganizerEventHeaderProps {
  id: string;
  onDeleteClick: () => void;
  isEventPast: boolean;
  isEventStarted: boolean;
}

export default function OrganizerEventHeader({ 
  id, 
  onDeleteClick, 
  isEventPast, 
  isEventStarted 
}: OrganizerEventHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <Link 
        href="/dashboard/organizer/events" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to my events
      </Link>
      
      <div className="flex items-center space-x-3">
        <Link
          href={`/events/${id}`}
          target="_blank"
          className="inline-flex items-center text-gray-700 hover:text-gray-900"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          View public page
        </Link>
        
        {!isEventPast && (
          <Link
            href={`/dashboard/organizer/events/${id}/edit`}
            className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
        )}
        
        {!isEventStarted && (
          <button
            onClick={onDeleteClick}
            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
