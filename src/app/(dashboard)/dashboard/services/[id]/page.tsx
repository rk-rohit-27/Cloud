import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import {
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  MapPin,
  Terminal,
  ArrowLeft,
  Settings as SettingsIcon,
  Globe,
  LifeBuoy,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { getMongoDb } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import ServiceActions from "./ServiceActions";
import type { ServiceDoc } from "./types";

export const runtime = "nodejs";

async function loadService(id: string, userId: string): Promise<ServiceDoc | null> {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(userId)) return null;
  const db = await getMongoDb();
  const doc = (await db.collection("services").findOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  })) as unknown as ServiceDoc | null;
  return doc;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) notFound();

  const doc = await loadService(id, userId);
  if (!doc) notFound();

  const isActive = doc.status === "Active";
  const TypeIcon = doc.type === "Game Server" ? Server : HardDrive;
  const renew = new Date(doc.renewDate);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/services"
        className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-neon"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Services
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-neon/10">
            <TypeIcon className="h-6 w-6 text-neon" />
          </div>
          <div>
            <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {doc.name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {doc.type} · {doc.plan}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            doc.status === "Active"
              ? "bg-green-500/10 text-green-400"
              : doc.status === "Pending"
                ? "bg-yellow-500/10 text-yellow-400"
                : doc.status === "Stopped"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-red-500/10 text-red-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              doc.status === "Active"
                ? "bg-green-400"
                : doc.status === "Pending"
                  ? "bg-yellow-400"
                  : doc.status === "Stopped"
                    ? "bg-blue-400"
                    : "bg-red-400"
            }`}
          />
          {doc.status}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ServiceActions
          serviceId={doc._id.toString()}
          status={doc.status}
          isActive={isActive}
        />

        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            IP Address
          </p>
          <p className="mt-1 font-mono text-sm text-[var(--text-primary)] break-all">
            {doc.ip}
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Location
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[var(--text-primary)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            {doc.location}
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Renews
          </p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">
            {renew.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Plan
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
            {doc.plan}
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Resources
          </p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">
            {doc.ram} RAM · {doc.cpu}
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Provisioned
          </p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">
            {new Date(doc.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
              <MemoryStick className="h-3 w-3" /> RAM Usage
            </span>
            <span className="text-[var(--text-secondary)]">
              {doc.ram} <span className="text-[var(--text-muted)]">· {doc.ramUsedPct}%</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]">
            <div
              className={`h-full rounded-full ${
                doc.ramUsedPct > 80
                  ? "bg-red-400"
                  : doc.ramUsedPct > 60
                    ? "bg-yellow-400"
                    : "bg-neon"
              }`}
              style={{ width: `${doc.ramUsedPct}%` }}
            />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
              <Cpu className="h-3 w-3" /> CPU Usage
            </span>
            <span className="text-[var(--text-secondary)]">
              {doc.cpu} <span className="text-[var(--text-muted)]">· {doc.cpuUsedPct}%</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]">
            <div
              className={`h-full rounded-full ${
                doc.cpuUsedPct > 80
                  ? "bg-red-400"
                  : doc.cpuUsedPct > 60
                    ? "bg-yellow-400"
                    : "bg-neon"
              }`}
              style={{ width: `${doc.cpuUsedPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 sm:p-6">
        <h2 className="font-(family-name:--font-space-grotesk) text-base font-semibold text-[var(--text-primary)]">
          Quick Links
        </h2>
        <ul className="mt-3 divide-y divide-[var(--glass-border)]">
          <DetailLink
            href={`/dashboard/services/${doc._id.toString()}#console`}
            icon={Terminal}
            title="Console"
            sub="View live server logs and run commands"
          />
          <DetailLink
            href="/dashboard/billing"
            icon={CreditCard}
            title="Billing"
            sub="View invoices and payment method"
          />
          <DetailLink
            href="/dashboard/support"
            icon={LifeBuoy}
            title="Open a Support Ticket"
            sub="Get help from the team"
          />
          <DetailLink
            href="/dashboard/domains"
            icon={Globe}
            title="Pair a Domain"
            sub="Point a custom domain at this service"
          />
          <DetailLink
            href="/dashboard/settings"
            icon={SettingsIcon}
            title="Service Settings"
            sub="Backups, security, and access controls"
          />
        </ul>
      </div>
    </div>
  );
}

function DetailLink({
  href,
  icon: Icon,
  title,
  sub,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-3 py-3 transition-colors hover:text-neon"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon/10 text-neon transition-colors group-hover:bg-neon/20">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-neon">
            {title}
          </p>
          <p className="text-xs text-[var(--text-muted)]">{sub}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-[var(--text-muted)] transition-colors group-hover:text-neon" />
      </Link>
    </li>
  );
}

// Avoid unused-import warning if LifeBuoy isn't referenced by name in JSX
// no-op
