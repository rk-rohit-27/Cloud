"use client";

import Link from "next/link";
import {
  Server,
  Shield,
  CreditCard,
  Plus,
  ChevronRight,
  User,
  Calendar,
  HardDrive,
  Clock,
  CheckCircle2,
  LogIn,
  Settings2,
  Wrench,
  ArrowUpRight,
  Globe,
  Sparkles,
  Terminal,
  Power,
  Activity,
  Cpu,
  MemoryStick,
  MapPin,
} from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import DomainFinder from "@/components/dashboard/DomainFinder";
import type { ServiceRecord } from "@/lib/services";

interface Props {
  userName: string;
  services: ServiceRecord[];
}

const RECENT_ACTIVITY = [
  { icon: LogIn, title: "Signed in from Chrome on Windows", time: "5 min ago", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { icon: Server, title: "Web server started on New York", time: "1 hour ago", color: "text-green-400", bgColor: "bg-green-500/10" },
  { icon: CreditCard, title: "Invoice #2048 generated — $17.98", time: "3 hours ago", color: "text-neon-purple", bgColor: "bg-purple-500/10" },
  { icon: Settings2, title: "Dev VPS RAM upgraded to 2 GB", time: "5 hours ago", color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  { icon: Wrench, title: "Display name changed", time: "Yesterday", color: "text-neon-blue", bgColor: "bg-blue-500/10" },
] as const;

export default function DashboardOverview({ userName, services }: Props) {
  const firstName = (userName || "User").split(" ")[0];
  const activeCount = services.filter((s) => s.status === "Active").length;
  const totalMonthly = services.reduce((sum, s) => sum + (s.priceMonthly || 0), 0);

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6 sm:space-y-8  sm:px-0">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between w-full overflow-hidden">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Overview
          </p>
          <h1 className="mt-1 font-(family-name:--font-space-grotesk) text-2xl font-bold text-[var(--text-primary)] sm:text-3xl truncate">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] truncate">
            Here&apos;s what&apos;s happening across your NexaSkyCloud account today.
          </p>
        </div>
        <div className="flex flex-row gap-2 w-full sm:w-auto shrink-0">
          <LinkButton href="/#pricing" variant="neon" className="flex-1 sm:flex-none justify-center items-center gap-1.5 px-3 py-2 text-xs sm:text-sm">
            <Plus className="h-4 w-4 shrink-0" /> <span className="truncate">New Service</span>
          </LinkButton>
          <LinkButton href="/dashboard/support" variant="outline" className="flex-1 sm:flex-none justify-center items-center gap-1.5 px-3 py-2 text-xs sm:text-sm">
            <Shield className="h-4 w-4 shrink-0" /> <span className="truncate">Get Help</span>
          </LinkButton>
        </div>
      </div>

      {/* HERO + STATS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full">
        <div className="relative overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-br from-neon/10 via-neon-blue/5 to-neon-purple/10 p-5 sm:p-6 lg:col-span-1 min-w-0">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
          <Sparkles className="h-6 w-6 text-neon shrink-0" />
          <h2 className="mt-4 font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Launch something new
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Spin up a website, cloud server, or custom VPS in under 60 seconds.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/web-hosting"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all hover:border-neon/40 hover:text-neon"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" /> Website
            </Link>
            <Link
              href="/vps-hosting"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all hover:border-neon/40 hover:text-neon"
            >
              <Server className="h-3.5 w-3.5 shrink-0" /> VPS
            </Link>
            <Link
              href="/cloud-hosting"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all hover:border-neon/40 hover:text-neon"
            >
              <HardDrive className="h-3.5 w-3.5 shrink-0" /> Cloud
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2 w-full">
          <StatCard label="Active Services" value={activeCount.toString()} sub={`${services.length} total`} icon={Server} accent="neon" href="/dashboard/services" />
          <StatCard label="Monthly Spend" value={`$${totalMonthly.toFixed(2)}`} sub="Across account" icon={CreditCard} accent="purple" href="/dashboard/billing" />
          <StatCard label="Open Tickets" value="0" sub="All caught up" icon={Shield} accent="blue" href="/dashboard/support" />
          <StatCard label="Avg. Uptime" value="99.98%" sub="Last 30 days" icon={Activity} accent="green" href="/dashboard/activity" />
        </div>
      </div>

      {/* ACTIVE SERVICES */}
      <section className="w-full overflow-hidden">
        <SectionHeader title="Your Services" actionLabel="Manage all" actionHref="/dashboard/services" />
        {services.length === 0 ? (
          <EmptyServices />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* PROFILE + QUICK ACTIONS + BILLING */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {/* CARD 1: PROFILE */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-w-0 w-full">
          <div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-neon/15 text-neon font-semibold">
                <span className="text-xs sm:text-sm">
                  {(userName || "U")
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  {userName}
                </p>
                <p className="truncate text-xs text-[var(--text-muted)]">Member since 2026</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <ProfileRow icon={User} value={userName} />
              <ProfileRow icon={Calendar} value="Member since 2026" />
              <ProfileRow icon={CheckCircle2} value="Email verified" tone="ok" />
            </div>
          </div>

          <div className="mt-5 border-t border-[var(--glass-border)] pt-4 w-full">
            <Link
              href="/dashboard/settings"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon"
            >
              <span className="truncate">Edit Profile</span> <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* CARD 2: QUICK ACTIONS */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 lg:p-6 min-w-0 w-full">
          <h2 className="font-(family-name:--font-space-grotesk) text-base font-semibold text-[var(--text-primary)]">
            Quick Actions
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
            <QuickAction href="/#pricing" icon={Plus} label="Order Service" />
            <QuickAction href="/dashboard/billing" icon={CreditCard} label="Pay Invoice" />
            <QuickAction href="/dashboard/support" icon={Shield} label="New Ticket" />
            <QuickAction href="/dashboard/settings" icon={User} label="Account" />
          </div>

          <h3 className="mt-6 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Resources
          </h3>
          <div className="mt-3 space-y-2">
            <ResourceRow icon={Globe} label="Documentation" />
            <ResourceRow icon={Terminal} label="API Reference" />
            <ResourceRow icon={Activity} label="System Status" dot="ok" />
          </div>
        </div>

        {/* CARD 3: BILLING */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 lg:p-6 md:col-span-2 lg:col-span-1 min-w-0 w-full flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-(family-name:--font-space-grotesk) text-base font-semibold text-[var(--text-primary)] truncate">
                Next Payment
              </h2>
              <Link href="/dashboard/billing" className="text-xs text-neon hover:underline shrink-0">
                History
              </Link>
            </div>

            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 w-full">
              <div className="flex flex-row items-center justify-between gap-2 w-full overflow-hidden">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] truncate">$17.98</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-400 shrink-0">
                  <Clock className="h-2.5 w-2.5" /> Pending
                </span>
              </div>
              <p className="mt-1 text-xs text-[var(--text-muted)] truncate">Due Aug 01, 2026</p>
              <Link
                href="/dashboard/billing"
                className="mt-3 block w-full rounded-lg bg-neon/10 px-3 py-2 text-center text-xs font-semibold text-neon transition-all hover:bg-neon/20 truncate"
              >
                Pay Now
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] p-3 w-full">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Payment Method
            </p>
            <div className="mt-1.5 flex items-center gap-2 min-w-0">
              <div className="grid h-7 w-10 shrink-0 place-items-center rounded bg-blue-500/10 text-blue-400">
                <CreditCard className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] truncate">Visa •••• 4242</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">Expires 12/2028</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOMAIN FINDER */}
      <section className="w-full overflow-hidden">
        <SectionHeader title="Domains" actionLabel="View all" actionHref="/dashboard/domains" />
        <DomainFinder />
      </section>

      {/* RECENT ACTIVITY */}
      <section className="w-full overflow-hidden">
        <SectionHeader title="Recent Activity" actionLabel="View all" actionHref="/dashboard/activity" />
        <div className="glass-card rounded-2xl p-2 sm:p-3 w-full">
          <ul className="divide-y divide-[var(--glass-border)] w-full">
            {RECENT_ACTIVITY.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[var(--bg-surface)] min-w-0 w-full"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <p className="truncate text-xs sm:text-sm text-[var(--text-secondary)]">
                    {item.title}
                  </p>
                </div>
                <p className="shrink-0 text-[10px] sm:text-xs text-[var(--text-muted)] ml-2">{item.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function EmptyServices() {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 text-center w-full">
      <Server className="mx-auto h-10 w-10 text-[var(--text-muted)]" />
      <h3 className="mt-3 font-(family-name:--font-space-grotesk) text-base font-semibold text-[var(--text-primary)]">
        No services yet
      </h3>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Order your first server or website to get started.
      </p>
      <LinkButton href="/#pricing" variant="neon" className="mt-4 inline-flex px-4 py-2 sm:px-5 sm:py-2.5 text-sm">
        <Plus className="h-4 w-4" /> Browse Plans
      </LinkButton>
    </div>
  );
}

function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: {
  title: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between sm:mb-4 gap-4 w-full overflow-hidden">
      <h2 className="font-(family-name:--font-space-grotesk) text-base font-semibold sm:text-lg text-[var(--text-primary)] truncate">
        {title}
      </h2>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-neon hover:underline shrink-0"
        >
          {actionLabel} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  href,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "neon" | "purple" | "blue" | "green";
  href: string;
}) {
  const accentMap = {
    neon: { text: "text-neon", bg: "bg-neon/10" },
    purple: { text: "text-neon-purple", bg: "bg-neon-purple/10" },
    blue: { text: "text-neon-blue", bg: "bg-neon-blue/10" },
    green: { text: "text-green-400", bg: "bg-green-500/10" },
  } as const;
  const a = accentMap[accent];

  return (
    <Link
      href={href}
      className="group glass-card relative overflow-hidden rounded-xl p-3.5 sm:p-5 transition-all hover:border-neon/30 hover:shadow-lg hover:shadow-neon/5 min-w-0 w-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={`grid h-8 w-8 place-items-center rounded-lg ${a.bg} shrink-0`}>
            <Icon className={`h-4 w-4 ${a.text}`} />
          </span>
          <ChevronRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-neon shrink-0" />
        </div>
        <p className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)] truncate">
          {value}
        </p>
      </div>
      <div>
        <p className="mt-0.5 text-[11px] sm:text-xs text-[var(--text-muted)] truncate">{label}</p>
        <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--text-muted)] truncate hidden sm:block">
          {sub}
        </p>
      </div>
    </Link>
  );
}

