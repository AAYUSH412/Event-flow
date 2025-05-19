import React from "react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "circle" | "ellipsis" | "ripple";
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "circle",
  color = "indigo",
  className = "",
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  
  // Color mapping
  const colorClasses = {
    indigo: "text-indigo-500",
    blue: "text-blue-500",
    green: "text-green-500",
    teal: "text-teal-500",
    purple: "text-purple-500",
    red: "text-red-500",
    pink: "text-pink-500",
  };
  
  const selectedSize = sizeClasses[size];
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || "text-indigo-500";
  
  // Render different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case "ellipsis":
        return (
          <div className={`lds-ellipsis ${selectedSize} ${selectedColor}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      
      case "ripple":
        return (
          <div className={`lds-ripple ${selectedSize} ${selectedColor}`}>
            <div></div>
            <div></div>
          </div>
        );
        
      case "circle":
      default:
        return (
          <div className={`lds-circle ${selectedSize} ${selectedColor}`}>
            <div></div>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <style jsx>{`
        /* Circle Spinner */
        .lds-circle {
          display: inline-block;
          position: relative;
        }
        .lds-circle > div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.7;
          animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        @keyframes lds-circle {
          0%, 100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
          }
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(1800deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
          }
          100% {
            transform: rotateY(3600deg);
          }
        }
        
        /* Ellipsis Spinner */
        .lds-ellipsis {
          display: inline-block;
          position: relative;
        }
        .lds-ellipsis div {
          position: absolute;
          top: 50%;
          width: 25%;
          height: 25%;
          border-radius: 50%;
          background: currentColor;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
          left: 8%;
          animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
          left: 8%;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
          left: 32%;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
          left: 56%;
          animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
        
        /* Ripple Spinner */
        .lds-ripple {
          display: inline-block;
          position: relative;
        }
        .lds-ripple div {
          position: absolute;
          border: 4px solid currentColor;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0;
          }
          4.9% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0;
          }
          5% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      `}</style>
      {renderSpinner()}
    </div>
  );
};

export default LoadingSpinner;
