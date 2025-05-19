"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, PieChart, Award, Copy, ChevronRight } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/animated-elements";

interface ModernQuickLinksProps {
  id: string;
}

const ModernQuickLinks = ({ id }: ModernQuickLinksProps) => {
  const quickLinks = [
    {
      title: "Manage Attendees",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-100",
      href: `/dashboard/organizer/events/${id}/attendees`
    },
    {
      title: "View Analytics",
      icon: <PieChart className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-100",
      href: `/dashboard/organizer/events/${id}/analytics`
    },
    {
      title: "Generate Certificates",
      icon: <Award className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-100",
      href: `/dashboard/organizer/events/${id}/certificates`
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <BackgroundGradient className="rounded-2xl overflow-hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-indigo-100/50 p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
          
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="flex items-center">
                    <div className={`p-2 ${link.bg} rounded-lg mr-3`}>
                      {link.icon}
                    </div>
                    <span>{link.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};

export default ModernQuickLinks;
