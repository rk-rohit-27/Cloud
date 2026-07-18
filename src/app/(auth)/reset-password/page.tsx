"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import AuthCard from "@/components/ui/AuthCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual password reset via API route
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch {
      setError("Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthCard>
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon/10">
            <CheckCircle className="h-7 w-7 text-neon" />
          </div>
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Password Updated
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
        </div>

        <Link href="/login">
          <Button className="w-full mt-6">
            Back to Login <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="text-center">
        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Enter your new password below
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs sm:text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          id="password"
          label="New Password"
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <Input
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Repeat your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          error={
            confirmPassword && password !== confirmPassword
              ? "Passwords do not match"
              : undefined
          }
        />

        <Button type="submit" loading={loading} className="mt-2">
          Reset Password <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] hover:text-neon transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to login
      </Link>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
