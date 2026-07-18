"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/public/Icon";
import type { IconKey } from "@/components/public/Icon";

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  icon: IconKey;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function PageHero({
  badge,
  title,
  subtitle,
  icon,
  primaryCta = "View Plans",
  primaryHref = "#pricing",
  secondaryCta,
  secondaryHref,
}: PageHeroProps) {
  return (
    <section className="dot-grid relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[300px] w-[300px] rounded-full bg-neon/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[250px] w-[250px] rounded-full bg-neon-purple/10 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Icon + Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 sm:px-4 text-xs sm:text-sm text-[var(--text-secondary)] backdrop-blur"
        >
          <Icon name={icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neon" />
          <span>{badge}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-(family-name:--font-space-grotesk) text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
