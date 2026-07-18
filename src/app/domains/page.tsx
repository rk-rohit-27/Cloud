import type { Metadata } from "next";
import PublicLayout from "@/components/public/PublicLayout";
import FeatureGrid from "@/components/public/FeatureGrid";
import FAQ from "@/components/public/FAQ";
import CTASection from "@/components/public/CTASection";
import DomainSearch from "@/components/public/DomainSearch";

export const metadata: Metadata = {
  title: "Domain Names — Find & Register Yours | ZypherHost",
  description:
    "Search and register domain names with free WHOIS privacy, free DNS management, and instant activation. .com from $10.99/yr.",
};

// Fixed string names to all-lowercase key variations to match standard Lucide Client-side index mappings safely
const FEATURES = [
  {
    icon: "shield" as const,
    title: "Free WHOIS Privacy",
    description:
      "Keep your personal details out of public WHOIS records. We replace your name, email, and phone with our privacy proxy — free forever, on every domain.",
  },
  {
    icon: "network" as const,
    title: "Free DNS Management",
    description:
      "Full control over your DNS records — A, AAAA, CNAME, MX, TXT, SRV, and more. Manage from your dashboard with instant propagation.",
  },
  {
    icon: "refresh" as const,
    title: "Free Domain Forwarding",
    description:
      "Redirect your domain to any URL, with or without masking. Point multiple domains at your main site — no technical setup required.",
  },
  {
    icon: "mail" as const,
    title: "Email Forwarding",
    description:
      "Forward emails sent to your domain (hello@yourdomain.com) to any inbox you choose. Professional branding without a separate email plan.",
  },
];

interface TldPrice {
  tld: string;
  popular?: boolean;
  description: string;
  register: number;
  renew: number;
}

const TLD_PRICES: TldPrice[] = [
  { tld: ".com", popular: true, description: "The classic — perfect for any website", register: 10.99, renew: 13.99 },
  { tld: ".net", description: "Great for tech and network brands", register: 12.49, renew: 14.99 },
  { tld: ".org", description: "Trusted by nonprofits and communities", register: 9.99, renew: 12.99 },
  { tld: ".io", popular: true, description: "Loved by startups and developers", register: 39.99, renew: 49.99 },
  { tld: ".dev", description: "For developers and tech portfolios", register: 14.99, renew: 17.99 },
  { tld: ".app", description: "Perfect for mobile and web apps", register: 18.99, renew: 21.99 },
  { tld: ".co", description: "Short, modern alternative to .com", register: 24.99, renew: 29.99 },
  { tld: ".ai", description: "The go-to for AI and ML projects", register: 79.99, renew: 89.99 },
  { tld: ".xyz", description: "Affordable and flexible for any use", register: 2.99, renew: 12.99 },
  { tld: ".store", description: "Built for ecommerce and online shops", register: 4.99, renew: 49.99 },
  { tld: ".blog", description: "Ideal for writers and publishers", register: 11.99, renew: 32.99 },
  { tld: ".tech", description: "For tech companies and SaaS", register: 6.99, renew: 49.99 },
];

const FAQS = [
  {
    question: "How do I transfer a domain to ZypherHost?",
    answer:
      "Initiate a transfer from your dashboard by entering your domain and unlocking it at your current registrar. We'll send the authorization code via email, and the transfer typically completes within 5–7 days. Most transfers include a free 1-year renewal.",
  },
  {
    question: "What are the renewal prices?",
    answer:
      "The first-year registration price is often discounted. Renewals are billed at the standard yearly rate shown for each TLD on this page. We'll always email you before renewal so there are no surprises, and auto-renew is optional.",
  },
  {
    question: "Can I search for multiple domains at once?",
    answer:
      "Yes. The search box supports bulk queries — separate names with commas or spaces and we'll check availability for all of them across multiple TLDs at the same time.",
  },
  {
    question: "Is WHOIS privacy really free?",
    answer:
      "Yes, 100% free forever on every eligible domain. Many registrars charge $10–$15/year for this — we include it at no cost because we believe privacy shouldn't be a paid extra.",
  },
  {
    question: "How long does domain activation take?",
    answer:
      "New registrations are active within minutes. DNS propagation typically completes within a few hours globally, though it can take up to 24–48 hours for every network to update.",
  },
  {
    question: "Do I get a free domain with hosting?",
    answer:
      "Yes — our Premium and Business web hosting plans include a free domain (.com, .net, .org, or dozens of other TLDs) for the first year when you sign up for an annual plan.",
  },
];

