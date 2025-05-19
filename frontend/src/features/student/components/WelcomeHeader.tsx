import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { MovingGradient } from '@/components/ui/aceternity-elements';

interface WelcomeHeaderProps {
  userName: string | undefined;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName }) => {
  return (
    <MovingGradient containerClassName="rounded-2xl overflow-hidden">
      <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-md border border-indigo-100">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Welcome, {userName || 'Student'}!
              </h1>
              <p className="text-gray-500 mt-1">Your academic journey at a glance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MovingGradient>
  );
};

export default WelcomeHeader;
