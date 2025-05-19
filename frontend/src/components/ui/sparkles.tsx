"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  className?: string
  particleDensity?: number
}) => {
  const [particles, setParticles] = useState<
    {
      id: number
      createdAt: number
      size: number
      x: number
      y: number
      velocity: {
        x: number
        y: number
      }
    }[]
  >([])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const particlesPerThousandPixels = particleDensity || 10
    const numParticles = Math.floor((window.innerWidth * window.innerHeight * particlesPerThousandPixels) / 1000)

    const interval = setInterval(() => {
      if (particles.length >= numParticles) {
        setParticles((prev) => {
          const filtered = prev.filter((p) => {
            return p.createdAt > Date.now() - 1000
          })
          return filtered
        })
        return
      }

      const newParticle = {
        id: Math.random(),
        createdAt: Date.now(),
        size: Math.random() * (maxSize || 4) + (minSize || 1),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        velocity: {
          x: (Math.random() - 0.5) * (speed || 1),
          y: (Math.random() - 0.5) * (speed || 1),
        },
      }

      setParticles((prev) => [...prev, newParticle])
    }, 200)

    return () => clearInterval(interval)
  }, [particles.length, mounted, maxSize, minSize, particleDensity, speed])

  if (!mounted) return null

  return (
    <div
      className={cn("fixed inset-0 z-0", className)}
      style={{
        background: background || "transparent",
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: particleColor || "#fff",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
