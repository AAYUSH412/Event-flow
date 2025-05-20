"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, X, ArrowRight, Sparkles, CreditCard, Building, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { fadeInUp, staggerContainer } from "./animation-variants"
import React from "react"
import Link from "next/link"

// Optimized PriceCard component with memoization for better performance
const PriceCard = React.memo(({ 
  tier,
  name, 
  description, 
  price, 
  yearly, 
  features, 
  popularPlan,
  icon: Icon,
  disabledFeatures = []
}: { 
  tier: string;
  name: string; 
  description: string; 
  price: number | string; 
  yearly: boolean; 
  features: string[]; 
  popularPlan?: boolean;
  icon: React.ElementType;
  disabledFeatures?: string[];
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/70 dark:backdrop-blur-sm ${
        popularPlan ? "ring-2 ring-violet-500 dark:ring-violet-400" : ""
      }`}
    >
      {popularPlan && (
        <div className="absolute -right-12 top-6 z-10 w-36 rotate-45 bg-gradient-to-r from-violet-600 to-indigo-600 py-2 text-center text-xs font-medium text-white shadow-sm">
          MOST POPULAR
        </div>
      )}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
        <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
      </div>
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
          {tier}
        </h3>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{name}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      <div className="my-6 flex items-baseline">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">
          {typeof price === "number" ? (
            <>
              ${price}
              <span className="text-lg font-normal text-slate-500 dark:text-slate-400">
                /{yearly ? "year" : "mo"}
              </span>
            </>
          ) : (
            price
          )}
        </span>
      </div>
      <Link href={price === "Custom" ? "/contact" : "/auth/register"}>
        <Button
          className={`mb-6 w-full rounded-xl px-8 py-6 text-sm font-medium transition-all ${
            popularPlan
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          }`}
        >
          {price === "Custom" ? "Contact Sales" : "Get Started"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          FEATURES INCLUDED:
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
          {disabledFeatures.map((feature, index) => (
            <li key={index} className="flex items-start opacity-50">
              <X className="mr-2 h-5 w-5 flex-shrink-0 text-slate-400" />
              <span className="text-sm text-slate-500 dark:text-slate-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
})

PriceCard.displayName = 'PriceCard';

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  
  // Calculate yearly prices with discount and save amount
  const discountPercentage = 20;
  const calculateYearlyPrice = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12;
    const discountedPrice = yearlyPrice * (1 - discountPercentage / 100);
    return Math.floor(discountedPrice / 12);
  };

  // Define pricing plans data
  const pricingPlans = [
    {
      tier: "Starter",
      name: "Free",
      description: "Perfect for small student clubs and organizations",
      price: 0,
      icon: Users,
      features: [
        "Up to 5 events per month",
        "Basic analytics",
        "Email notifications",
        "Event check-in",
      ],
      disabledFeatures: [
        "Custom branding",
        "Advanced analytics",
        "Priority support"
      ],
      popularPlan: false,
    },
    {
      tier: "Pro",
      name: "Professional",
      description: "For growing organizations with advanced needs",
      price: yearly ? calculateYearlyPrice(29) : 29,
      icon: CreditCard,
      features: [
        "Unlimited events",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Attendee management",
        "Event templates",
        "API access"
      ],
      popularPlan: true,
    },
    {
      tier: "Enterprise",
      name: "Enterprise",
      description: "Custom solutions for large institutions",
      price: "Custom",
      icon: Building,
      features: [
        "All Pro features",
        "Dedicated account manager",
        "Custom integrations",
        "SLA & premium support",
        "On-premise deployment",
        "White-label solution",
        "Custom development"
      ],
      popularPlan: false,
    },
  ];

  return (
    <section id="pricing" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/20 dark:text-violet-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            <span>Simple, transparent pricing</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Choose the plan that&apos;s right for your 
            <span className="relative ml-2 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                organization
              </span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-violet-100 dark:bg-violet-900/30"></span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            All plans include access to our core platform features. Choose the option that best suits your needs and scale as you grow.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className="text-sm font-medium text-slate-900 dark:text-white">Monthly</span>
            <div className="relative">
              <Switch 
                checked={yearly} 
                onCheckedChange={setYearly} 
                className="data-[state=checked]:bg-gradient-to-r from-violet-600 to-indigo-600" 
              />
              {yearly && (
                <div className="absolute -right-16 -top-10 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Save {discountPercentage}%
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white">Yearly</span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {pricingPlans.map((plan, index) => (
            <PriceCard
              key={index}
              tier={plan.tier}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              yearly={yearly}
              features={plan.features}
              popularPlan={plan.popularPlan}
              icon={plan.icon}
              disabledFeatures={plan.disabledFeatures || []}
            />
          ))}
        </motion.div>

        {/* FAQ section teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Have questions?</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Contact our sales team or check our FAQ section.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full border-slate-300">
              Visit FAQ
            </Button>
            <Button 
              className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
