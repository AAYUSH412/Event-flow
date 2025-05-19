import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  certificateCount: number;
  onSearch: (query: string) => void;
}

export const PageHeader = ({ title, certificateCount, onSearch }: PageHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">
            {certificateCount === 0
              ? "No certificates yet"
              : `You have ${certificateCount} certificate${
                  certificateCount === 1 ? "" : "s"
                }`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <form 
            onSubmit={handleSearch}
            className="relative w-full md:w-auto"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
            />
          </form>
          
          <Button 
            variant="outline" 
            size="icon"
            className="hidden md:flex border-gray-200"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
    </motion.div>
  );
};
