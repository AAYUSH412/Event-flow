"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "./animation-variants"

export default function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to transform your campus experience?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join EventFlow today and never miss another campus opportunity.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full"
              size="lg"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
