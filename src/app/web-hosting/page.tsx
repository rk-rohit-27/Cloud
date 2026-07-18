import type { Metadata } from "next";
import PublicLayout from "@/components/public/PublicLayout";
import PageHero from "@/components/public/PageHero";
import FeatureGrid from "@/components/public/FeatureGrid";
import PricingTable, { type Plan } from "@/components/public/PricingTable";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Web Hosting — Fast, Secure & Effortless | ZypherHost",
  description:
    "Reliable web hosting with LiteSpeed servers, free SSL, daily backups, and 1-click WordPress. 99.9% uptime and 24/7 support.",
};

const FEATURES = [
  {
    icon: "lock" as const,
    title: "Free SSL Certificate",
    description:
      "Every plan includes a free Let's Encrypt SSL certificate, auto-renewed forever. Keep your visitors' data encrypted and your site trusted.",
  },
  {
    icon: "zap" as const,
    title: "LiteSpeed Web Server",
    description:
      "Up to 9x faster than Apache with built-in LSCache. Pages load in milliseconds and handle traffic spikes without breaking a sweat.",
  },
  {
    icon: "globe2" as const,
    title: "cPanel Control Panel",
    description:
      "The industry-standard cPanel dashboard. Manage files, databases, emails, and DNS with a clean, intuitive interface.",
  },
  {
    icon: "database" as const,
    title: "1-Click WordPress",
    description:
      "Install WordPress, Joomla, Drupal, and 100+ apps in a single click. Updates and staging environments included.",
  },
  {
    icon: "refresh" as const,
    title: "Daily Backups",
    description:
      "Automatic daily backups with 30-day retention. Restore your entire account or a single file with one click — no stress.",
  },
  {
    icon: "globe" as const,
    title: "Free CDN",
    description:
      "Cloudflare-powered CDN included on every plan. Serve your content from 300+ edge locations worldwide for blazing speed.",
  },
  {
    icon: "mail" as const,
    title: "Email Accounts",
    description:
      "Professional email at your domain (you@yourdomain.com). Webmail, IMAP/POP3, spam protection, and calendar included.",
  },
  {
    icon: "shield" as const,
    title: "99.9% Uptime SLA",
    description:
      "Redundant infrastructure and proactive monitoring guarantee your site stays online — or we'll credit your account.",
  },
];

const PLANS: Plan[] = [
  {
    name: "Single",
    monthly: 2.99,
    yearly: 2.39,
    description: "Host 1 website with everything you need to get started.",
    features: [
      "1 Website",
      "10 GB NVMe SSD Storage",
      "100 GB Bandwidth",
      "1 Email Account",
      "Free SSL Certificate",
      "Weekly Backups",
      "24/7 Support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    tag: "Most Popular",
    monthly: 4.99,
    yearly: 3.99,
    description: "For growing websites that need more power and freedom.",
    features: [
      "100 Websites",
      "50 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "100 Email Accounts",
      "Free SSL & CDN",
      "Daily Backups",
      "Free Domain (1 year)",
      "Priority Support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    monthly: 8.99,
    yearly: 7.49,
    description: "Maximum performance for high-traffic sites and stores.",
    features: [
      "100 Websites",
      "200 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Email Accounts",
      "Free SSL & CDN",
      "Daily On-Demand Backups",
      "Free Domain (1 year)",
      "Dedicated IP Available",
      "Priority Support",
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    question: "Can I migrate my existing website for free?",
    answer:
      "Yes! Our migration team will move your website, databases, and emails from your previous host at no cost, usually within 24 hours. Just open a ticket after signing up and we'll handle the rest — zero downtime guaranteed.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "Absolutely. Every web hosting plan comes with a 30-day money-back guarantee. If you're not happy for any reason, contact support within 30 days for a full refund — no questions asked.",
  },
  {
    question: "Is a domain name included with hosting?",
    answer:
      "Our Premium and Business plans include a free domain name for the first year (.com, .net, .org, or dozens of other TLDs). The Single plan lets you connect a domain you already own. Renewals are billed at the standard yearly rate.",
  },
  {
    question: "Is WordPress supported and optimized?",
    answer:
      "Yes. Our LiteSpeed servers include the LSCache plugin for WordPress, delivering exceptional page-load speeds out of the box. You also get 1-click WordPress installation, automatic updates, and a built-in staging tool.",
  },
  {
    question: "What happens if I outgrow my plan?",
    answer:
      "Upgrading is instant and seamless — your site stays online with zero downtime. You can upgrade to a higher tier at any time from your dashboard, and we prorate the difference automatically.",
  },
  {
    question: "Do you provide an uptime guarantee?",
    answer:
      "We guarantee 99.9% uptime. If we ever fall short in a given month, contact support and we'll issue a service credit proportional to the downtime you experienced.",
  },
];

export default function WebHostingPage() {
  return (
    <PublicLayout>
      {/* 
        This structural container creates a hard break against horizontal overflows. 
        It forces child layouts to stay inside the strict boundaries of 320px.
      */}
      <div className="w-full max-w-full overflow-x-hidden break-words selection:bg-neon/30">
        <PageHero
          badge="Web Hosting"
          icon="globe"
          title={
            <>
              Web Hosting that&apos;s <span className="gradient-text">fast, secure</span>, and effortless
            </>
          }
          subtitle="LiteSpeed-powered hosting with free SSL, daily backups, and 1-click WordPress. Deploy your site in minutes and scale with confidence."
        />

        <FeatureGrid
          eyebrow="Everything Included"
          title={<>Loaded with <span className="gradient-text">premium features</span></>}
          subtitle="Every plan ships with the tools you need to build, secure, and grow — no upsells, no surprises."
          features={FEATURES}
        />

        {/* Anchor point to safely handle smooth scrolling targets on small viewports */}
        <div id="pricing" className="scroll-mt-20">
          <PricingTable plans={PLANS} />
        </div>

        <FAQ
          eyebrow="Questions?"
          title={<>Frequently asked <span className="gradient-text">questions</span></>}
          items={FAQS}
        />

        <CTASection
          title="Launch your website today"
          subtitle="Get LiteSpeed speed, free SSL, and 24/7 expert support. 30-day money-back guarantee on every plan."
          primaryCta="Start Hosting"
          primaryHref="/register"
          secondaryCta="Compare Plans"
          secondaryHref="#pricing"
        />
      </div>
    </PublicLayout>
  );
}