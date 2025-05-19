"use client";

import { motion } from "framer-motion";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <motion.div 
      className="flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 font-medium ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          </span>
        ) : (
          "Create Event"
        )}
      </button>
    </motion.div>
  );
};

export default FormSubmitButton;
