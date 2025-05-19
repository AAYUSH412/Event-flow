"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "./animation-variants"

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              500+
            </h3>
            <p className="text-muted-foreground">Events Hosted</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              50+
            </h3>
            <p className="text-muted-foreground">Campus Clubs</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              10k+
            </h3>
            <p className="text-muted-foreground">Active Students</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              95%
            </h3>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
