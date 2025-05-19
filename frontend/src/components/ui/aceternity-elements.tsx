"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MovingGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[50%] h-[200%] w-[200%] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export const GridPattern = ({
  className,
  dotColor = "rgba(255, 255, 255, 0.3)",
  dotSize = 1.5,
  dotSpacing = 25,
}: {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
}) => {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      <div 
        className="absolute inset-0 w-full h-full dark:opacity-70"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent 0)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export const SpotlightButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
        "relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-0.5 transition-all hover:shadow-md",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
        style={{
          opacity,
          WebkitFilter: "blur(8px)",
          filter: "blur(8px)",
        }}
        animate={{
          left: position.x - 100,
          top: position.y - 100,
        }}
        transition={{ type: "spring", damping: 20 }}
      />
      <div className="relative rounded-lg bg-black/10 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export const FloatingAnimation = ({
  children,
  className,
  initialDelay = 0,
  floatRange = 20,
  duration = 3,
}: {
  children: React.ReactNode;
  className?: string;
  initialDelay?: number;
  floatRange?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-floatRange / 2, floatRange / 2, -floatRange / 2] }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: initialDelay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
