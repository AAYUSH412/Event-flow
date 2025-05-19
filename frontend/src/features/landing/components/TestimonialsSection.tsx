"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { fadeInUp, staggerContainer } from "./animation-variants"

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-700 dark:text-purple-300">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by students and clubs across campus
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See how EventFlow is transforming the way college events are managed.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
        >
          {/* Testimonial 1 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 h-12 w-12 flex items-center justify-center text-white font-bold text-lg">
                  SJ
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Computer Science Club President</p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "EventFlow has revolutionized how we manage our club events. The dashboard makes tracking attendance
                and engagement so much easier. We've seen a 40% increase in event participation!"
              </p>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 h-12 w-12 flex items-center justify-center text-white font-bold text-lg">
                  MC
                </div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "I never miss campus events anymore. The discovery feature helps me find events aligned with my
                interests, and the calendar integration is a game-changer. The mobile app is super intuitive!"
              </p>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 h-12 w-12 flex items-center justify-center text-white font-bold text-lg">
                  ER
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Faculty Advisor</p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "EventFlow provides the analytics we need to understand student engagement and improve our campus
                events strategy. The reporting features have saved us countless hours of manual work."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
