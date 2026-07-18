"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Server,
  HardDrive,
  Plus,
  Cpu,
  MemoryStick,
  MapPin,
  Terminal,
  Power,
  ArrowUpRight,
  Settings2,
} from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import type { ServiceRecord, ServiceType } from "@/lib/services";

type Filter = "All" | ServiceType;

const STATUS_STYLES: Record<ServiceRecord["status"], string> = {
  Active: "bg-green-500/10 text-green-400",
  Suspended: "bg-red-500/10 text-red-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Stopped: "bg-blue-500/10 text-blue-400",
};

const STATUS_DOT: Record<ServiceRecord["status"], string> = {
  Active: "bg-green-400",
  Suspended: "bg-red-400",
  Pending: "bg-yellow-400",
  Stopped: "bg-blue-400",
};

export default function ServicesList({ services }: { services: ServiceRecord[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All" ? services : services.filter((s) => s.type === filter);

  const filters: Filter[] = ["All", "Game Server", "VPS Hosting", "Web Hosting"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Services
          </p>
          <h1 className="mt-1 font-(family-name:--font-space-grotesk) text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Your Services
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage and monitor your active hosting services.
          </p>
        </div>
        <LinkButton href="/#pricing" variant="neon" className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Order New Service
        </LinkButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? services.length : services.filter((s) => s.type === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                filter === f
                  ? "border-neon/40 bg-neon/10 text-neon"
                  : "border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-neon/30 hover:text-neon"
              }`}
            >
              {f}
              <span className="ml-1.5 text-[10px] text-[var(--text-muted)]">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <Server className="mx-auto h-10 w-10 text-[var(--text-muted)]" />
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            {services.length === 0
              ? "You don't have any services yet."
              : "No services in this category yet."}
          </p>
          <Link
            href="/#pricing"
            className="mt-4 inline-block text-sm text-neon hover:underline"
          >
            Browse plans &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <ServiceRow key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceRow({ service }: { service: ServiceRecord }) {
  const isActive = service.status === "Active";
  const isPending = service.status === "Pending";
  const TypeIcon = service.type === "Game Server" ? Server : HardDrive;

  return (
    <div className="glass-card overflow-hidden rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neon/10">
            <TypeIcon className="h-5 w-5 text-neon" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[var(--text-primary)]">
              {service.name}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {service.type} · {service.plan}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[service.status]}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[service.status]}`} />
          {service.status}
        </span>
      </div>

      {!isPending && (
        <div className="mt-4 space-y-2.5">
          <ResourceBar icon={MemoryStick} label="RAM" used={service.ram} pct={service.ramUsedPct} />
          <ResourceBar icon={Cpu} label="CPU" used={service.cpu} pct={service.cpuUsedPct} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {service.location}
        </span>
        {service.ip && service.ip !== "Provisioning…" && (
          <span className="font-mono">{service.ip}</span>
        )}
        <span className="ml-auto inline-flex items-center gap-1">
          <Settings2 className="h-3 w-3" /> Renews {service.renewDate}
        </span>
      </div>

      <div className="mt-4 flex gap-2 border-t border-[var(--glass-border)] pt-4">
        <Link
          href={`/dashboard/services/${service._id}#console`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon"
        >
          <Terminal className="h-3.5 w-3.5" /> Console
        </Link>
        <Link
          href={`/dashboard/services/${service._id}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon"
        >
          <Power className="h-3.5 w-3.5" /> Restart
        </Link>
        <Link
          href={`/dashboard/services/${service._id}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neon/30 bg-neon/5 px-3 py-2 text-xs font-semibold text-neon transition-all hover:bg-neon/10"
        >
          Manage <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
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
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
          <Icon className="h-3 w-3" /> {label}
        </span>
        <span className="text-[var(--text-secondary)]">
          {used} <span className="text-[var(--text-muted)]">· {pct}%</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]">
        <div
          className={`h-full rounded-full ${tone} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
