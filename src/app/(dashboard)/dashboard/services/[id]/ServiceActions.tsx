"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Power, Terminal, Loader2, Check, X, Copy } from "lucide-react";
import type { ServiceStatus } from "./types";

type ActionKind = "start" | "stop" | "restart";

interface Props {
  serviceId: string;
  status: ServiceStatus;
  isActive: boolean;
}

export default function ServiceActions({ serviceId, status, isActive }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<ActionKind | null>(null);
  const [lastResult, setLastResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLines] = useState<string[]>([
    "[INFO] ZypherHost console v2.1.0",
    "[INFO] Service id: " + serviceId,
    "[INFO] Status: " + status,
    "[INFO] Waiting for input…",
  ]);
  const [ipCopied, setIpCopied] = useState(false);

  async function runAction(action: ActionKind) {
    setBusy(action);
    setLastResult(null);
    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLastResult({ ok: false, msg: data.error ?? "Action failed" });
      } else {
        setLastResult({ ok: true, msg: `Status: ${data.status}` });
        router.refresh();
      }
    } catch (err) {
      setLastResult({ ok: false, msg: "Network error" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <div className="glass-card rounded-2xl p-5 md:col-span-1">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Control
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
          Service Actions
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isActive || busy !== null}
            onClick={() => runAction("start")}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs font-semibold text-green-400 transition-all hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy === "start" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Power className="h-3.5 w-3.5" />
            )}
            Start
          </button>
          <button
            type="button"
            disabled={!isActive || busy !== null}
            onClick={() => runAction("stop")}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy === "stop" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Power className="h-3.5 w-3.5" />
            )}
            Stop
          </button>
          <button
            type="button"
            disabled={!isActive || busy !== null}
            onClick={() => runAction("restart")}
            className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neon/30 bg-neon/10 px-3 py-2 text-xs font-semibold text-neon transition-all hover:bg-neon/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy === "restart" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Power className="h-3.5 w-3.5" />
            )}
            Restart Service
          </button>
          <button
            type="button"
            disabled={!isActive}
            onClick={() => setShowConsole(true)}
            className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-neon/30 hover:text-neon disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Terminal className="h-3.5 w-3.5" />
            Open Console
          </button>
        </div>

        {lastResult && (
          <div
            className={`mt-3 flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] ${
              lastResult.ok
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {lastResult.ok ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            {lastResult.msg}
          </div>
        )}
      </div>

      {showConsole && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                <Terminal className="h-4 w-4 text-neon" />
                Live Console
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(consoleLines.join("\n"));
                    setIpCopied(true);
                    setTimeout(() => setIpCopied(false), 1500);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--glass-border)] bg-[var(--bg-card)] px-2 py-1 text-[11px] text-[var(--text-secondary)] hover:border-neon/30 hover:text-neon"
                >
                  <Copy className="h-3 w-3" /> {ipCopied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConsole(false)}
                  className="rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Close console"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <pre className="max-h-80 overflow-y-auto bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-green-300">
              {consoleLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </pre>
            <div className="flex items-center gap-2 border-t border-[var(--glass-border)] bg-black/40 px-4 py-2">
              <span className="text-green-300">$</span>
              <input
                type="text"
                placeholder="Type a command (e.g. status)"
                className="flex-1 bg-transparent text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
