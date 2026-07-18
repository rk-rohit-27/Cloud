"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

interface Plan {
  name: string;
  tag?: string;
  monthly: number;
  yearly: number;
  description: string;
  features: string[];
  highlighted: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 4.99,
    yearly: 3.99,
    description: "Perfect for small communities and friends.",
    features: [
      "2 GB RAM",
      "1 vCPU Core",
      "25 GB NVMe SSD",
      "1 TB Bandwidth",
      "DDoS Protection",
      "1 Game Server",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    tag: "Most Popular",
    monthly: 12.99,
    yearly: 9.99,
    description: "Ideal for growing servers and modded gameplay.",
    features: [
      "8 GB RAM",
      "2 vCPU Cores",
      "50 GB NVMe SSD",
      "Unlimited Bandwidth",
      "DDoS Protection",
      "3 Game Servers",
      "Priority Support",
      "Custom Subdomain",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 29.99,
    yearly: 24.99,
    description: "Maximum power for large networks & studios.",
    features: [
      "32 GB RAM",
      "6 vCPU Cores",
      "200 GB NVMe SSD",
      "Unlimited Bandwidth",
      "DDoS Protection",
      "Unlimited Servers",
      "Dedicated Support Agent",
      "Custom Domain",
      "Backups & Snapshots",
    ],
    highlighted: false,
  },
];

function BillingToggle({
  yearly,
  setYearly,
}: {
  yearly: boolean;
  setYearly: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <span className={`text-xs sm:text-sm ${!yearly ? "text-(--text-primary) font-medium" : "text-(--text-muted)"}`}>
        Monthly
      </span>

      <button
        onClick={() => setYearly(!yearly)}
        className="toggle-track relative flex w-12 h-6 sm:w-14 sm:h-7 items-center cursor-pointer"
        aria-label="Toggle billing period"
      >
        <span
          className="toggle-thumb"
          style={{
            left: yearly ? "calc(100% - 4px - 1.5rem)" : "4px",
            width: "1.5rem",
          }}
        />
      </button>

      <span className={`text-xs sm:text-sm flex items-center gap-1.5 ${yearly ? "text-(--text-primary) font-medium" : "text-(--text-muted)"}`}>
        Yearly
        <span className="hidden sm:inline-flex rounded-full bg-neon/10 px-2 py-0.5 text-xs font-semibold text-neon">
          Save 20%
        </span>
      </span>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

function PlanCard({ plan, yearly, index }: { plan: Plan; yearly: boolean; index: number }) {
  const price = yearly ? plan.yearly : plan.monthly;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      className={`relative flex flex-col rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
        plan.highlighted
          ? "glass-card ring-1 ring-neon/30 shadow-[0_0_40px_rgba(0,240,255,0.08)]"
          : "glass-card"
      }`}
    >
      {/* Popular badge */}
      {plan.tag && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-linear-to-r from-neon-blue to-neon-purple px-3 py-0.5 sm:px-4 sm:py-1 text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap">
          <Sparkles className="h-3 w-3" /> {plan.tag}
        </div>
      )}

      <h3 className="font-(family-name:--font-space-grotesk) text-lg sm:text-xl font-bold text-(--text-primary)">
        {plan.name}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-(--text-secondary)">{plan.description}</p>

      {/* Price */}
      <div className="mt-4 sm:mt-6">
        <span className="font-(family-name:--font-space-grotesk) text-4xl sm:text-5xl font-extrabold text-(--text-primary)">
          ${price.toFixed(2)}
        </span>
        <span className="ml-1 text-(--text-muted)">/mo</span>
      </div>

      {/* Features */}
      <ul className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-(--text-secondary)">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-neon" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className={` mt-6 sm:mt-8 flex items-center justify-center gap-2 rounded-xl py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
          plan.highlighted
            ? "btn-neon text-white"
            : "btn-ghost"
        }`}
      >
        Order Now <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-75 w-75 sm:h-125 sm:w-125 rounded-full bg-neon-purple/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest gradient-text-sm">
            Pricing
          </span>
          <h2 className="font-(family-name:--font-space-grotesk) mt-3 sm:mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-(--text-primary)">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-(--text-secondary)">
            No hidden fees. No surprise charges. Pick a plan that fits your needs
            and scale as you grow.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mt-8 sm:mt-12">
          <BillingToggle yearly={yearly} setYearly={setYearly} />
        </div>

        {/* Cards */}
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
