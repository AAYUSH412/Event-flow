"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn("h-full w-full overflow-hidden [--x:50%] [--y:50%]", className)}
      style={
        {
          "--x": `${mousePosition.x}px`,
          "--y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative h-full w-full">
        <div
          className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-background [mask-image:radial-gradient(100%_100%_at_var(--x)_var(--y),transparent_20%,white_70%)]"
          aria-hidden="true"
        />
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50" aria-hidden="true">
          <defs>
            <radialGradient
              id="beams-radial"
              cx="50%"
              cy="50%"
              r="50%"
              fx="var(--x)"
              fy="var(--y)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.25)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#beams-radial)" />
        </svg>
      </div>
    </div>
  )
}
