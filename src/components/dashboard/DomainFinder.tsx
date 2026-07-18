"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

type CheckResult = {
  domain: string;
  available: boolean;
  priceFirst: number;
  priceRenew: number;
  popular?: boolean;
  alternates: string[];
};

type Status = "idle" | "loading" | "ok" | "error";

export default function DomainFinder() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/domains/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Lookup failed");
        setStatus("error");
        return;
      }
      setResult(data as CheckResult);
      setStatus("ok");
    } catch (err) {
      setError("Network error — please try again");
      setStatus("error");
    }
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="border-b border-[var(--glass-border)] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-neon/15 text-neon">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div>
            <h2 className="font-(family-name:--font-space-grotesk) text-base font-semibold text-[var(--text-primary)]">
              Find your domain
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Search and register a new domain in seconds.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. yourbrand.com"
              className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-neon/60 focus:outline-none focus:ring-1 focus:ring-neon/30"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !query.trim()}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-neon/15 px-4 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && error && (
          <motion.div
            key="err"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-3 text-sm text-red-400 sm:px-6"
          >
            {error}
          </motion.div>
        )}

        {status === "ok" && result && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full ${
                    result.available
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {result.available ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {result.domain}
                  </p>
                  <p
                    className={`text-xs ${
                      result.available ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {result.available ? "Available" : "Already registered"}
                    {result.available && (
                      <>
                        {" · "}
                        <span className="text-[var(--text-muted)]">
                          ${result.priceFirst.toFixed(2)} first year
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {result.available && (
                <Link
                  href={`/dashboard/domains?register=${encodeURIComponent(result.domain)}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-neon/20"
                >
                  Register <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            {result.alternates.length > 0 && (
              <div className="mt-4 border-t border-[var(--glass-border)] pt-4">
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  Try instead
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.alternates.map((alt) => (
                    <button
                      key={alt}
                      type="button"
                      onClick={() => setQuery(alt)}
                      className="rounded-md border border-[var(--glass-border)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon"
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {status === "idle" && (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 py-3 sm:px-6"
          >
            <p className="text-[11px] text-[var(--text-muted)]">
              Popular:{" "}
              {["yourbrand.com", "getyourbrand.io", "yourbrand.dev"].map((d, i, arr) => (
                <span key={d}>
                  <button
                    type="button"
                    onClick={() => setQuery(d)}
                    className="text-[var(--text-secondary)] transition-colors hover:text-neon"
                  >
                    {d}
                  </button>
                  {i < arr.length - 1 && " · "}
                </span>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
