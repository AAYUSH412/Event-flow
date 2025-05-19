"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  value: number | string;
  linkText: string;
  linkHref: string;
  animationDelay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  value,
  linkText,
  linkHref,
  animationDelay = 0
}) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md border border-indigo-100/50 p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 ${iconBgColor} rounded-xl mr-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-4">{value}</p>
      <Link 
        href={linkHref}
        className="text-sm text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition"
      >
        {linkText}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  );
};

export default StatsCard;
