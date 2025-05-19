import type React from "react"
import { cn } from "@/lib/utils"

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function BackgroundGradient({ className, children, ...props }: BackgroundGradientProps) {
  return (
    <div className={cn("relative group/bg", className)} {...props}>
      <div
        className="absolute -inset-px rounded-[inherit] bg-gradient-to-r from-purple-500 to-blue-500 [mask-image:linear-gradient(black,black)] group-hover/bg:opacity-100 transition duration-500"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
