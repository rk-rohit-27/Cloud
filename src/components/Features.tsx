"use client";

import { motion } from "framer-motion";
import {
  Shield,
  HardDrive,
  Zap,
  Globe,
  Headphones,
  Clock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade, always-on DDoS mitigation up to 1 Tbps keeps your websites online no matter what.",
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    description:
      "Lightning-fast NVMe drives for near-instant page loading, reduced latency, and blazing I/O performance.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description:
      "Your hosting is ready in under 60 seconds. No waiting — just select your plan and start building.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "10+ data centers worldwide. Pick the location closest to your visitors for the lowest latency.",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description:
      "Real humans, not bots. Our expert team is available around the clock via live chat and tickets.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime SLA",
    description:
      "Redundant hardware and proactive monitoring guarantee rock-solid reliability for your services.",
  },
];

// Responsive variants: Staggering is dynamically disabled on mobile viewports
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      delay: typeof window !== "undefined" && window.innerWidth < 768 ? 0.05 : i * 0.08 
    },
  }),
};

export default function Features() {
  return (
    <section id="features" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow container optimized with layout containment properties */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[100px] sm:blur-[150px] contain-strict" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest gradient-text-sm">
            Why Choose Us
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Built for <span className="gradient-text">Performance</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] px-2">
            Every aspect of our infrastructure is engineered for speed, security,
            and reliability — so you can focus on what matters.
          </p>
        </motion.div>

        {/* Cards grid — Responsive architectural layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="glass-card group rounded-xl p-6 sm:p-8 transform-gpu will-change-transform"
            >
              <feature.icon className="icon-glow mb-4 h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]" />
              <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-sm sm:text-base text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}