import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface LogoProps {
  className?: string
  href?: string
  hideTextOnMobile?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ 
  className, 
  href = "/", 
  hideTextOnMobile = false,
  size = "md"
}: LogoProps) {
  
  // Determine sizes based on the size prop
  const sizeClasses = {
    sm: {
      logo: "h-7 w-7",
      text: "text-lg",
      letter: "text-sm"
    },
    md: {
      logo: "h-8 w-8",
      text: "text-xl",
      letter: "text-lg"
    },
    lg: {
      logo: "h-10 w-10",
      text: "text-2xl",
      letter: "text-xl"
    }
  }
  
  const logoElement = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative group">
        <motion.div 
          className={cn(
            "relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm", 
            sizeClasses[size].logo
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-600 to-purple-600 transition-opacity duration-300"
            initial={false}
          />
          <div className={cn(
            "absolute inset-0 flex items-center justify-center text-white font-bold", 
            sizeClasses[size].letter
          )}>
            E
          </div>
        </motion.div>
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <motion.span 
        className={cn(
          "font-semibold text-foreground", 
          sizeClasses[size].text,
          { "hidden sm:inline": hideTextOnMobile }
        )}
        initial={false}
        animate={{ x: 0 }}
        whileHover={{ x: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">Event</span>
        <span>Flow</span>
      </motion.span>
    </div>
  )
  
  // If URL is provided and we're not already in a link context, wrap in Link
  if (href) {
    // Instead of using Link, create a direct 'a' tag to avoid potential nested Links
    return (
      <a href={href} className="no-underline hover:no-underline">
        {logoElement}
      </a>
    );
  }
  
  return logoElement;
}
