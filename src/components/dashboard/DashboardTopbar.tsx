"use client";

import { useState, useRef, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  CreditCard,
  LifeBuoy,
  Settings,
  LogOut,
} from "lucide-react";

type Props = {
  onToggleSidebar?: () => void;
};

export default function DashboardTopbar({ onToggleSidebar }: Props) {
  // 1. Session data fetching
  const { data: session } = useSession();
  
  // 2. State management
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
  // 3. Dom Refs
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // 4. Optimized Click Outside Event Listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 5. Memoized Profile Calculations
  const { firstName, initials } = useMemo(() => {
    const userName = session?.user?.name || "";
    
    const fName = userName ? userName.split(" ")[0] : "there";
    const parts = userName.split(" ").filter(Boolean);
    const inits = parts.length > 0 
      ? parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase()
      : "ZH";

    return { firstName: fName, initials: inits };
  }, [session]);

  return (
    <header className="dashboard-topbar sticky top-0 z-40 w-full border-b border-(--topbar-border) bg-(--topbar-bg) backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 lg:px-6">
        
        {/* ── LEFT CLUSTER ── */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-md p-2 text-(--text-secondary) hover:bg-(--bg-surface) hover:text-(--text-primary) lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Company Branding Link */}
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-lg px-2 py-1 transition-opacity hover:opacity-80 lg:flex"
          >
            <div className="grid h-7 w-7 place-items-center rounded-md bg-neon/15 text-neon">
              <span className="text-sm font-bold">Z</span>
            </div>
            <span className="font-(family-name:--font-space-grotesk) text-lg font-bold text-[var(--text-primary)]">NexaSky<span className="gradient-text-sm">Cloud</span></span>
          </Link>

          
        </div>

        {/* ── CENTER: SEARCH (Lint Warnings Resolved) ── */}
        <div className="ml-4 hidden max-w-sm flex-1 md:flex">
          <label className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="search"
              placeholder="Search services, tickets, invoices…"
              className="w-full rounded-lg border bg-(--input-bg) border-(--input-border) text-(--text-primary) placeholder:text-(--text-muted) focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/30 py-1.5 pl-9 pr-3 text-sm"
            />
          </label>
        </div>

        <div className="flex-1 md:hidden" />

        {/* ── RIGHT CLUSTER ── */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="rounded-md p-2 text-(--text-secondary) hover:bg-(--bg-surface) hover:text-(--text-primary) md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative rounded-md p-2 text-(--text-secondary) hover:bg-(--bg-surface) hover:text-(--text-primary)"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-neon" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border border-(--glass-border) bg-(--card-bg) p-2 shadow-xl"
                >
                  <div className="px-2 py-1.5 text-xs font-semibold text-(--text-muted)">
                    Notifications
                  </div>
                  <div className="px-2 py-6 text-center text-sm text-(--text-muted)">
                    You&apos;re all caught up.
                  </div>
                  <Link
                    href="/dashboard/activity"
                    onClick={() => setNotifOpen(false)}
                    className="block rounded-md px-2 py-1.5 text-center text-xs font-medium text-neon hover:bg-(--bg-surface)"
                  >
                    View activity
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu Dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md p-1 pr-2 hover:bg-(--bg-surface)"
              aria-label="Account menu"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-neon/15 text-xs font-semibold text-neon">
                {initials}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-(--text-muted) sm:block" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-(--glass-border) bg-(--card-bg) p-1.5 shadow-xl"
                >
                  <div className="border-b border-(--glass-border) px-2 py-2">
                    <div className="truncate text-sm font-medium text-(--text-primary)">
                      {session?.user?.name ?? "User"}
                    </div>
                    <div className="truncate text-xs text-(--text-muted)">
                      {session?.user?.email ?? ""}
                    </div>
                  </div>

                  <MenuLink href="/dashboard" icon={User} label="Overview" onClick={() => setMenuOpen(false)} />
                  <MenuLink href="/dashboard/billing" icon={CreditCard} label="Billing" onClick={() => setMenuOpen(false)} />
                  <MenuLink href="/dashboard/support" icon={LifeBuoy} label="Support" onClick={() => setMenuOpen(false)} />
                  <MenuLink href="/dashboard/settings" icon={Settings} label="Settings" onClick={() => setMenuOpen(false)} />

                  <div className="my-1 border-t border-(--glass-border)" />

                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm text-(--text-secondary) hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

// 6. Formatted & Type-Safe Memoized Sub-component
interface MenuLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

const MenuLink = memo(function MenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: MenuLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-(--text-secondary) hover:bg-(--bg-surface) hover:text-(--text-primary)"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
});