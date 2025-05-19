"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fadeInUp } from "./animation-variants"

export default function FAQSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-700 dark:text-orange-300">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently asked questions</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to know about EventFlow.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                You can create an account by clicking the "Register" button in the top right corner of the page.
                You'll need to use your college email address to sign up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is EventFlow free for students?</AccordionTrigger>
              <AccordionContent>
                Yes, EventFlow is completely free for students to use. You can discover events, RSVP, and receive
                certificates without any cost.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do clubs create and manage events?</AccordionTrigger>
              <AccordionContent>
                Club administrators can create events through the admin dashboard. They can set event details,
                manage RSVPs, track attendance, and generate reports all from one place.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I get a certificate for attending an event?</AccordionTrigger>
              <AccordionContent>
                Yes, event organizers can enable digital certificates for their events. Once you've attended and
                your attendance is verified, you'll receive a digital certificate that you can download and share.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Does EventFlow have a mobile app?</AccordionTrigger>
              <AccordionContent>
                Yes, EventFlow is available as a mobile app for both iOS and Android devices. You can download it
                from the App Store or Google Play Store.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
