"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Globe, Plus, Check, Calendar, Shield, ArrowRight } from "lucide-react";
import DomainFinder from "@/components/dashboard/DomainFinder";

interface DomainItem {
  id: string;
  domain: string;
  registeredAt: string;
  expiresAt: string;
  status: "active" | "pending" | "expired";
  privacy: boolean;
}

function DomainsPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const pendingRegister = params.get("register");

  const [registered, setRegistered] = useState<DomainItem[]>([]);
  const [registering, setRegistering] = useState(false);
  const [justRegistered, setJustRegistered] = useState<string | null>(null);

  // Local "register" handler — pretends to provision a domain and adds it to the list.
  // Replace with a real API call when you have a registrar integration.
  async function confirmRegister(domain: string) {
    setRegistering(true);
    await new Promise((r) => setTimeout(r, 700));
    const today = new Date();
    const exp = new Date(today);
    exp.setFullYear(exp.getFullYear() + 1);
    setRegistered((prev) => [
      {
        id: domain,
        domain,
        registeredAt: today.toISOString().slice(0, 10),
        expiresAt: exp.toISOString().slice(0, 10),
        status: "active",
        privacy: true,
      },
      ...prev,
    ]);
    setJustRegistered(domain);
    setRegistering(false);
    // Clean the ?register= param from the URL
    router.replace("/dashboard/domains");
  }

  // If the user landed here with ?register=xyz.tld, auto-confirm
  useEffect(() => {
    if (pendingRegister && !registering && justRegistered !== pendingRegister) {
      void confirmRegister(pendingRegister);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRegister]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Domains
        </p>
        <h1 className="mt-1 font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Domain Manager
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Search, register, and manage your domains in one place.
        </p>
      </div>

      <DomainFinder />

      {registering && (
        <div className="glass-card flex items-center gap-3 rounded-xl p-4 text-sm text-[var(--text-secondary)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-neon border-t-transparent" />
          Registering <span className="font-medium text-[var(--text-primary)]">{pendingRegister}</span>…
        </div>
      )}

      {justRegistered && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 p-3 text-sm text-green-400">
          <Check className="h-4 w-4" />
          <span>
            <span className="font-medium text-[var(--text-primary)]">{justRegistered}</span> is now yours.
          </span>
        </div>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <h2 className="font-(family-name:--font-space-grotesk) text-base sm:text-lg font-semibold text-[var(--text-primary)]">
            Your Domains
          </h2>
        </div>

        {registered.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Globe className="mx-auto h-10 w-10 text-[var(--text-muted)]" />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              You don&apos;t have any domains yet.
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Use the finder above to grab your first one.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {registered.map((d) => (
              <div
                key={d.id}
                className="glass-card flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-neon/10 text-neon">
                    <Globe className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {d.domain}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Expires {d.expiresAt}
                      </span>
                      {d.privacy && (
                        <span className="inline-flex items-center gap-1">
                          <Shield className="h-3 w-3" /> WHOIS privacy on
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`https://${d.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon"
                  >
                    Visit <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href="/dashboard/domains"
                    className="inline-flex items-center gap-1 rounded-lg border border-neon/30 bg-neon/5 px-3 py-1.5 text-xs font-semibold text-neon transition-all hover:bg-neon/10"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function DomainsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-2">
          <div className="h-7 w-40 rounded bg-[var(--bg-surface)]" />
          <div className="h-4 w-64 rounded bg-[var(--bg-surface)]" />
        </div>
      }
    >
      <DomainsPageInner />
    </Suspense>
  );
}
