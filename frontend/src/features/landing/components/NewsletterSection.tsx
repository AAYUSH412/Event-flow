"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fadeInUp } from "./animation-variants"

export default function NewsletterSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 z-0"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Stay updated with EventFlow</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Subscribe to our newsletter for the latest features, events, and campus news.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md space-y-2">
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1 bg-background rounded-full" />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
