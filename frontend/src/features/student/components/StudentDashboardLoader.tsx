import React from 'react';

const StudentDashboardLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
};

export default StudentDashboardLoader;
