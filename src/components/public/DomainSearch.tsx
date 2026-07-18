"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface TldResult {
  tld: string;
  available: boolean;
  price: number;
}

// Mock TLD pricing
const TLD_PRICING: { tld: string; price: number }[] = [
  { tld: ".com", price: 10.99 },
  { tld: ".net", price: 12.49 },
  { tld: ".org", price: 9.99 },
  { tld: ".io", price: 39.99 },
  { tld: ".dev", price: 14.99 },
  { tld: ".app", price: 18.99 },
];

// Simple deterministic pseudo-random availability based on the domain string,
// so the same query always returns the same result.
function pseudoAvailability(input: string): boolean {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 3 !== 0; // ~2/3 available
}

type Status = "idle" | "loading" | "results";

export default function DomainSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<TldResult[]>([]);

  const cleanQuery = query.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split(".")[0];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!cleanQuery) return;

    setStatus("loading");

    // Simulate network latency
    setTimeout(() => {
      const computed = TLD_PRICING.map(({ tld, price }) => ({
        tld,
        price,
        available: pseudoAvailability(cleanQuery + tld),
      }));
      setResults(computed);
      setStatus("results");
    }, 900);
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl">
      {/* Search box */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your perfect domain..."
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-4 pl-12 pr-4 text-sm sm:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-neon focus:ring-1 focus:ring-neon/30"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || !cleanQuery}
          className="btn-neon flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Searching
            </>
          ) : (
            <>
              <Search className="h-4 w-4" /> Search
            </>
          )}
        </button>
      </form>

      {/* Results */}
      <AnimatePresence>
        {status === "results" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 glass-card rounded-xl p-4 sm:p-6"
          >
            <p className="mb-4 text-xs sm:text-sm text-[var(--text-muted)]">
              Showing results for{" "}
              <span className="font-medium text-[var(--text-primary)]">{cleanQuery}</span>
            </p>

            <div className="flex flex-col gap-2">
              {results.map((r) => (
                <div
                  key={r.tld}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-[var(--glass-border)] bg-[var(--bg-surface)] p-3 sm:p-4 transition-all hover:border-neon/20"
                >
                  <div className="flex items-center gap-3">
                    {r.available ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-red-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {cleanQuery}
                        <span className="text-neon">{r.tld}</span>
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {r.available ? "Available" : "Taken"}
                      </p>
                    </div>
                  </div>

                  {r.available ? (
                    <div className="flex items-center gap-3 pl-8 sm:pl-0">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        ${r.price.toFixed(2)}/yr
                      </span>
                      <a
                        href="/register"
                        className="btn-neon rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer"
                      >
                        Register
                      </a>
                    </div>
                  ) : (
                    <span className="pl-8 text-xs text-[var(--text-muted)] sm:pl-0">
                      Try another name
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
        Demo search — results are simulated. Connect a registrar API for live availability.
      </p>
    </div>
  );
}
