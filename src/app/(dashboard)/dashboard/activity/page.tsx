"use client";

import { useState } from "react";
import {
  LogIn,
  LogOut,
  Server,
  Settings2,
  CreditCard,
  Wrench,
  ShieldCheck,
  Activity,
  Plus,
  Power,
  Clock,
} from "lucide-react";

type ActivityType = "login" | "logout" | "service_created" | "service_started" | "service_stopped" | "service_updated" | "billing" | "settings" | "security";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  ip?: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: "a1", type: "login", title: "Signed in", description: "Successful login from Chrome on Windows", timestamp: "5 minutes ago", ip: "192.168.1.***" },
  { id: "a2", type: "service_started", title: "Minecraft SMP started", description: "Game server started successfully on New York node", timestamp: "1 hour ago" },
  { id: "a3", type: "billing", title: "Invoice #2048 generated", description: "$17.98 — Auto-generated for Aug 2026 billing cycle", timestamp: "3 hours ago" },
  { id: "a4", type: "service_updated", title: "Dev VPS upgraded", description: "RAM increased from 1 GB to 2 GB", timestamp: "5 hours ago" },
  { id: "a5", type: "settings", title: "Profile updated", description: "Display name changed", timestamp: "Yesterday at 3:45 PM" },
  { id: "a6", type: "logout", title: "Signed out", description: "Session ended from Chrome on Windows", timestamp: "Yesterday at 2:30 PM" },
  { id: "a7", type: "service_created", title: "New service ordered", description: "Minecraft SMP — Pro plan ($12.99/mo)", timestamp: "Yesterday at 10:15 AM" },
  { id: "a8", type: "billing", title: "Payment confirmed", description: "$12.99 paid via Visa •••• 4242", timestamp: "Yesterday at 10:16 AM" },
];

const TYPE_CONFIG: Record<
  ActivityType,
  {
    icon: typeof LogIn;
    color: string;
    bgColor: string;
    filterGroup: string;
  }
> = {
  login: { icon: LogIn, color: "text-blue-400", bgColor: "bg-blue-500/10", filterGroup: "Security" },
  logout: { icon: LogOut, color: "text-[var(--text-muted)]", bgColor: "bg-[var(--bg-surface)]", filterGroup: "Security" },
  service_created: { icon: Plus, color: "text-green-400", bgColor: "bg-green-500/10", filterGroup: "Services" },
  service_started: { icon: Server, color: "text-green-400", bgColor: "bg-green-500/10", filterGroup: "Services" },
  service_stopped: { icon: Power, color: "text-red-400", bgColor: "bg-red-500/10", filterGroup: "Services" },
  service_updated: { icon: Settings2, color: "text-yellow-400", bgColor: "bg-yellow-500/10", filterGroup: "Services" },
  billing: { icon: CreditCard, color: "text-purple-400", bgColor: "bg-purple-500/10", filterGroup: "Billing" },
  settings: { icon: Wrench, color: "text-sky-400", bgColor: "bg-blue-500/10", filterGroup: "Account" },
  security: { icon: ShieldCheck, color: "text-emerald-400", bgColor: "bg-emerald-500/10", filterGroup: "Security" },
};

type FilterGroup = "All" | "Security" | "Services" | "Billing" | "Account";

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterGroup>("All");

  const filtered =
    filter === "All"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => TYPE_CONFIG[a.type].filterGroup === filter);

  const filterGroups: FilterGroup[] = ["All", "Security", "Services", "Billing", "Account"];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Container */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Activity
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] break-words">
            Track all account events, logins, and service changes.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start sm:self-center rounded-full bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] border border-[var(--glass-border)] shrink-0 shadow-sm">
          <Activity className="h-3.5 w-3.5 text-neon" />
          <span>{ACTIVITIES.length} total events</span>
        </div>
      </div>

      {/* Modern Filter Track */}
      <div className="no-scrollbar flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x">
        {filterGroups.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer snap-ml-4 ${
              filter === g
                ? "border-neon/40 bg-neon/10 text-neon shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                : "border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-neon/30 hover:text-[var(--text-primary)]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Main Container */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center border border-[var(--glass-border)] bg-[var(--bg-card)]">
          <Activity className="mx-auto h-10 w-10 text-[var(--text-muted)] animate-pulse" />
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            No activity events recorded in this category.
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-xl border border-[var(--glass-border)] p-4 sm:p-6 bg-[var(--bg-card)]">
          <div className="relative">
            {/* Timeline Track line position adjustments */}
            <div className="absolute left-[18px] sm:left-[21px] top-4 bottom-4 w-px bg-[var(--glass-border)]" />

            <div className="flex flex-col gap-3">
              {filtered.map((item) => {
                const config = TYPE_CONFIG[item.type];
                const Icon = config.icon;

                return (
                  <div
                    key={item.id}
                    className="group relative flex items-start gap-3 sm:gap-4 rounded-xl p-2 sm:p-3 transition-colors hover:bg-[var(--bg-surface)]/60"
                  >
                    {/* Badge Node */}
                    <div className="relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--bg-card)] transition-transform group-hover:scale-105 shadow-sm">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>

                    {/* Content Component Layer */}
                    <div className="flex-1 min-w-0 pt-1 sm:pt-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] truncate">
                          {item.title}
                        </h4>
                        
                        {/* Meta Timestamp */}
                        <div className="flex items-center gap-1.5 shrink-0 text-[11px] sm:text-xs text-[var(--text-muted)] sm:ml-2">
                          <Clock className="h-3 w-3" />
                          <time className="whitespace-nowrap">{item.timestamp}</time>
                        </div>
                      </div>
                      
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] break-words">
                        {item.description}
                      </p>
                      
                      {item.ip && (
                        <div className="mt-2 inline-flex items-center rounded bg-[var(--bg-surface)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--glass-border)]">
                          IP: {item.ip}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}