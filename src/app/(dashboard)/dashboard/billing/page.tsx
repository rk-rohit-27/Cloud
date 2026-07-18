"use client";

import { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Failed";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  description: string;
}

interface PaymentMethod {
  type: string;
  last4: string;
  expiry: string;
  brand: string;
}

const INVOICES: Invoice[] = [
  {
    id: "INV-2026-0048",
    date: "Jul 01, 2026",
    amount: "$17.98",
    status: "Paid",
    description: "Minecraft SMP (Pro) + Dev VPS (Starter)",
  },
  {
    id: "INV-2026-0047",
    date: "Jun 01, 2026",
    amount: "$17.98",
    status: "Paid",
    description: "Minecraft SMP (Pro) + Dev VPS (Starter)",
  },
  {
    id: "INV-2026-0046",
    date: "May 01, 2026",
    amount: "$17.98",
    status: "Paid",
    description: "Minecraft SMP (Pro) + Dev VPS (Starter)",
  },
  {
    id: "INV-2026-0045",
    date: "Apr 01, 2026",
    amount: "$12.99",
    status: "Paid",
    description: "Minecraft SMP (Pro)",
  },
  {
    id: "INV-2026-0044",
    date: "Mar 01, 2026",
    amount: "$12.99",
    status: "Paid",
    description: "Minecraft SMP (Pro)",
  },
  {
    id: "INV-2026-0043",
    date: "Feb 01, 2026",
    amount: "$4.99",
    status: "Paid",
    description: "Dev VPS (Starter) — first month",
  },
  {
    id: "INV-2026-0042",
    date: "Jan 15, 2026",
    amount: "$4.99",
    status: "Failed",
    description: "Dev VPS (Starter) — retry needed",
  },
];

const PAYMENT_METHOD: PaymentMethod = {
  type: "Visa",
  last4: "4242",
  expiry: "12/2028",
  brand: "visa",
};

const STATUS_STYLES: Record<InvoiceStatus, { badge: string; icon: typeof CheckCircle2 }> = {
  Paid: {
    badge: "bg-green-500/10 text-green-400",
    icon: CheckCircle2,
  },
  Pending: {
    badge: "bg-yellow-500/10 text-yellow-400",
    icon: Clock,
  },
  Failed: {
    badge: "bg-red-500/10 text-red-400",
    icon: XCircle,
  },
};

export default function BillingPage() {
  const [filterStatus, setFilterStatus] = useState<"All" | InvoiceStatus>("All");

  const filtered =
    filterStatus === "All"
      ? INVOICES
      : INVOICES.filter((inv) => inv.status === filterStatus);

  const totalSpent = INVOICES
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => {
      const amount = parseFloat(inv.amount.replace("$", ""));
      return sum + amount;
    }, 0);

  const nextPayment = "Aug 01, 2026";
  const nextAmount = "$17.98";
  const servicesCount = 2;
  const planLimit = 5;

  return (
    <div className="w-full max-w-7xl mx-auto  py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Billing
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your payment methods, invoices, and subscription.
        </p>
      </div>

      {/* Summary Cards */}
      {/* Changed grid-cols-2 to grid-cols-1 on small screens to prevent text overflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Payment */}
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <Calendar className="h-5 w-5 text-neon-purple" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
            {nextAmount}
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-[var(--text-muted)]">
            Next payment &middot; {nextPayment}
          </p>
        </div>

        {/* Services Used */}
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <CreditCard className="h-5 w-5 text-neon-blue" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
            {servicesCount}/{planLimit}
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-[var(--text-muted)]">
            Active services
          </p>
          {/* Usage bar */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--bg-surface)]">
            <div
              className="h-1.5 rounded-full bg-neon"
              style={{ width: `${(servicesCount / planLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Total Spent */}
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
            ${totalSpent.toFixed(2)}
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-[var(--text-muted)]">
            Total spent (lifetime)
          </p>
        </div>

        {/* Payment Cycle */}
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <Clock className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
            Monthly
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-[var(--text-muted)]">
            Billing cycle
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Payment Method */}
        <div className="glass-card rounded-xl p-5 sm:p-6 h-fit">
          <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Payment Method
          </h2>

          <div className="mt-4 flex items-center gap-3 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-surface)] p-4">
            <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                {PAYMENT_METHOD.type} &bull;&bull;&bull;&bull; {PAYMENT_METHOD.last4}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Expires {PAYMENT_METHOD.expiry}
              </p>
            </div>
          </div>

          <button className="mt-4 w-full rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon">
            Update Payment Method
          </button>

          {/* Billing address section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
              Billing Address
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No billing address on file. Add one for invoice compliance.
            </p>
            <button className="mt-2 text-xs text-neon hover:underline">
              Add Address
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div className="glass-card rounded-xl p-5 sm:p-6 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--glass-border)] pb-4">
            <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
              Payment History
            </h2>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-1.5">
              {(["All", "Paid", "Pending", "Failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    filterStatus === s
                      ? "border border-neon/40 bg-neon/10 text-neon"
                      : "border border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-neon/30 hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Invoice list */}
          <div className="mt-4 flex flex-col gap-3">
            {filtered.length === 0 ? (
              <div className="py-10 text-center">
                <CreditCard className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  No invoices found.
                </p>
              </div>
            ) : (
              filtered.map((invoice) => {
                const style = STATUS_STYLES[invoice.status];
                const StatusIcon = style.icon;
                return (
                  <div
                    key={invoice.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-surface)] p-4 transition-all hover:border-neon/20"
                  >
                    {/* Left: Info details */}
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neon/10 mt-0.5">
                        <CreditCard className="h-4 w-4 text-neon" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {invoice.id}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 sm:truncate">
                          {invoice.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Meta, Status & Downloader */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-[var(--glass-border)] pt-3 sm:border-0 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {invoice.amount}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {invoice.date}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${style.badge}`}
                        >
                          <StatusIcon className="h-2.5 w-2.5" />
                          {invoice.status}
                        </span>
                        {invoice.status === "Paid" && (
                          <button className="rounded-md border border-[var(--glass-border)] p-2 text-[var(--text-muted)] transition-all hover:border-neon/30 hover:text-neon bg-[var(--bg-card)]">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}