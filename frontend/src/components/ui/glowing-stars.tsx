"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function GlowingStars({
  className,
  starColor = "white",
  size = 1,
  density = 1,
  ...props
}: {
  className?: string
  starColor?: string
  size?: number
  density?: number
  [key: string]: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<
    {
      id: number
      x: number
      y: number
      size: number
      opacity: number
      blinkDuration: number
    }[]
  >([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    // Calculate number of stars based on container size and density
    const starCount = Math.floor((width * height * density) / 10000)

    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: (Math.random() * 0.2 + 0.1) * size, // between 0.1 and 0.3 * size
      opacity: Math.random() * 0.7 + 0.3, // between 0.3 and 1
      blinkDuration: Math.random() * 5 + 2, // between 2s and 7s
    }))

    setStars(newStars)
  }, [density, size])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: starColor,
            opacity: star.opacity,
            animation: `blink ${star.blinkDuration}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
