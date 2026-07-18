"use client";

import { motion } from "framer-motion";
import { ArrowRight, Server } from "lucide-react";

export default function Hero() {
  return (
    <section className="dot-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[300px] w-[300px] rounded-full bg-neon/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[250px] w-[250px] rounded-full bg-neon-purple/10 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 sm:px-4 text-xs sm:text-sm text-[var(--text-secondary)] backdrop-blur"
        >
          <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neon" />
          <span>Powered by NVMe SSDs &amp; Latest-Gen Hardware</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-(family-name:--font-space-grotesk) text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Next-Gen{" "}
          <span className="gradient-text">Web &amp; Cloud</span>
          <br className="hidden xs:block sm:block" />
          Hosting
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]"
        >
          Deploy your Website, Store, or Application in seconds. Enterprise-grade
          DDoS protection, 99.9% uptime, and 24/7 expert support — all at prices
          that won&apos;t break the bank.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center"
        >
          <a href="#pricing" className="btn-neon flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base w-full sm:w-auto">
            View Plans <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#features" className="btn-ghost flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base w-full sm:w-auto">
            Learn More
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 text-xs sm:text-sm text-[var(--text-muted)]"
        >
          <div>
            <span className="block text-xl sm:text-2xl font-bold text-[var(--text-primary)]">15K+</span>
            Hosted Websites
          </div>
          <div className="hidden sm:block h-8 w-px bg-[var(--glass-border)]" />
          <div>
            <span className="block text-xl sm:text-2xl font-bold text-[var(--text-primary)]">99.9%</span>
            Uptime SLA
          </div>
          <div className="hidden sm:block h-8 w-px bg-[var(--glass-border)]" />
          <div>
            <span className="block text-xl sm:text-2xl font-bold text-[var(--text-primary)]">10+</span>
            Global Locations
          </div>
          <div className="hidden sm:block h-8 w-px bg-[var(--glass-border)]" />
          <div>
            <span className="block text-xl sm:text-2xl font-bold text-[var(--text-primary)]">24/7</span>
            Expert Support
          </div>
        </motion.div>
      </div>
    </section>
  );
}
