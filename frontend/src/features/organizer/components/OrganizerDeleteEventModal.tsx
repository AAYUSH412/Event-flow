import React from "react";

interface OrganizerDeleteEventModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function OrganizerDeleteEventModal({ 
  isOpen, 
  isDeleting, 
  onCancel, 
  onDelete 
}: OrganizerDeleteEventModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Event</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this event? This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                Deleting...
              </div>
            ) : (
              "Delete Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
