"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import AuthCard from "@/components/ui/AuthCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implement actual password reset email sending via API route
      // For now, simulate the flow
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard>
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon/10">
            <CheckCircle className="h-7 w-7 text-neon" />
          </div>
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Check Your Email
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-[var(--text-primary)]">{email}</span>.
            Please check your inbox and follow the instructions.
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="w-full"
          >
            Try a different email
          </Button>
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-neon transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="text-center">
        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Forgot Password?
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs sm:text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Button type="submit" loading={loading} className="mt-2">
          Send Reset Link <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Back */}
      <Link
        href="/login"
        className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] hover:text-neon transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to login
      </Link>
    </AuthCard>
  );
}
