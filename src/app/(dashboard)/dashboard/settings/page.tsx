"use client";

import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { User, Lock, Bell, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    billing: true,
    product: false,
    marketing: false,
  });

  function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    // Client-only mock; wire to an API route to persist.
    update({ name: profile.name });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSaved(false);

    if (passwords.next !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    // Client-only mock; wire to an API route to verify + persist.
    setPasswords({ current: "", next: "", confirm: "" });
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 4000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your account, security, and preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="glass-card rounded-xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-neon" />
          <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Profile
          </h2>
        </div>

        {profileSaved && <SavedBanner text="Profile updated." />}

        <form onSubmit={handleProfileSubmit} className="grid gap-4 sm:grid-cols-2">
          <Input
            id="name"
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
          <div className="sm:col-span-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </section>

      {/* Password */}
      <section className="glass-card rounded-xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-neon" />
          <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Password
          </h2>
        </div>

        {passwordSaved && <SavedBanner text="Password updated." />}
        {passwordError && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
            {passwordError}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="grid gap-4 sm:grid-cols-3">
          <Input
            id="current-password"
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, current: e.target.value }))
            }
            required
          />
          <Input
            id="new-password"
            label="New Password"
            type="password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, next: e.target.value }))
            }
            required
          />
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, confirm: e.target.value }))
            }
            error={passwordError || undefined}
            required
          />
          <div className="sm:col-span-3">
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </section>

      {/* Preferences */}
      <section className="glass-card rounded-xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-neon" />
          <h2 className="font-(family-name:--font-space-grotesk) text-lg font-semibold text-[var(--text-primary)]">
            Preferences
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[var(--glass-border)]">
          {[
            {
              key: "billing" as const,
              title: "Billing & invoices",
              desc: "Receipts, renewal reminders, and failed-payment alerts.",
            },
            {
              key: "product" as const,
              title: "Product updates",
              desc: "New features, maintenance windows, and status changes.",
            },
            {
              key: "marketing" as const,
              title: "Marketing",
              desc: "Promotions, discounts, and product announcements.",
            },
          ].map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {row.title}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{row.desc}</p>
              </div>
              <Toggle
                checked={notifications[row.key]}
                onChange={(v) =>
                  setNotifications((n) => ({ ...n, [row.key]: v }))
                }
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SavedBanner({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2.5 text-sm text-green-400">
      <CheckCircle2 className="h-4 w-4" />
      {text}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-neon/80" : "bg-[var(--toggle-bg)]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
