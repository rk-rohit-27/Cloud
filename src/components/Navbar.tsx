"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { useSession } from "next-auth/react";

const NAV_LINKS = [
  { label: "Web Hosting", href: "/web-hosting" },
  { label: "VPS Hosting", href: "/vps-hosting" },
  { label: "Cloud Hosting", href: "/cloud-hosting" },
  { label: "Domains", href: "/domains" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="nav-glass fixed top-0 left-0 w-full z-50 border-b border-[var(--glass-border)] bg-[var(--bg-main)]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 sm:py-4">
        {/* Logo */}
        <Logo href="/" height={40} priority className="group transition-opacity duration-300 hover:opacity-90 h-10  w-auto" />

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-neon"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          {session ? (
            <Link href="/dashboard" className="btn-neon px-4 py-2 text-sm font-semibold">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost px-4 py-2 text-sm font-medium">
                Log In
              </Link>
              <Link href="/register" className="btn-neon px-4 py-2 text-sm font-semibold">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions Container */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            className="text-[var(--text-secondary)] p-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] transition-colors hover:text-neon focus:outline-hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Accordion Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-[var(--glass-border)] bg-[var(--bg-main)]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-0.5 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg)] hover:text-neon"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-3 pt-4 border-t border-[var(--glass-border)] mt-3 px-3">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="btn-neon flex-1 py-2.5 text-sm font-semibold text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="btn-ghost flex-1 py-2.5 text-sm font-medium text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="btn-neon flex-1 py-2.5 text-sm font-semibold text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}