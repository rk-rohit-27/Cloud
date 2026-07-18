"use client";

import { useState, type FormEvent } from "react";
import {
  LifeBuoy,
  MessageSquare,
  Server,
  CreditCard,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type TicketStatus = "Open" | "Answered" | "Closed";
type Category = "Technical" | "Billing" | "Sales" | "Other";

interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  category: Category;
  updatedAt: string;
}

const CATEGORY_ICON = {
  Technical: Server,
  Billing: CreditCard,
  Sales: Plus,
  Other: MessageSquare,
} as const;

const STATUS_STYLES: Record<TicketStatus, string> = {
  Open: "bg-yellow-500/10 text-yellow-400",
  Answered: "bg-green-500/10 text-green-400",
  Closed: "bg-[var(--bg-surface)] text-[var(--text-muted)]",
};

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "ZH-1042",
    subject: "Server not starting after mod install",
    status: "Answered",
    category: "Technical",
    updatedAt: "2h ago",
  },
  {
    id: "ZH-1039",
    subject: "Invoice #2048 — payment method change",
    status: "Open",
    category: "Billing",
    updatedAt: "Yesterday",
  },
  {
    id: "ZH-1021",
    subject: "Upgrade RAM on Minecraft SMP",
    status: "Closed",
    category: "Sales",
    updatedAt: "Jun 28",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category: "Technical" as Category,
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;

    const newTicket: Ticket = {
      id: `ZH-${Math.floor(1100 + Math.random() * 800)}`,
      subject: form.subject.trim(),
      status: "Open",
      category: form.category,
      updatedAt: "Just now",
    };
    setTickets((prev) => [newTicket, ...prev]);
    setForm({ subject: "", category: "Technical", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Support
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Track tickets and get help from our team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Ticket list */}
        <div className="glass-card rounded-xl p-5 sm:p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
              Your Tickets
            </h2>
            <span className="text-xs text-[var(--text-muted)]">
              {tickets.length} total
            </span>
          </div>

          {tickets.length === 0 ? (
            <div className="py-10 text-center">
              <LifeBuoy className="mx-auto h-10 w-10 text-[var(--text-muted)]" />
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                No tickets yet. Open one and we&apos;ll help you out.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {tickets.map((ticket) => {
                const Icon = CATEGORY_ICON[ticket.category];
                return (
                  <div
                    key={ticket.id}
                    className="rounded-lg border border-[var(--glass-border)] bg-[var(--bg-surface)] p-4 transition-all hover:border-neon/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neon/10">
                        <Icon className="h-4 w-4 text-neon" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-sm text-[var(--text-primary)]">
                            {ticket.subject}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[ticket.status]}`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                          {ticket.id} &middot; {ticket.category} &middot;{" "}
                          {ticket.updatedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* New ticket form */}
        <div className="glass-card rounded-xl p-5 sm:p-6 lg:col-span-2">
          <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Open New Ticket
          </h2>

          {submitted && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2.5 text-sm text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              Ticket submitted. We&apos;ll reply shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              id="subject"
              label="Subject"
              placeholder="Briefly describe your issue"
              value={form.subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, subject: e.target.value }))
              }
              required
            />

            <div className="w-full">
              <label
                htmlFor="category"
                className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as Category }))
                }
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-3.5 py-2.5 sm:py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-neon focus:ring-1 focus:ring-neon/30"
              >
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Sales">Sales</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                required
                className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-3.5 py-2.5 sm:py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-neon focus:ring-1 focus:ring-neon/30"
              />
            </div>

            <Button type="submit" className="w-full">
              <Clock className="h-4 w-4" /> Submit Ticket
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
