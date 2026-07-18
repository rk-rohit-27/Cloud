import type { Metadata } from "next";
import PublicLayout from "@/components/public/PublicLayout";
import PageHero from "@/components/public/PageHero";
import FeatureGrid from "@/components/public/FeatureGrid";
import PricingTable, { type Plan } from "@/components/public/PricingTable";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "VPS Hosting — Full Root Control & NVMe Speed | NexaSkyCloud",
  description:
    "KVM-based VPS hosting with full root access, choice of OS, IPv4+IPv6, and NVMe SSDs. Deploy in under 60 seconds.",
};

// Fixed serialization error by using serializable plain string names instead of raw elements
const FEATURES = [
  {
    icon: "terminal" as const,
    title: "Full Root Access",
    description:
      "Complete administrative control over your VPS. Install any software, run any service, and configure every detail — no restrictions, ever.",
  },
  {
    icon: "layers" as const,
    title: "KVM Virtualization",
    description:
      "True hardware-level virtualization with dedicated resources. Your VPS behaves like a dedicated server, fully isolated from other tenants.",
  },
  {
    icon: "cpu" as const,
    title: "Choice of OS",
    description:
      "One-click install for Ubuntu, Debian, AlmaLinux, Rocky Linux, CentOS, or FreeBSD. Bring your own ISO for ultimate flexibility.",
  },
  {
    icon: "network" as const,
    title: "IPv4 + IPv6 Included",
    description:
      "Every VPS includes a dedicated IPv4 address and native IPv6 connectivity at no extra cost. Add more IPs anytime from your dashboard.",
  },
  {
    icon: "drive" as const,
    title: "NVMe SSD Storage",
    description:
      "Blazing-fast NVMe SSDs with enterprise-grade endurance and redundancy. 10x faster IOPS than traditional SSDs for instant reads and writes.",
  },
  {
    icon: "refresh" as const,
    title: "Snapshot Backups",
    description:
      "On-demand and scheduled snapshots with one-click restore. Capture your entire VPS state and roll back to it in seconds when you need to.",
  },
  {
    icon: "shield" as const,
    title: "Free DDoS Protection",
    description:
      "Network-level DDoS mitigation included on every VPS. Filters attacks up to 1 Tbps before they ever reach your server.",
  },
  {
    icon: "server" as const,
    title: "10+ Global Locations",
    description:
      "Deploy in New York, Frankfurt, London, Singapore, and 7 more regions. Pick the data center closest to your users for the lowest latency.",
  },
];

const PLANS: Plan[] = [
  {
    name: "VPS 1",
    monthly: 5.99,
    yearly: 4.79,
    description: "Entry-level VPS for personal projects and dev environments.",
    features: [
      "2 GB RAM",
      "1 vCPU Core",
      "30 GB NVMe SSD",
      "1 TB Bandwidth",
      "1 Dedicated IPv4",
      "Native IPv6",
      "Free DDoS Protection",
      "Full Root Access",
    ],
    highlighted: false,
  },
  {
    name: "VPS 2",
    tag: "Most Popular",
    monthly: 12.99,
    yearly: 10.39,
    description: "Balanced power for production apps and small teams.",
    features: [
      "8 GB RAM",
      "4 vCPU Cores",
      "100 GB NVMe SSD",
      "4 TB Bandwidth",
      "1 Dedicated IPv4",
      "Native IPv6",
      "Free DDoS Protection",
      "Snapshot Backups",
      "Full Root Access",
    ],
    highlighted: true,
  },
  {
    name: "VPS 4",
    monthly: 29.99,
    yearly: 23.99,
    description: "High-performance VPS for demanding workloads.",
    features: [
      "16 GB RAM",
      "8 vCPU Cores",
      "250 GB NVMe SSD",
      "8 TB Bandwidth",
      "1 Dedicated IPv4",
      "Native IPv6",
      "Free DDoS Protection",
      "Automated Snapshots",
      "Full Root Access",
      "Priority Support",
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    question: "Which operating systems can I install?",
    answer:
      "One-click templates are available for Ubuntu (20.04–24.04), Debian (11–12), AlmaLinux (8–9), Rocky Linux (8–9), CentOS Stream, and FreeBSD. You can also upload your own ISO for any OS we don't pre-package.",
  },
  {
    question: "Do I really get full root access?",
    answer:
      "Yes — every VPS includes full root (administrator) access with no restrictions. You can install any software stack, modify system configs, run Docker, configure firewalls, and customize everything exactly the way you want.",
  },
  {
    question: "How fast can I upgrade my VPS?",
    answer:
      "Upgrades are instant. Add more RAM, CPU, or storage from your dashboard and the new resources apply within seconds. Some upgrades require a quick reboot to take effect; storage upgrades do not. Billing is prorated automatically.",
  },
  {
    question: "What virtualization technology do you use?",
    answer:
      "We use KVM (Kernel-based Virtual Machine), which provides true hardware-level virtualization. This means dedicated resources, full isolation, the ability to run any OS, and performance indistinguishable from a bare-metal dedicated server.",
  },
  {
    question: "Is DDoS protection really free?",
    answer:
      "Yes. Every VPS includes network-level DDoS mitigation that can absorb and filter attacks up to 1 Tbps — at no additional cost. It activates automatically when an attack is detected.",
  },
  {
    question: "Can I choose my server location?",
    answer:
      "Absolutely. We have 10+ data centers worldwide including New York, Frankfurt, London, Singapore, and more. You pick the location during checkout, and you can migrate to a different region later if needed.",
  },
];

export default function VpsHostingPage() {
  return (
    <PublicLayout>
      {/* Structural layout protection block prevents narrow mobile 320px layout bleeding */}
      <div className="w-full max-w-full overflow-x-hidden break-words selection:bg-neon/30">
        <PageHero
          badge="VPS Hosting"
          icon="server"
          title={
            <>
              VPS Hosting with <span className="gradient-text">full root control</span>
            </>
          }
          subtitle="Best for: Full-stack developers, agencies, or custom applications requiring root access and isolated configurations. How it works: Provides completely dedicated, isolated virtual server resources. You get absolute control over your environment, but it requires a bit more technical server administration knowledge. Key Features: Full root access, dedicated IPv6, NVMe storage, and scalable resources."
        />

        <FeatureGrid
          eyebrow="Built for Control"
          title={<>Your server, <span className="gradient-text">your rules</span></>}
          subtitle="Full root access on KVM infrastructure with dedicated resources and the flexibility to run anything you want."
          features={FEATURES}
        />

        <div id="pricing" className="scroll-mt-20">
          <PricingTable plans={PLANS} />
        </div>

        <FAQ
          eyebrow="VPS Basics"
          title={<>VPS hosting <span className="gradient-text">questions</span></>}
          items={FAQS}
        />

        <CTASection
          title="Deploy your VPS in 60 seconds"
          subtitle="Full root access, dedicated resources, and free DDoS protection. Choose your OS and location and you're live in under a minute."
          primaryCta="Deploy Now"
          primaryHref="/register"
          secondaryCta="See Plans"
          secondaryHref="#pricing"
        />
      </div>
    </PublicLayout>
  );
}