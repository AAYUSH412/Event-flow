"use client"

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Play, ChevronRight, Users, Calendar, BarChart3, Award, ArrowUpRight } from 'lucide-react'
import { BackgroundGradient } from '@/components/ui/background-gradient'

const chartData = [
  { month: 'Jan', events: 22, attendees: 820 },
  { month: 'Feb', events: 28, attendees: 1100 },
  { month: 'Mar', events: 30, attendees: 1250 },
  { month: 'Apr', events: 35, attendees: 1400 },
  { month: 'May', events: 40, attendees: 1600 }
]

const activeUsers = [
  { time: '9:00 AM', count: 124 },
  { time: '12:00 PM', count: 186 },
  { time: '3:00 PM', count: 231 },
  { time: '6:00 PM', count: 280 },
  { time: '9:00 PM', count: 198 }
]

const eventTypes = [
  { name: 'Workshops', percent: 30, color: 'from-blue-500 to-cyan-400' },
  { name: 'Lectures', percent: 25, color: 'from-purple-500 to-violet-500' },
  { name: 'Networking', percent: 20, color: 'from-pink-500 to-rose-400' },
  { name: 'Conferences', percent: 15, color: 'from-amber-500 to-yellow-400' },
  { name: 'Social Events', percent: 10, color: 'from-emerald-500 to-green-400' }
]

