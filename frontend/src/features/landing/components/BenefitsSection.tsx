"use client"

import { motion } from "framer-motion"
import { Zap, Clock, Shield, Star, Globe, LayoutDashboard } from "lucide-react"
import { fadeInUp, staggerContainer } from "./animation-variants"

export default function BenefitsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-700 dark:text-purple-300">
              Benefits
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why choose EventFlow?</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform offers unique advantages for campus event management.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Benefit 1 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Increased Engagement</h3>
            <p className="text-muted-foreground">
              Boost student participation by 40% with our intuitive event discovery and RSVP system.
            </p>
          </motion.div>

          {/* Benefit 2 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Time Saving</h3>
            <p className="text-muted-foreground">
              Reduce administrative work by 60% with automated event management and attendance tracking.
            </p>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Data Security</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security ensures your student data is always protected and compliant.
            </p>
          </motion.div>

          {/* Benefit 4 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalization</h3>
            <p className="text-muted-foreground">
              Tailored event recommendations based on student interests and past attendance.
            </p>
          </motion.div>

          {/* Benefit 5 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cross-Campus Networking</h3>
            <p className="text-muted-foreground">
              Connect with events and clubs across multiple campuses to expand your network.
            </p>
          </motion.div>

          {/* Benefit 6 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
              <LayoutDashboard className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
            <p className="text-muted-foreground">
              Gain valuable insights into event performance and student preferences with detailed reports.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
