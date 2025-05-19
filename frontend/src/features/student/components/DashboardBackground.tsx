import React from 'react';

interface DashboardBackgroundProps {
  children: React.ReactNode;
}

const DashboardBackground: React.FC<DashboardBackgroundProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Background dot pattern with subtle gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-purple-50/20">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 0)',
            backgroundSize: '25px 25px'
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 px-2 md:px-0">
        {children}
      </div>
    </div>
  );
};

export default DashboardBackground;
