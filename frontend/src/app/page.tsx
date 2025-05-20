"use client"

import HeroSection from "@/features/landing/components/HeroSection"
import TrustedBySection from "@/features/landing/components/TrustedBySection"
import StatsSection from "@/features/landing/components/StatsSection"
import FeaturesSection from "@/features/landing/components/FeaturesSection"
import DashboardPreviewSection from "@/features/landing/components/DashboardPreviewSection"
import HowItWorksSection from "@/features/landing/components/HowItWorksSection"
import PricingSection from "@/features/landing/components/PricingSection"
import BenefitsSection from "@/features/landing/components/BenefitsSection"
import TestimonialsSection from "@/features/landing/components/TestimonialsSection"
import FAQSection from "@/features/landing/components/FAQSection"
import NewsletterSection from "@/features/landing/components/NewsletterSection"
import CTASection from "@/features/landing/components/CTASection"
import { Footer } from "@/components/ui/footer"
import { Suspense } from "react"

export default function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">
				<Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
					<section id="hero" className="scroll-mt-20">
						<HeroSection />
					</section>
					
					<section id="trusted-by" className="py-12 md:py-16">
						<TrustedBySection />
					</section>
					
					<section id="stats" className="py-12 md:py-16">
						<StatsSection />
					</section>
					
					<section id="features" className=" ">
						<FeaturesSection />
					</section>
					
					<section id="dashboard-preview" className="">
						<DashboardPreviewSection />
					</section>
					
					<section id="how-it-works" className="">
						<HowItWorksSection />
					</section>
					
					<section id="pricing" className="py-12 md:py-16">
						<PricingSection />
					</section>
					
					<section id="benefits" className="">
						<BenefitsSection />
					</section>
					
					<section id="testimonials" className="py-12 md:py-16">
						<TestimonialsSection />
					</section>
					
					<section id="faq" className="">
						<FAQSection />
					</section>
					
					<section id="newsletter" className="">
						<NewsletterSection />
					</section>
					
					<section id="cta" className="">
						<CTASection />
					</section>
				</Suspense>
			</main>
			<Footer />
		</div>
	)
}
