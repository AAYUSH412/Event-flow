"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard = ({
  children,
  className,
}: SpotlightCardProps) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-bl from-indigo-800/20 to-purple-800/20 p-8 backdrop-blur-sm transition-colors hover:border-white/20",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-400"
        style={{
          opacity,
          WebkitFilter: "blur(30px)",
          filter: "blur(30px)",
        }}
        animate={{
          left: position.x - 150,
          top: position.y - 150,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 150 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const SparkleButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      
      {/* Sparkle effect */}
      <div className="absolute right-0 top-0 h-12 w-12 translate-x-6 -translate-y-6 transform rounded-full bg-white/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="absolute left-0 bottom-0 h-12 w-12 -translate-x-6 translate-y-6 transform rounded-full bg-white/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const GlowingBorder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl bg-transparent p-px",
        className
      )}
    >
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-lg transition-all duration-500 group-hover:opacity-100"></div>
      <div className="relative rounded-xl bg-black p-5">{children}</div>
    </div>
  );
};
