"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface EventHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const EventHero = ({ searchQuery, onSearchChange }: EventHeroProps) => {
  return (
    <div className="relative overflow-hidden">
      <BackgroundGradient className="absolute inset-0 !opacity-90 !from-indigo-600 !via-indigo-500 !to-purple-700" />
      
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl pt-24 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Discover Amazing Events
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Find and participate in exciting events happening across campus.
            Filter by department, category, or date to find events that interest you.
          </p>
          
          {/* Search bar with animated focus */}
          <div className="relative max-w-2xl mx-auto flex items-center">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 rounded-lg py-3.5 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 shadow-lg text-base"
              aria-label="Search events"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pr-10">
              <Search className="h-5 w-5 text-white/80" />
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle className="bg-white/20 text-white hover:bg-white/30 ml-10 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-20"></div>
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-[120%] h-24 bg-gray-50 dark:bg-gray-900 rounded-[100%] z-10"></div>
    </div>
  );
};

export default EventHero;
