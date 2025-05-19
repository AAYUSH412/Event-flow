"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, PieChart, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/animated-elements";

interface ModernRegistrationStatsProps {
  id: string;
  regStats: {
    registered: number;
    waitlisted: number;
    cancelled: number;
    total: number;
  };
}

const ModernRegistrationStats = ({ id, regStats }: ModernRegistrationStatsProps) => {  
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      toast.loading("Preparing export...");
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.dismiss();
      toast.success("Export started. Check your downloads folder.");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export attendee list");
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Registration Stats</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl text-white text-center">
              <span className="block text-3xl font-bold mb-1">{regStats.total}</span>
              <span className="text-sm text-indigo-100">Total</span>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
              <span className="block text-3xl font-bold mb-1">{regStats.registered}</span>
              <span className="text-sm text-green-100">Registered</span>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl text-white text-center">
              <span className="block text-3xl font-bold mb-1">{regStats.waitlisted}</span>
              <span className="text-sm text-amber-100">Waitlist</span>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white text-center">
              <span className="block text-3xl font-bold mb-1">{regStats.cancelled}</span>
              <span className="text-sm text-red-100">Cancelled</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/dashboard/organizer/events/${id}/attendees`}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
              <CheckSquare className="h-5 w-5" />
              <span>Manage Attendees</span>
            </Link>
            
            <Link
              href={`/dashboard/organizer/events/${id}/analytics`}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
            >
              <PieChart className="h-5 w-5" />
              <span>View Analytics</span>
            </Link>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              <span>{isExporting ? "Exporting..." : "Export List"}</span>
            </button>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ModernRegistrationStats;
