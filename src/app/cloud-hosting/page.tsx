import type { Metadata } from "next";
import PublicLayout from "@/components/public/PublicLayout";
import PageHero from "@/components/public/PageHero";
import FeatureGrid from "@/components/public/FeatureGrid";
import PricingTable, { type Plan } from "@/components/public/PricingTable";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Cloud Hosting — Dedicated Resources That Scale | ZypherHost",
  description:
    "Cloud hosting with dedicated RAM and CPU, isolated environments, instant scaling, and auto-failover. NVMe storage included.",
};

// Converted all icons to string lookups to prevent Next.js component serialization failures
const FEATURES = [
  {
    icon: "cpu" as const,
    title: "Dedicated CPU Cores",
    description:
      "Reserved vCPU cores that no one else can touch. Predictable, burstable performance for traffic spikes — never throttled.",
  },
  {
    icon: "memory" as const,
    title: "Dedicated RAM",
    description:
      "Guaranteed memory allocation isolated from noisy neighbors. Your apps always get the resources you pay for, every second.",
  },
  {
    icon: "layers" as const,
    title: "Isolated Cloud Environment",
    description:
      "Each cloud instance runs in its own containerized environment with full separation from other tenants. Security and stability baked in.",
  },
  {
    icon: "gauge" as const,
    title: "Instant Scaling",
    description:
      "Bump your CPU, RAM, or storage in seconds — no reboot, no migration, no downtime. Scale to match demand as it happens.",
  },
  {
    icon: "server" as const,
    title: "NVMe SSD Storage",
    description:
      "Enterprise-grade NVMe drives with 10x the IOPS of standard SSDs. Databases, files, and assets serve at memory-like speeds.",
  },
  {
    icon: "activity" as const,
    title: "Auto-Failover",
    description:
      "If your host node fails, your cloud instance automatically restarts on a healthy node within seconds. Built-in high availability.",
  },
  {
    icon: "refresh" as const, // Fixed: Changed from "refreshCw" to "refresh" to match your Feature type allowed union values
    title: "Automatic Snapshots",
    description:
      "Daily point-in-time snapshots with one-click restore. Roll back to any moment in the last 30 days in seconds, not hours.",
  },
  {
    icon: "cloud" as const,
    title: "Full Root Access",
    description:
      "Complete control over your environment. Install any software, configure any service, and run any workload — root is yours.",
  },
];

const PLANS: Plan[] = [
  {
    name: "Cloud Starter",
    monthly: 9.99,
    yearly: 7.99,
    description: "Dedicated cloud resources for small apps and sites.",
    features: [
      "3 GB Dedicated RAM",
      "2 vCPU Cores",
      "50 GB NVMe SSD",
      "1 TB Bandwidth",
      "Dedicated IP Address",
      "Free SSL Certificate",
      "Daily Snapshots",
      "Full Root Access",
    ],
    highlighted: false,
  },
  {
    name: "Cloud Pro",
    tag: "Most Popular",
    monthly: 24.99,
    yearly: 19.99,
    description: "Balanced power for growing apps and SaaS workloads.",
    features: [
      "8 GB Dedicated RAM",
      "4 vCPU Cores",
      "150 GB NVMe SSD",
      "5 TB Bandwidth",
      "Dedicated IP Address",
      "Free SSL Certificate",
      "Daily Snapshots",
      "Auto-Failover",
      "Priority Support",
    ],
    highlighted: true,
  },
  {
    name: "Cloud Enterprise",
    monthly: 54.99,
    yearly: 43.99,
    description: "Maximum performance for high-traffic applications.",
    features: [
      "16 GB Dedicated RAM",
      "8 vCPU Cores",
      "300 GB NVMe SSD",
      "10 TB Bandwidth",
      "Dedicated IP Address",
      "Free SSL Certificate",
      "Hourly Snapshots",
      "Auto-Failover",
      "Dedicated Support Agent",
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    question: "What's the difference between cloud hosting and shared hosting?",
    answer:
      "Shared hosting puts many customers on one server, sharing CPU and RAM. Cloud hosting gives you dedicated, isolated resources in your own environment — so a busy neighbor can never slow you down. You also get full root access and the ability to scale instantly.",
  },
  {
    question: "How fast can I scale my resources?",
    answer:
      "Instantly. You can add or remove CPU, RAM, and storage from your dashboard at any time, and the change applies in seconds without a reboot or downtime. Billing is prorated automatically.",
  },
  {
    question: "Is my environment truly isolated?",
    answer:
      "Yes. Each cloud instance runs in its own containerized environment with dedicated resource quotas and complete separation from other tenants. Your data, CPU cycles, and memory are yours alone.",
  },
  {
    question: "Do I get a dedicated IP address?",
    answer:
      "Every cloud hosting plan includes a dedicated IPv4 address at no extra cost. You can add additional IPs or IPv6 from your dashboard if your workload requires it.",
  },
  {
    question: "What happens during a hardware failure?",
    answer:
      "Auto-failover kicks in automatically. If the physical node running your instance fails, your cloud environment restarts on a healthy node within seconds — no manual intervention required, and minimal downtime.",
  },
  {
    question: "Can I install custom software?",
    answer:
      "Yes. Cloud plans include full root (administrator) access, so you can install any software, run any service, and configure your environment exactly the way you need it.",
  },
];

export default function CloudHostingPage() {
  return (
    <PublicLayout>
      {/* 320px responsive viewport protection shield wrapper */}
      <div className="w-full max-w-full overflow-x-hidden break-words selection:bg-neon/30">
        <PageHero
          badge="Cloud Hosting"
          icon="cloud"
          title={
            <>
              Cloud Hosting with <span className="gradient-text">dedicated resources</span> that scale
            </>
          }
          subtitle="Isolated environments, dedicated CPU and RAM, and instant scaling on NVMe infrastructure. Built for apps that can't afford to share."
        />

        <FeatureGrid
          eyebrow="Enterprise-Grade"
          title={<>Power you don&apos;t <span className="gradient-text">have to share</span></>}
          subtitle="Dedicated resources, isolated environments, and automatic failover — the stability of a dedicated server with cloud flexibility."
          features={FEATURES}
        />

        <div id="pricing" className="scroll-mt-20">
          <PricingTable plans={PLANS} />
        </div>

        <FAQ
          eyebrow="Cloud 101"
          title={<>Cloud hosting <span className="gradient-text">explained</span></>}
          items={FAQS}
        />

        <CTASection
          title="Scale without limits"
          subtitle="Dedicated resources, isolated environments, and auto-failover. Upgrade or downgrade in seconds — no downtime, ever."
          primaryCta="Launch Cloud"
          primaryHref="/register"
          secondaryCta="Compare Plans"
          secondaryHref="#pricing"
        />
      </div>
    </PublicLayout>
  );
}