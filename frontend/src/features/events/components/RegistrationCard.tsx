"use client";

import { useState } from "react";
import { Share2, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface RegistrationCardProps {
  isEventOver: boolean;
  isRegistering: boolean;
  userRegistration: {
    status: 'REGISTERED' | 'WAITLISTED' | 'CANCELLED' | null;
    attended: boolean;
  } | null;
  organizerEmail?: string;
  handleRegister: () => void;
  handleCancelRegistration: () => void;
}

const RegistrationCard = ({
  isEventOver,
  isRegistering,
  userRegistration,
  organizerEmail = 'organizer@eventflow.com',
  handleRegister,
  handleCancelRegistration
}: RegistrationCardProps) => {
  const [isShareButtonAnimating, setIsShareButtonAnimating] = useState(false);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setIsShareButtonAnimating(true);
    setTimeout(() => setIsShareButtonAnimating(false), 1000);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isEventOver ? "Event has ended" : "Registration"}
        </h3>
        <p className="text-gray-600">
          {isEventOver 
            ? "This event has already taken place." 
            : userRegistration?.status === "REGISTERED"
            ? "You are registered for this event."
            : userRegistration?.status === "WAITLISTED"
            ? "You are currently on the waitlist."
            : "Register to attend this event."}
        </p>
      </div>
      
      {isEventOver ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <Clock className="h-8 w-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-700 font-medium">Event has ended</p>
        </div>
      ) : (
        <>
          {userRegistration?.status === "REGISTERED" ? (
            <>
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800">You're all set!</p>
                  <p className="text-sm text-green-700">You are registered for this event.</p>
                </div>
              </div>
              <button
                onClick={handleCancelRegistration}
                disabled={isRegistering}
                className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-medium transition flex items-center justify-center"
              >
                {isRegistering ? 
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelling...
                  </span> : 
                  "Cancel Registration"
                }
              </button>
            </>
          ) : userRegistration?.status === "WAITLISTED" ? (
            <>
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800">You're on the waitlist</p>
                  <p className="text-sm text-amber-700">
                    You'll be automatically registered if a spot becomes available.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelRegistration}
                disabled={isRegistering}
                className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-medium transition flex items-center justify-center"
              >
                {isRegistering ? 
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelling...
                  </span> : 
                  "Leave Waitlist"
                }
              </button>
            </>
          ) : (
            <button
              onClick={handleRegister}
              disabled={isRegistering}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
            >
              {isRegistering ? 
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span> : 
                "Register Now"
              }
            </button>
          )}
        </>
      )}
      
      {/* Share Button */}
      <button
        onClick={handleShare}
        className={`w-full mt-4 flex justify-center items-center text-gray-700 hover:text-indigo-600 py-2.5 border border-gray-200 rounded-lg font-medium transition ${isShareButtonAnimating ? 'bg-gray-100' : ''}`}
      >
        <Share2 className={`h-4 w-4 mr-2 ${isShareButtonAnimating ? 'animate-ping' : ''}`} />
        Share Event
      </button>
      
      {/* Contact Organizer Card */}
      <div className="bg-indigo-50 rounded-lg p-5 mt-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-3">Need Help?</h3>
        <p className="text-indigo-700 mb-4">
          If you have any questions about this event, please contact the organizer.
        </p>
        <a
          href={`mailto:${organizerEmail}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
        >
          Contact Organizer
          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
        </a>
      </div>
    </motion.div>
  );
};

export default RegistrationCard;
