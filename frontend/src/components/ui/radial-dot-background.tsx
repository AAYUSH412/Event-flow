"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RadialDotBackgroundProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  centerOpacity?: number;
  edgeOpacity?: number;
}

export const RadialDotBackground = ({
  className,
  dotColor = "rgba(255, 255, 255, 1)",
  dotSize = 2,
  dotSpacing = 30,
  centerOpacity = 0.8,
  edgeOpacity = 0.1,
}: RadialDotBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent 0)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          mask: `radial-gradient(circle at center, 
            rgba(0, 0, 0, ${centerOpacity}) 0%, 
            rgba(0, 0, 0, ${(centerOpacity + edgeOpacity) / 2}) 50%, 
            rgba(0, 0, 0, ${edgeOpacity}) 100%)`,
          WebkitMask: `radial-gradient(circle at center, 
            rgba(0, 0, 0, ${centerOpacity}) 0%, 
            rgba(0, 0, 0, ${(centerOpacity + edgeOpacity) / 2}) 50%, 
            rgba(0, 0, 0, ${edgeOpacity}) 100%)`
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default RadialDotBackground;
