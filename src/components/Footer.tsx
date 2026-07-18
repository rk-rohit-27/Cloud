import { Zap } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Hosting: [
    { label: "Web Hosting", href: "/web-hosting" },
    { label: "PHP Hosting", href: "/php-hosting" },
    { label: "Cloud Hosting", href: "/cloud-hosting" },
    { label: "VPS Hosting", href: "/vps-hosting" },
    { label: "Domains", href: "/domains" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "SLA", href: "#" },
    { label: "Acceptable Use", href: "#" },
  ],
  Support: [
    { label: "Knowledge Base", href: "#" },
    { label: "Discord", href: "#" },
    { label: "Support Tickets", href: "/dashboard/support" },
    { label: "Status Page", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Discord", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-[var(--footer-border)] bg-[var(--bg-main)] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Main Links Area */}
        <div className="grid gap-8 sm:gap-12 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand Identity Column */}
          <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group shrink-0 w-fit">
              <Zap className="h-5 w-5 text-neon transition-transform duration-300 group-hover:scale-110" />
              <span className="font-(family-name:--font-space-grotesk) text-lg font-bold text-[var(--text-primary)]">
                Zypher<span className="gradient-text-sm">Host</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
              Next-generation game server and VPS hosting. Deploy in seconds, play
              without limits.
            </p>
            {/* Social Links Chips */}
            <div className="mt-2 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2.5 py-1.5 text-[11px] sm:text-xs text-[var(--text-secondary)] transition-all duration-200 hover:border-neon/40 hover:text-neon active:scale-[0.97]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Mapping Grid */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <h4 className="font-(family-name:--font-space-grotesk) text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-primary)] uppercase opacity-90">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-neon"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sub-Footer Copyright Area */}
        <div className="mt-10 sm:mt-16 flex flex-col items-center justify-between gap-3 border-t border-[var(--footer-border)] pt-6 sm:pt-8 sm:flex-row">
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] text-center sm:text-left">
            &copy; 2026 ZypherHost. All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium tracking-wide">
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}