const BarChart = ({ data }: { data: typeof chartData }) => {
  const maxValue = Math.max(...data.map(item => item.events))
  
  return (
    <div className="flex items-end justify-between h-36 gap-3 mt-6 px-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <motion.div 
            className="w-12 rounded-t-lg bg-gradient-to-tr from-violet-600 to-indigo-400"
            style={{ height: 0 }}
            animate={{ height: `${(item.events / maxValue) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.7, type: 'spring' }}
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.month}</span>
        </div>
      ))}
    </div>
  )
}

const LineChart = ({ data }: { data: typeof activeUsers }) => {
  const maxValue = Math.max(...data.map(item => item.count))
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (item.count / maxValue) * 100
    return `${x},${y}`
  }).join(' ')
  
  return (
    <div className="relative h-28 w-full mt-6">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.polyline
          points={points}
          fill="none"
          strokeWidth="2"
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      {data.map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item.count / maxValue) * 100
        
        return (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-indigo-500 rounded-full -translate-x-1 -translate-y-1 shadow-md shadow-indigo-500/30"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
          />
        )
      })}
      <div className="flex justify-between mt-4 px-1 text-xs text-slate-500">
        {data.map((item, index) => (
          <div key={index}>{item.time}</div>
        ))}
      </div>
    </div>
  )
}

const DonutChart = ({ data }: { data: typeof eventTypes }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  let currentOffset = 0
  
  return (
    <div className="relative h-44 w-44 mx-auto mt-3">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {data.map((item, index) => {
          const startAngle = currentOffset
          const sliceAngle = (item.percent / 100) * 360
          currentOffset += sliceAngle
          const endAngle = currentOffset
          
          // Convert to radians
          const startAngleRad = (startAngle - 90) * (Math.PI / 180)
          const endAngleRad = (endAngle - 90) * (Math.PI / 180)
          
          // Calculate the coordinates
          const x1 = 50 + 40 * Math.cos(startAngleRad)
          const y1 = 50 + 40 * Math.sin(startAngleRad)
          const x2 = 50 + 40 * Math.cos(endAngleRad)
          const y2 = 50 + 40 * Math.sin(endAngleRad)
          
          // Determine if the slice angle is greater than 180 degrees
          const largeArcFlag = sliceAngle > 180 ? 1 : 0
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ')
          
          return (
            <motion.path
              key={index}
              d={pathData}
              className={`fill-current hover:opacity-90 cursor-pointer`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1, 
                scale: hoveredIndex === index ? 1.05 : 1,
                translateX: hoveredIndex === index ? ((x1 + x2) / 2 - 50) * 0.05 : 0,
                translateY: hoveredIndex === index ? ((y1 + y2) / 2 - 50) * 0.05 : 0
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              fill={`url(#chart-gradient-${index})`}
            />
          )
        })}
        
        <defs>
          {data.map((item, index) => (
            <linearGradient key={index} id={`chart-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`stop-${item.color.split(' ')[0]}`} />
              <stop offset="100%" className={`stop-${item.color.split(' ')[1]}`} />
            </linearGradient>
          ))}
        </defs>
        
        {/* Inner circle for donut effect */}
        <circle cx="50" cy="50" r="25" className="fill-white dark:fill-gray-800" />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs font-medium fill-slate-700 dark:fill-slate-300">
          Events
        </text>
      </svg>
      
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-1"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.color}`} />
            <span className="text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPreviewSection() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <section ref={containerRef} className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-950 dark:to-black/90 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/3 -z-10 h-[250px] w-[250px] rounded-full bg-blue-600 opacity-20 blur-[100px]" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center rounded-full px-3 py-1 mb-4 text-sm font-medium bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-indigo-600/20 text-violet-700 dark:from-violet-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 dark:text-violet-300 backdrop-blur-md border border-violet-700/10 dark:border-violet-400/10">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Real-time Analytics
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-300 dark:to-slate-500">
              Powerful insights at your fingertips
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Manage events, track attendance, and understand engagement metrics with our intuitive dashboard that helps you make data-driven decisions.
          </p>
        </motion.div>
        
        {/* Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glass effect browser frame */}
          <motion.div
            style={{ y, opacity }}
            className="relative rounded-2xl shadow-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Browser controls */}
            <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50/90 to-white/90 dark:from-slate-900/90 dark:to-slate-800/90">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                <div className="w-4 h-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                    <path d="M7 7h.01"></path>
                  </svg>
                </div>
                eventflow.app/dashboard
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="grid grid-cols-12 min-h-[500px]">
              {/* Sidebar */}
              <div className="col-span-2 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                      E
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">EventFlow</span>
                  </div>
                </div>
                
                <nav className="p-2 mt-2 space-y-1">
                  {[
                    { name: "Dashboard", icon: <BarChart3 size={16} /> },
                    { name: "Events", icon: <Calendar size={16} /> },
                    { name: "Users", icon: <Users size={16} /> },
                    { name: "Analytics", icon: <BarChart3 size={16} /> },
                    { name: "Certificates", icon: <Award size={16} /> }
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${i === 0 
                        ? "bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-900 border-l-2 border-violet-600 dark:from-violet-900/20 dark:to-indigo-900/20 dark:text-violet-300" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                    >
                      <div className={`${i === 0 ? "text-violet-600 dark:text-violet-400" : "text-slate-500 dark:text-slate-400"}`}>
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </nav>
              </div>
              
              {/* Main content */}
              <div className="col-span-10 bg-slate-100/70 dark:bg-slate-900/70 p-4 overflow-y-auto">
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, Alex! Here&apos;s what&apos;s happening</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md hover:opacity-90 transition-opacity flex items-center gap-1">
                      <Play size={14} />
                      Demo Tour
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-white font-medium">
                      A
                    </div>
                  </div>
                </div>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { name: "Total Events", value: "184", change: "+12%", icon: <Calendar size={18} /> },
                    { name: "Active Users", value: "3,287", change: "+8%", icon: <Users size={18} /> },
                    { name: "Attendance Rate", value: "92%", change: "+3%", icon: <BarChart3 size={18} /> },
                    { name: "Certificates", value: "1,209", change: "+16%", icon: <Award size={18} /> }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                          {stat.icon}
                        </div>
                        <div className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
                          {stat.change}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Charts section */}
                <div className="grid grid-cols-12 gap-4 mb-6">
                  {/* Event trends chart */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="col-span-12 md:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Event Growth Trend</h3>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded">Monthly</div>
                        <div className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">Yearly</div>
                      </div>
                    </div>
                    <BarChart data={chartData} />
                    <div className="flex items-center mt-4 text-xs text-slate-500">
                      <div className="flex items-center mr-3">
                        <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-violet-600 to-indigo-400 mr-1"></div>
                        <span>Events per month</span>
                      </div>
                      <div className="text-xs italic">Total events this year: 155</div>
                    </div>
                  </motion.div>
                  
                  {/* Distribution chart */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="col-span-12 md:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Event Categories</h3>
                    <DonutChart data={eventTypes} />
                  </motion.div>
                </div>
                
                {/* Activity section */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Active users chart */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="col-span-12 md:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Active Users Today</h3>
                      <div className="text-sm font-medium text-violet-600 dark:text-violet-400">+12% from yesterday</div>
                    </div>
                    <LineChart data={activeUsers} />
                  </motion.div>
                  
                  {/* Upcoming events */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="col-span-12 md:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Upcoming Events</h3>
                      <button className="text-xs text-violet-600 dark:text-violet-400 font-medium hover:underline">View all</button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Tech Innovation Summit", time: "Today, 2:00 PM", attendees: 124 },
                        { name: "Career Development Workshop", time: "Tomorrow, 10:00 AM", attendees: 85 },
                        { name: "Design Thinking Masterclass", time: "May 18, 3:00 PM", attendees: 62 }
                      ].map((event, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                        >
                          <div className={`h-9 w-9 rounded-md flex items-center justify-center text-white font-medium bg-gradient-to-br ${i === 0 ? "from-blue-500 to-cyan-400" : i === 1 ? "from-purple-500 to-violet-500" : "from-pink-500 to-rose-400"}`}>
                            {event.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                              {event.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{event.time}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Users size={14} />
                            {event.attendees}
                          </div>
                          <ChevronRight size={16} className="text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Demo CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 shadow-lg"
          >
            <BackgroundGradient className="rounded-xl overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group px-6 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium flex items-center gap-2"
              >
                Try the live dashboard demo
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  <ArrowUpRight size={16} />
                </span>
              </motion.button>
            </BackgroundGradient>
          </motion.div>
          
          {/* 3D floating elements */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -40 }}
                  animate={{ opacity: 1, x: -40, y: -60 }}
                  exit={{ opacity: 0, x: -20, y: -40 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="absolute top-20 left-0 w-32 h-24 rounded-lg shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 z-10 rotate-[-6deg]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-900 dark:text-white">Registration</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Event registrations up 18% this week!
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 120 }}
                  animate={{ opacity: 1, x: 40, y: 100 }}
                  exit={{ opacity: 0, x: 20, y: 120 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  className="absolute bottom-20 right-0 w-36 h-28 rounded-lg shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 z-10 rotate-[5deg]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center text-white text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                        <path d="M10 19c0 1-1 2-2 2H5a2 2 0 0 1-2-2v-6c0-1.1.9-2 2-2h3.18"></path>
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <path d="M13.5 7h4"></path>
                        <path d="M13.5 11h4"></path>
                        <path d="M13.5 15h4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-900 dark:text-white">Certificate</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    94 certificates issued to attendees this month
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
