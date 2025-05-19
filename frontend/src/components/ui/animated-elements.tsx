import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  as: Component = "div",
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <Component
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative flex items-center justify-center z-10",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute -inset-px rounded-lg bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 opacity-0"
        style={{
          opacity,
          WebkitFilter: "blur(15px)",
          filter: "blur(15px)",
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 85%, 0% 60%, 0% 40%, 0% 15%)",
        }}
        animate={{
          left: position.x - 150,
          top: position.y - 150,
        }}
        transition={{ type: "spring", damping: 20 }}
      />
    </Component>
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

export const PatternBackground = ({ 
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
      {/* Dot Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent 0)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`
        }}
        aria-hidden="true"
      />
      
      {/* Academic Icons Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.15]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: Math.random() * 0.4 + 0.2,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {[
              "📚", "🎓", "📝", "🎭", "🎨", "🏆", "📊", "🔬", "⚽️", "🎯",
              "🎤", "🎹", "🧠", "💻", "🏅", "🎪", "🧪", "🏫", "🎬", "📋"
            ][i % 20]}
          </div>
        ))}
      </div>
    </div>
  );
};
