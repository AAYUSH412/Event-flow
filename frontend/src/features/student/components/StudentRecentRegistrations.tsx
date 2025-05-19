import React from 'react';
import { Calendar } from 'lucide-react';

interface StudentRecentRegistrationsProps {
  registrations: any[];
}

const StudentRecentRegistrations: React.FC<StudentRecentRegistrationsProps> = ({
  registrations
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Recent Event Registrations</h2>
      {registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.slice(0, 3).map((registration) => (
            <div 
              key={registration._id} 
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <h3 className="font-medium">{registration.event?.title || 'Event'}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(registration.registrationDate).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  registration.status === 'REGISTERED' 
                    ? 'bg-green-100 text-green-800' 
                    : registration.status === 'WAITLISTED'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {registration.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No event registrations yet.</p>
      )}
    </div>
  );
};

export default StudentRecentRegistrations;
