"use client";

import { motion } from "framer-motion";
import Icon from "@/components/public/Icon";
import type { IconKey } from "@/components/public/Icon";

export interface Feature {
  icon: IconKey;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
}

// Optimized using modern Orchestration Principles to leverage hardware acceleration (GPU layers)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // Handled automatically at container level to prevent layout recalculation thrashing
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 },
  },
};

export default function FeatureGrid({
  features,
  eyebrow = "Features",
  title,
  subtitle,
}: FeatureGridProps) {
  return (
    <section id="features" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Absolute positioning bounds fixed to safeguard fluid structural sizing ratios */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[100px] sm:blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest gradient-text-sm">
              {eyebrow}
            </span>
            {title && (
              <h2 className="font-(family-name:--font-space-grotesk) mt-3 sm:mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[var(--text-primary)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Switched to structural layout parent orchestration to avoid rendering loop lag issues */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 sm:mt-16 lg:mt-20 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card group rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 will-change-transform backface-visible"
            >
              <Icon 
                name={feature.icon} 
                className="icon-glow mb-4 sm:mb-5 h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.6)]" 
              />
              <h3 className="font-(family-name:--font-space-grotesk) text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 sm:mt-3 leading-relaxed text-sm text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}