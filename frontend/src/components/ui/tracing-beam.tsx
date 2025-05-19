"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useVelocity, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50])

  const velocityY = useVelocity(y1)
  const smoothVelocity = useSpring(velocityY, {
    damping: 50,
    stiffness: 400,
  })

  const opacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0, 1, 0])

  return (
    <motion.div ref={ref} className={cn("relative", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(139, 92, 246, 0.5) 0px 0px 30px 10px",
          }}
          className="ml-[27px] h-2 w-2 rounded-full border border-purple-500 bg-white"
        />
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-[19px] block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight} M 1 ${y1} H 12`}
            fill="none"
            stroke="hsl(var(--purple-500))"
            strokeOpacity="0.2"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <motion.path
            d={`M 1 ${y2} H 12`}
            fill="none"
            stroke="hsl(var(--purple-500))"
            strokeWidth="2"
            strokeDasharray="6 6"
            style={{ opacity }}
          />
        </svg>
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0.98 ? "rgba(139, 92, 246, 0.5) 0px 0px 30px 10px" : "none",
          }}
          className="ml-[27px] h-2 w-2 rounded-full border border-purple-500 bg-white"
          style={{
            marginTop: svgHeight - 4,
          }}
        />
      </div>
      <div ref={contentRef} className="ml-4 md:ml-16 pt-10 pb-10">
        {children}
      </div>
    </motion.div>
  )
}