export default function DomainsPage() {
  return (
    <PublicLayout>
      {/* Viewport protection layer prevents horizontal scrolling on 320px mobile browsers */}
      <div className="w-full max-w-full overflow-x-hidden break-words selection:bg-neon/30">
        
        {/* Hero Section */}
        <section className="dot-grid relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute -top-40 left-1/4 h-[200px] w-[200px] sm:h-[500px] sm:w-[500px] rounded-full bg-neon/10 blur-[80px] sm:blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-neon-purple/10 blur-[80px] sm:blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-4 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 text-xs sm:text-sm text-[var(--text-secondary)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              <span>Domain Names</span>
            </div>

            <h1 className="font-(family-name:--font-space-grotesk) text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Find your <span className="gradient-text">perfect domain</span>
            </h1>

            <p className="mx-auto mt-3 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-xl leading-relaxed text-[var(--text-secondary)]">
              Search across hundreds of extensions. Free WHOIS privacy and DNS management included with every domain.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-8 sm:mt-12 max-w-3xl">
            <DomainSearch />
          </div>
        </section>

        {/* TLD Pricing */}
        <section id="pricing" className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-24 lg:py-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[100px] sm:blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="text-center">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest gradient-text-sm">
                TLD Pricing
              </span>
              <h2 className="font-(family-name:--font-space-grotesk) mt-2 sm:mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[var(--text-primary)]">
                Choose your <span className="gradient-text">extension</span>
              </h2>
              <p className="mx-auto mt-2 sm:mt-4 max-w-2xl text-xs sm:text-base text-[var(--text-secondary)]">
                Hundreds of TLDs at competitive prices. First-year registration prices shown — renewals are transparent.
              </p>
            </div>

            {/* Grid Layout Layout fixes applied for responsive fluid wrapping */}
            <div className="mt-8 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {TLD_PRICES.map((tld) => (
                <div
                  key={tld.tld}
                  className={`glass-card relative flex flex-col justify-between rounded-xl p-5 sm:p-6 transition-all duration-300 min-h-[190px] ${
                    tld.popular ? "ring-1 ring-neon/30 bg-neon/[0.02]" : ""
                  }`}
                >
                  {tld.popular && (
                    <div className="absolute -top-2.5 right-3 rounded-full bg-linear-to-r from-neon-blue to-neon-purple px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                      {tld.tld}
                    </span>
                    <p className="text-xs text-[var(--text-muted)] leading-normal line-clamp-2 sm:line-clamp-none">
                      {tld.description}
                    </p>
                  </div>

                  <div className="mt-5 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-(family-name:--font-space-grotesk) text-xl sm:text-2xl font-bold text-neon">
                          ${tld.register.toFixed(2)}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">/yr</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">Renews</p>
                        <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                          ${tld.renew.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <a
                      href="/register"
                      className="mt-4 block w-full rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] py-2.5 text-center text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-neon/40 hover:text-neon active:scale-[0.98]"
                    >
                      Register Domain
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid
          eyebrow="Included Free"
          title={<>Every domain <span className="gradient-text">comes with</span></>}
          subtitle="Privacy, DNS, and forwarding — always included, never an upsell."
          features={FEATURES}
        />

        <FAQ
          eyebrow="Domains"
          title={<>Domain <span className="gradient-text">questions</span></>}
          items={FAQS}
        />

        <CTASection
          title="Claim your domain today"
          subtitle="Search 300+ extensions with instant activation, free WHOIS privacy, and free DNS — all managed from one dashboard."
          primaryCta="Search Domains"
          primaryHref="#"
          secondaryCta="View Hosting"
          secondaryHref="/web-hosting"
        />
      </div>
    </PublicLayout>
  );
}