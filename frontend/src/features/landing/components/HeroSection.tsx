"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowRight, PlayCircle, Calendar, Users, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

// Modern 3D-like background elements - Optimized with memo
const BackgroundElements = React.memo(() => {
  return (
    <>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"></div>
      
      {/* Colored Blobs - Simplified for better performance */}
      <div className="absolute left-0 right-0 top-0 -z-10 h-screen w-full pointer-events-none">
        {/* Primary gradient blob - reduced blur for better performance */}
        <div className="absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/0 blur-[80px] dark:from-violet-600/10 dark:to-indigo-600/0 will-change-transform"></div>
        
        {/* Secondary accent blob */}
        <div className="absolute right-[0%] top-[30%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-sky-400/0 to-blue-500/10 blur-[60px] dark:from-sky-400/0 dark:to-blue-500/5 will-change-transform"></div>
        
        {/* Third accent blob */}
        <div className="absolute left-[30%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-t from-violet-500/0 to-fuchsia-500/10 blur-[60px] dark:from-violet-500/0 dark:to-fuchsia-500/5 will-change-transform"></div>
      </div>
    </>
  );
});

BackgroundElements.displayName = 'BackgroundElements';

// Modern 3D particles animation - Optimized for performance
const ParticlesAnimation = () => {
  // Use fewer particles and memoize them for better performance
  const particles = React.useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const size = Math.random() * 5 + 2;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      return { size, initialX, initialY, duration, delay, id: i };
    });
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute z-0 rounded-full bg-blue-500/30 dark:bg-blue-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated feature card - Performance optimized
const FeatureCard = React.memo(({ icon: Icon, title, description, delay = 0 }: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:backdrop-blur-lg"
    >
      <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl dark:bg-violet-500/5"></div>
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 dark:bg-violet-500/20">
          <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Modern 3D app illustration - Optimized with memoization
const AppIllustration = React.memo(() => {
  // Pre-compute the bar heights once instead of on every render
  const barHeights = React.useMemo(() => [40, 70, 30, 85, 50, 65, 75], []);
  
  return (
    <div className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 will-change-transform">
      {/* App header */}
      <div className="flex h-12 items-center border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-sm font-medium text-slate-600 dark:text-slate-300">
          EventFlow Dashboard
        </div>
      </div>
      
      {/* App content */}
      <div className="relative flex aspect-[16/9]">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-14 items-center border-b border-slate-200 px-4 dark:border-slate-700">
            <div className="h-7 w-7 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"></div>
            <div className="ml-2 text-sm font-medium text-slate-800 dark:text-white">EventFlow</div>
          </div>
          <div className="p-2">
            <div className="rounded-md bg-violet-100 p-2 dark:bg-violet-900/30">
              <div className="h-3 w-20 rounded-full bg-violet-500/60 dark:bg-violet-500/50"></div>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mt-2 p-2">
                <div className="h-3 w-20 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content - simplified for better performance */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="h-8 w-36 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
            <div className="mt-2 h-3 w-48 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>
          
          {/* Event cards - reduced complexity */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm dark:bg-slate-800"
              >
                <div className="h-16 rounded-lg bg-gradient-to-r from-violet-500/20 to-indigo-500/20 dark:from-violet-500/20 dark:to-indigo-500/20"></div>
                <div className="mt-2 h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                  <div className="h-5 w-5 rounded-full bg-violet-100 dark:bg-violet-900/30"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts - optimized rendering */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-800">
              <div className="mb-2 h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-600"></div>
              <div className="flex h-32 items-end justify-around">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-4 rounded-t-sm bg-gradient-to-t from-violet-500 to-indigo-500"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-800">
              <div className="mb-2 h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-600"></div>
              <div className="flex h-32 items-center justify-center">
                <div className="h-24 w-24 rounded-full border-8 border-indigo-500/20">
                  <div className="h-full w-full rounded-full border-8 border-violet-500/80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AppIllustration.displayName = 'AppIllustration';

// Animated stats counter - Optimized
const StatsCounter = ({ end, label, delay = 0 }: { end: number, label: string, delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    // Only animate once and only when in view
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const duration = 1500; // Shortened duration
      const startTime = performance.now();
      const endTime = startTime + duration;
      
      const updateCount = () => {
        const now = performance.now();
        if (now >= endTime) {
          setCount(end);
          return;
        }
        
        const progress = (now - startTime) / duration;
        setCount(Math.floor(progress * end));
        requestAnimationFrame(updateCount);
      };
      
      // Add delay before starting animation
      const timerId = setTimeout(() => {
        requestAnimationFrame(updateCount);
      }, delay);
      
      return () => clearTimeout(timerId);
    }
  }, [end, isInView, delay]);
  
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-3xl font-bold text-slate-900 dark:text-white">
        {count}
        {label === 'Success Rate' && '%'}
        {label === 'Universities' && '+'}
      </div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  );
};

export default function HeroSection() {
  // Use throttled scroll effects to reduce the number of calculations
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  // Use a more performant approach with fewer transform values
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  
  // Memoize the avatar images to prevent re-renders
  const avatars = React.useMemo(() => 
    [1, 2, 3, 4].map(i => ({
      id: i,
      src: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
      alt: `User avatar ${i}`
    })), 
  []);
  
  // Optimize animation triggering
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={scrollRef} className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-32">
      <BackgroundElements />
      <ParticlesAnimation />
      
      <div
        ref={containerRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column with text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ y }}
            className="flex flex-col items-start justify-center"
          >
            {/* Rest of the content remains the same */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {/* Tag */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/20 dark:text-violet-300"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                <span>Next Generation Event Platform</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
              >
                <span className="block">
                  Transform your{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      campus experience
                    </span>
                    <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-violet-100 dark:bg-violet-900/30"></span>
                  </span>
                </span>
                <span className="block bg-gradient-to-r from-violet-700 via-indigo-700 to-indigo-500 bg-clip-text text-transparent">
                  with EventFlow
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400"
              >
                Discover, join, and manage campus events seamlessly. Connect with like-minded students and never miss another opportunity to engage with your campus community.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 dark:shadow-violet-800/20 dark:hover:shadow-violet-800/30"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white/80 backdrop-blur-sm transition-all hover:bg-white/95 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800/95"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
              
              {/* Stats */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="mt-12 grid grid-cols-3 gap-8"
              >
                <StatsCounter end={500} label="Events" delay={200} />
                <StatsCounter end={50} label="Universities" delay={400} />
                <StatsCounter end={98} label="Success Rate" delay={600} />
              </motion.div>
              
              {/* Social Proof - Optimized with memoized avatars */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.4 } }
                }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {avatars.map((avatar) => (
                    <div key={avatar.id} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white ring-2 ring-white/20 dark:border-slate-900 dark:ring-slate-800/20">
                      <Image 
                        src={avatar.src}
                        alt={avatar.alt}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        priority={false}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    from <span className="font-medium text-slate-900 dark:text-white">2,000+</span> students
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right column with app illustration - optimized */}
          <motion.div
            style={{ opacity, scale }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-10 flex justify-center lg:mt-0 will-change-transform"
          >
            <div className="relative">
              <div className="absolute -left-6 -top-6 z-0 h-full w-full rounded-3xl border border-violet-100 dark:border-violet-900/30"></div>
              <div className="absolute -right-6 -bottom-6 z-0 h-full w-full rounded-3xl border border-indigo-100 dark:border-indigo-900/30"></div>
              <AppIllustration />
              
              {/* Floating features - only render when in viewport for better performance */}
              {isInView && (
                <>
                  <div className="absolute -left-24 bottom-24 hidden w-60 lg:block">
                    <FeatureCard 
                      icon={Calendar}
                      title="Smart Scheduling"
                      description="AI-powered scheduling to maximize attendance"
                      delay={0.6}
                    />
                  </div>
                  
                  <div className="absolute -right-24 top-24 hidden w-60 lg:block">
                    <FeatureCard 
                      icon={Users}
                      title="Networking"
                      description="Connect with peers who share your interests"
                      delay={0.8}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
