"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  LifeBuoy,
  Settings,
  CreditCard,
  Activity,
  ChevronRight,
  Plus,
  Globe,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Services", href: "/dashboard/services", icon: Server },
  { label: "Domains", href: "/dashboard/domains", icon: Globe },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Activity", href: "/dashboard/activity", icon: Activity },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col">
      {/* Brand block (only shown inside the desktop sidebar container) */}
      

      {/* Primary nav */}
      <div className=" flex-1 rounded-xl py-3 ">
        <ul className="flex gap-1 flex-col lg:overflow-visible">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href} className="shrink-0 lg:shrink">
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-neon/10 text-neon"
                      : "text-(--text-secondary) hover:bg-(--bg-surface) hover:text-(--text-primary)"
                  }`}
                >
                  {/* Active left bar */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-neon transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* "Create" prompt */}
        <div className="mt-2 hidden border-t border-(--glass-border) pt-2 lg:block">
          <Link
            href="/#pricing"
            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-neon/10 to-neon-purple/10 px-3 py-2.5 text-sm font-semibold text-neon transition-all hover:from-neon/20 hover:to-neon-purple/20"
          >
            <Plus className="h-4 w-4" />
            New Service
          </Link>
        </div>
      </div>
    </nav>
  );
}