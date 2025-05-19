"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { cn } from "@/lib/utils"

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(true)
  }, [])

  const uniqueId = useRef(`wavy-background-${Math.random().toString(36).substring(2, 10)}`)

  const speedMap = {
    slow: 15,
    fast: 25,
  }

  const defaultColors = ["#8b5cf6", "#ec4899", "#3b82f6"]

  const waveColors = colors ?? defaultColors

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center justify-center overflow-hidden", containerClassName)}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: shouldRender ? `blur(${blur}px)` : "none",
          transition: "filter 0.3s",
        }}
        {...props}
      >
        <defs>
          <linearGradient id={uniqueId.current} x1="0%" y1="0%" x2="100%" y2="0%">
            {waveColors.map((color, i) => (
              <stop
                key={i}
                stopColor={color}
                stopOpacity={waveOpacity}
                offset={`${(i / (waveColors.length - 1)) * 100}%`}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          d="M0 30 Q 15 20, 30 30 T 60 30 T 90 30 T 120 30 V100 H0 Z"
          fill={backgroundFill || `url(#${uniqueId.current})`}
        >
          {shouldRender && (
            <animate
              attributeName="d"
              values="
                M0 30 Q 15 20, 30 30 T 60 30 T 90 30 T 120 30 V100 H0 Z;
                M0 35 Q 15 40, 30 35 T 60 35 T 90 35 T 120 35 V100 H0 Z;
                M0 30 Q 15 20, 30 30 T 60 30 T 90 30 T 120 30 V100 H0 Z
              "
              dur={`${speedMap[speed]}s`}
              repeatCount="indefinite"
            />
          )}
        </path>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
