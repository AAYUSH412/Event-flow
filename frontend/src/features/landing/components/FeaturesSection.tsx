"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Calendar, 
  Users, 
  LayoutDashboard, 
  Award, 
  Bell, 
  Search, 
  Share2, 
  ShieldCheck,
  ArrowRight
} from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { SpotlightCard } from "@/components/ui/spotlight-components"
import { GlowingStars } from "@/components/ui/glowing-stars"
import { fadeInUp, staggerContainer } from "./animation-variants"

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  color: string
  index: number
}

const FeatureCard = ({ icon: Icon, title, description, color, index }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative"
    >
      <SpotlightCard className="h-full">
        <div className="relative z-10 flex flex-col h-full">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} mb-5 transition-all duration-300 group-hover:scale-110`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
            {description}
          </p>
          <div className="mt-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-70 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"></div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

const features = [
  {
    icon: Calendar,
    title: "Smart Event Discovery",
    description: "Find events tailored to your interests with AI-powered recommendations and advanced filtering options.",
    color: "bg-gradient-to-br from-violet-600 to-indigo-600"
  },
  {
    icon: Users,
    title: "Seamless Registration",
    description: "Register with a single tap and receive QR code tickets that simplify check-in at any campus event.",
    color: "bg-gradient-to-br from-blue-600 to-cyan-600"
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Earn verifiable digital certificates for participation, automatically added to your profile portfolio.",
    color: "bg-gradient-to-br from-purple-600 to-pink-600"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get timely reminders about upcoming events you've registered for, never miss an important session.",
    color: "bg-gradient-to-br from-orange-500 to-amber-500"
  },
  {
    icon: LayoutDashboard,
    title: "Organizer Dashboard",
    description: "Comprehensive analytics and tools for event organizers to manage registrations and attendance.",
    color: "bg-gradient-to-br from-emerald-600 to-teal-600"
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Share events with friends and create group registrations for a better campus experience.",
    color: "bg-gradient-to-br from-rose-500 to-red-500"
  },
  {
    icon: ShieldCheck,
    title: "Secure Check-in",
    description: "Contactless check-in system with fraud prevention to ensure a smooth event entry experience.",
    color: "bg-gradient-to-br from-green-600 to-lime-500"
  },
  {
    icon: Search,
    title: "Advanced Analytics",
    description: "Track your participation history and discover events aligned with your academic and career goals.",
    color: "bg-gradient-to-br from-fuchsia-600 to-purple-600"
  },
]

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section id="features" className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white/90 dark:from-slate-950/80 dark:to-black/90" />
        <div className="absolute inset-0">
          <GlowingStars 
            starColor="rgba(139, 92, 246, 0.5)" 
            size={1.2} 
            density={0.7} 
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black" />
      </div>

      <div className="absolute -top-20 left-0 right-0 h-40 overflow-hidden">
        <SparklesCore
          id="features-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleColor="#8B5CF6"
          particleDensity={30}
          speed={1}
        />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div ref={containerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 px-4 py-1.5 text-sm font-medium text-violet-700 dark:from-violet-500/20 dark:to-indigo-500/20 dark:text-violet-300">
              Powerful Features
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-white leading-tight">
              Everything you need for <br className="hidden sm:inline" />
              seamless campus events
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover a suite of tools designed to streamline event management, boost attendance, and create memorable experiences.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <button className="relative flex items-center gap-2 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-6 py-3 rounded-full font-medium">
              Explore All Features
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
