"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
}

export default function FAQ({
  items,
  eyebrow = "FAQ",
  title,
  subtitle,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-3xl">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
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
              <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className="mt-10 sm:mt-14 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-(family-name:--font-space-grotesk) text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-neon" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Fixed: Inner padding layout container added to prevent height interpolation text stuttering */}
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}