function ServiceCard({ service }: { service: ServiceRecord }) {
  const isActive = service.status === "Active";
  const isPending = service.status === "Pending";
  const TypeIcon = service.type === "Game Server" ? Server : HardDrive;

  return (
    <div className="glass-card group overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full">
      <div>
        <div className="flex items-start justify-between gap-3 w-full">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-neon/10">
              <TypeIcon className="h-4.5 w-4.5 text-neon" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm sm:text-base font-semibold text-[var(--text-primary)]">{service.name}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {service.type} · {service.plan}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium h-fit ${
              isActive
                ? "bg-green-500/10 text-green-400"
                : service.status === "Pending"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-red-500/10 text-red-400"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-green-400" : service.status === "Pending" ? "bg-yellow-400" : "bg-red-400"
            }`} />
            <span className="truncate">{service.status}</span>
          </span>
        </div>

        {!isPending && (
          <div className="mt-4 space-y-2.5 w-full">
            <ResourceBar icon={MemoryStick} label="RAM" used={service.ram} pct={service.ramUsedPct} />
            <ResourceBar icon={Cpu} label="CPU" used={service.cpu} pct={service.cpuUsedPct} />
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)] w-full overflow-hidden">
          <span className="inline-flex items-center gap-1 min-w-0 max-w-[120px] sm:max-w-none truncate">
            <MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">{service.location}</span>
          </span>
          {service.ip && service.ip !== "Provisioning…" && (
            <span className="font-mono bg-[var(--bg-surface)] px-1 rounded truncate max-w-[100px] sm:max-w-none">{service.ip}</span>
          )}
          <span className="sm:ml-auto shrink-0 text-[10px]">Renews {service.renewDate}</span>
        </div>

        {/* Updated Button Bar to use responsive dynamic template grids instead of breaks */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-[var(--glass-border)] pt-4 w-full">
          <Link
            href={`/dashboard/services/${service._id}#console`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-2 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon min-w-0"
          >
            <Terminal className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">Console</span>
          </Link>
          <Link
            href={`/dashboard/services/${service._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-2 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon min-w-0"
          >
            <Power className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">Restart</span>
          </Link>
          <Link
            href={`/dashboard/services/${service._id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neon/30 bg-neon/5 px-2 py-2 text-xs font-semibold text-neon transition-all hover:bg-neon/10 min-w-0"
          >
            <span className="truncate">Manage</span> <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourceBar({
  icon: Icon,
  label,
  used,
  pct,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  used: string;
  pct: number;
}) {
  const tone = pct > 80 ? "bg-red-400" : pct > 60 ? "bg-yellow-400" : "bg-neon";
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-[11px] gap-2 w-full">
        <span className="inline-flex items-center gap-1 text-[var(--text-muted)] truncate">
          <Icon className="h-3 w-3 shrink-0" /> {label}
        </span>
        <span className="text-[var(--text-secondary)] shrink-0 font-mono">
          {used} <span className="text-[var(--text-muted)]">· {pct}%</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]">
        <div className={`h-full rounded-full ${tone} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ProfileRow({
  icon: Icon,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  tone?: "default" | "ok" | "warn";
}) {
  const toneClass =
    tone === "ok" ? "text-green-400" : tone === "warn" ? "text-yellow-400" : "text-[var(--text-secondary)]";
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0 w-full">
      <Icon className={`h-4 w-4 shrink-0 ${tone === "default" ? "text-[var(--text-muted)]" : toneClass}`} />
      <span className={`${toneClass} truncate flex-1`}>{value}</span>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-start gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-card)] p-2.5 sm:p-3 transition-all hover:border-neon/30 hover:bg-neon/5 min-w-0 w-full overflow-hidden"
    >
      <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-neon/10 text-neon transition-colors group-hover:bg-neon/20 shrink-0">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="text-[11px] sm:text-xs font-medium text-[var(--text-primary)] truncate w-full">{label}</span>
    </Link>
  );
}

function ResourceRow({
  icon: Icon,
  label,
  dot,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  dot?: "ok" | "warn";
}) {
  return (
    <Link
      href="#"
      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] w-full min-w-0"
    >
      <span className="inline-flex items-center gap-2 min-w-0 flex-1">
        <Icon className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
        <span className="truncate">{label}</span>
      </span>
      {dot === "ok" && <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0 ml-2" />}
    </Link>
  );
}