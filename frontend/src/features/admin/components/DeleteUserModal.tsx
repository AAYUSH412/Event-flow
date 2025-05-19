"use client";

import { User } from "@/features/common/services";

interface DeleteUserModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  user: User | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({ 
  isOpen, 
  isDeleting, 
  user, 
  onCancel, 
  onConfirm 
}: DeleteUserModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete the user <span className="font-medium">{user?.name}</span>? 
          This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
            ) : (
              "Delete User"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
