import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FloatingAnimation, PatternBackground } from '@/components/ui/animated-elements';

export const NoCertificates = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white rounded-xl shadow-md border border-indigo-100 p-8 text-center"
    >
      <PatternBackground dotColor="rgba(79, 70, 229, 0.1)" dotSpacing={20} />
      
      <div className="relative z-10 py-8">
        <FloatingAnimation 
          floatRange={15} 
          duration={4} 
          className="inline-block mb-6"
        >
          <div className="rounded-full bg-indigo-100 p-4">
            <Award className="w-16 h-16 text-indigo-500" />
          </div>
        </FloatingAnimation>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Achievements Await</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Participate in events and complete requirements to earn certificates 
            that showcase your accomplishments and skills.
          </p>
          
          <Button asChild size="lg" className="group">
            <Link href="/dashboard/events">
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-indigo-100/50 blur-xl" />
      <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-blue-100/50 blur-xl" />
    </motion.div>
  );
};
