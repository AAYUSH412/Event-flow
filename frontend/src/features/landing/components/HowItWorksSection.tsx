"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, User, CalendarDays, Ticket, ScrollText, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SparklesCore } from "@/components/ui/sparkles"
import { Button } from "@/components/ui/button"

interface StepProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
  imageUrl: string
  activeStep: number
  setActiveStep: (step: number) => void
  color: string
}

const Step = ({ step, title, description, icon: Icon, imageUrl, activeStep, setActiveStep, color }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(stepRef, { once: false, amount: 0.5 })
  const isActive = activeStep === step
  
  React.useEffect(() => {
    if (isInView) {
      setActiveStep(step)
    }
  }, [isInView, setActiveStep, step])

  return (
    <motion.div 
      ref={stepRef}
      id={`step-${step}`}
      className={cn(
        "flex flex-col lg:flex-row gap-8 lg:gap-16 py-16 items-center transition-opacity",
        isActive ? "opacity-100" : "opacity-50"
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: isActive ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* Content */}
      <div className="flex-1 space-y-6 max-w-md">
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white shadow-lg transform transition-all duration-300 group-hover:scale-110`}>
            <Icon size={24} />
          </div>
          <div className={`h-px flex-1 bg-gradient-to-r ${color.replace('bg-', 'from-')}/20 to-transparent`}></div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color} text-white font-bold text-sm`}>
              {step}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            {description}
          </p>
          
          <motion.div 
            className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden relative"
          >
            <motion.div 
              className={`absolute top-0 left-0 h-full rounded-full ${color}`}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Image */}
      <motion.div 
        className="relative flex-1"
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 aspect-[4/3] max-w-xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Decorative elements */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${color} opacity-20 blur-xl`} />
        <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full ${color} opacity-15 blur-xl`} />
      </motion.div>
    </motion.div>
  )
}

// Navigator component for step indicators
const Navigator = ({ steps, activeStep, setActiveStep }: { 
  steps: number, 
  activeStep: number, 
  setActiveStep: (step: number) => void 
}) => {
  return (
    <div className="hidden lg:flex flex-col fixed z-30 top-1/2 -translate-y-1/2 right-8 gap-3">
      {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
        <motion.button
          key={step}
          onClick={() => {
            setActiveStep(step)
            document.getElementById(`step-${step}`)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            step === activeStep 
              ? "bg-violet-600 scale-125" 
              : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: step === activeStep ? 1.25 : 1 }}
          animate={{ scale: step === activeStep ? 1.25 : 1 }}
        />
      ))}
    </div>
  )
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  
  const steps = [
    {
      step: 1,
      title: "Sign up in seconds",
      description: "Create your account with your college email to unlock personalized event recommendations and exclusive campus experiences.",
      icon: User,
      imageUrl: "/images/universities/clear-space-thumbnails.png",
      color: "bg-gradient-to-r from-violet-600 to-indigo-600"
    },
    {
      step: 2,
      title: "Discover relevant events",
      description: "Browse events filtered by your interests, academic major, and schedule, with AI-powered recommendations tailored just for you.",
      icon: CalendarDays,
      imageUrl: "/images/universities/Stanford-University-Logo.jpg",
      color: "bg-gradient-to-r from-blue-600 to-cyan-600"
    },
    {
      step: 3,
      title: "Register with one tap",
      description: "Secure your spot instantly with our one-click registration system and receive a digital QR ticket for seamless check-in.",
      icon: Ticket,
      imageUrl: "/images/universities/Harvard_University_coat_of_arms.svg.png",
      color: "bg-gradient-to-r from-fuchsia-600 to-pink-600"
    },
    {
      step: 4,
      title: "Earn digital certificates",
      description: "Attend events and automatically receive verifiable digital credentials to showcase on your academic portfolio.",
      icon: ScrollText,
      imageUrl: "/images/universities/MIT-lockup-3line-red.png",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600"
    }
  ]

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/90 dark:from-slate-950 dark:to-slate-900/90" />
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-violet-500 opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 -z-10 h-[250px] w-[250px] rounded-full bg-blue-600 opacity-20 blur-[100px]" />
      </div>
      
      {/* Sparkles */}
      <div className="absolute -top-40 left-0 right-0 h-40 overflow-hidden">
        <SparklesCore
          id="how-it-works-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleColor="#8B5CF6"
          particleDensity={20}
          speed={0.5}
        />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-indigo-600/20 text-violet-700 dark:from-violet-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 dark:text-violet-300 backdrop-blur-md border border-violet-700/10 dark:border-violet-400/10">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
              </span>
              Simple Process
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-white leading-tight mb-4"
          >
            How EventFlow Works
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            From discovering events to earning recognition, our streamlined process makes campus event management effortless.
          </motion.p>
        </motion.div>
        
        {/* Steps */}
        <div className="relative space-y-4">
          {steps.map((step) => (
            <Step 
              key={step.step}
              {...step}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          ))}
        </div>
        
        {/* Step Navigator */}
        <Navigator steps={steps.length} activeStep={activeStep} setActiveStep={setActiveStep} />
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <Link href="/auth/register" className="relative">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
