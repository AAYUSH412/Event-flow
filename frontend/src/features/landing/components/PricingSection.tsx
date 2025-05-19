"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "./animation-variants"

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background grid removed */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm text-green-700 dark:text-green-300">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for your organization.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Free Plan */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-lg transition-all flex flex-col"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-muted-foreground mt-2">Perfect for small clubs</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Up to 5 events per month</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Email notifications</span>
              </li>
            </ul>
            <Button className="mt-8 w-full rounded-full" variant="outline">
              Get Started
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-xl transition-all flex flex-col ring-2 ring-purple-500"
          >
            <div className="absolute -top-4 -right-12 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-12 py-1 rotate-45 text-sm font-medium">
              Popular
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-muted-foreground mt-2">For growing organizations</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited events</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom branding</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full">
              Get Started
            </Button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-lg transition-all flex flex-col"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground mt-2">For large institutions</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">Custom</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>All Pro features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>SLA & premium support</span>
              </li>
            </ul>
            <Button className="mt-8 w-full rounded-full" variant="outline">
              Contact Sales
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
