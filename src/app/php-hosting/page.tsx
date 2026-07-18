import type { Metadata } from "next";
import PublicLayout from "@/components/public/PublicLayout";
import PageHero from "@/components/public/PageHero";
import FeatureGrid from "@/components/public/FeatureGrid";
import PricingTable, { type Plan } from "@/components/public/PricingTable";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "PHP Hosting — Optimized for Speed & Compatibility | NexaSkyCloud",
  description:
    "PHP hosting with selectable PHP 5.6–8.3, MariaDB, Composer, SSH access, and LiteSpeed Cache. Built for developers.",
};

const FEATURES = [
  {
    icon: "layers" as const,
    title: "PHP 5.6 to 8.3",
    description:
      "Switch between any PHP version in one click from your control panel. Run legacy apps and the latest frameworks side by side with zero downtime.",
  },
  {
    icon: "database" as const,
    title: "MariaDB Databases",
    description:
      "Fast, drop-in MySQL replacement with improved performance and features. Manage everything through phpMyAdmin or the command line.",
  },
  {
    icon: "terminal" as const,
    title: "SSH & SFTP Access",
    description:
      "Full SSH access for Composer, WP-CLI, Drush, and custom scripts. Secure SFTP for file transfers. No artificial restrictions.",
  },
  {
    icon: "gauge" as const,
    title: "LiteSpeed Cache",
    description:
      "Server-level LSCache with image optimization, CSS/JS minification, and lazy loading. Page-load times drop to milliseconds.",
  },
  {
    icon: "git" as const, // Fixed to valid standard lucide lookup string mapping
    title: "Git Deployment",
    description:
      "Deploy directly from GitHub, GitLab, or Bitbucket. Push to deploy, branch previews, and rollback in a single click.",
  },
  {
    icon: "code" as const,
    title: "Composer & Node.js",
    description:
      "Pre-installed Composer and Node.js runtimes. Install dependencies, build assets, and run build scripts natively on the server.",
  },
  {
    icon: "refresh" as const, 
    title: "Staging Environments",
    description:
      "Spin up a staging clone of your site to test changes safely. Push to production when ready — files, database, and all.",
  },
  {
    icon: "shield" as const,
    title: "ModSecurity WAF",
    description:
      "Real-time web application firewall with the OWASP ruleset. Blocks SQL injection, XSS, and brute-force attacks before they reach your app.",
  },
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 3.49,
    yearly: 2.79,
    description: "For solo developers and small PHP projects.",
    features: [
      "5 Websites",
      "20 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "MariaDB Databases",
      "PHP 5.6 – 8.3",
      "phpMyAdmin",
      "Weekly Backups",
    ],
    highlighted: false,
  },
  {
    name: "Developer",
    tag: "Most Popular",
    monthly: 6.99,
    yearly: 5.59,
    description: "Full toolkit for agencies and active developers.",
    features: [
      "Unlimited Websites",
      "75 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited MariaDB DBs",
      "PHP 5.6 – 8.3",
      "SSH & SFTP Access",
      "Composer & Git Deploy",
      "Daily Backups",
      "Staging Environments",
    ],
    highlighted: true,
  },
  {
    name: "Agency",
    monthly: 14.99,
    yearly: 11.99,
    description: "High-resource hosting for client portfolios.",
    features: [
      "Unlimited Websites",
      "250 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited MariaDB DBs",
      "PHP 5.6 – 8.3",
      "SSH, SFTP & Cron Jobs",
      "Composer & Git Deploy",
      "Hourly On-Demand Backups",
      "Dedicated IP Available",
      "White-Label Reselling",
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    question: "Can I run multiple PHP versions on the same account?",
    answer:
      "Yes. Each domain or subdomain can use a different PHP version, configurable independently from your control panel. This is perfect for gradually migrating a legacy app to PHP 8.3 without breaking anything.",
  },
  {
    question: "Do you support Composer and modern PHP tooling?",
    answer:
      "Composer is pre-installed and available over SSH on every plan. You also get WP-CLI, Drush, Node.js, npm, and Yarn out of the box — no need to install anything manually.",
  },
  {
    question: "Is SSH access really included?",
    answer:
      "Yes, SSH access is included on all plans (with shell jail restrictions for security). You can run Composer, manage files, set up cron jobs, and run build scripts directly on the server.",
  },
  {
    question: "Can I deploy from Git?",
    answer:
      "Absolutely. Connect a GitHub, GitLab, or Bitbucket repository and enable push-to-deploy. Every push to your chosen branch automatically deploys to your site, and you can roll back to any previous commit instantly.",
  },
  {
    question: "Which PHP frameworks work on your hosting?",
    answer:
      "All of them — Laravel, Symfony, CodeIgniter, CakePHP, Yii, Slim, Lumen, and any other framework. If it runs on standard PHP, it runs on our servers.",
  },
  {
    question: "How do backups work?",
    answer:
      "Starter plans include weekly backups with 30-day retention. Developer and Agency plans get daily backups, and Agency plans can trigger on-demand hourly snapshots. Restore a full account or a single file from your dashboard at any time.",
  },
];

export default function PhpHostingPage() {
  return (
    <PublicLayout>
      {/* Layout wrapper layer safely stops absolute blur objects causing layout jitter on mobile viewports */}
      <div className="w-full max-w-full overflow-x-hidden break-words selection:bg-neon/30">
        <PageHero
          badge="PHP Hosting"
          icon="code"
          title={
            <>
              PHP Hosting built for <span className="gradient-text">developers</span>
            </>
          }
          subtitle="Selectable PHP 5.6–8.3, Composer, SSH access, and LiteSpeed Cache. Deploy Laravel, Symfony, or custom apps with the tools you already love."
        />

        <FeatureGrid
          eyebrow="Developer-First"
          title={<>The tooling <span className="gradient-text">you actually want</span></>}
          subtitle="Everything you need to ship PHP applications fast — no workarounds, no artificial limits."
          features={FEATURES}
        />

        <PricingTable plans={PLANS} />

        <FAQ
          eyebrow="Good to know"
          title={<>PHP hosting <span className="gradient-text">questions</span></>}
          items={FAQS}
        />

        <CTASection
          title="Deploy your PHP app today"
          subtitle="SSH, Composer, Git deploy, and selectable PHP versions — all on LiteSpeed infrastructure. 30-day money-back guarantee."
          primaryCta="Get Started"
          primaryHref="/register"
          secondaryCta="View Features"
          secondaryHref="#features"
        />
      </div>
    </PublicLayout>
  );
}