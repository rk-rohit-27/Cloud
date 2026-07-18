"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = "Ready to get started?",
  subtitle = "Join thousands of customers who trust ZypherHost with their websites and applications. Deploy in minutes.",
  primaryCta = "Get Started",
  primaryHref = "/register",
  secondaryCta,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Glow accents */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-neon/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-neon-purple/15 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="font-(family-name:--font-space-grotesk) text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {subtitle}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <a
                href={primaryHref}
                className="btn-neon flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
              >
                {primaryCta} <ArrowRight className="h-4 w-4" />
              </a>
              {secondaryCta && secondaryHref && (
                <a
                  href={secondaryHref}
                  className="btn-ghost flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
                >
                  {secondaryCta}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
