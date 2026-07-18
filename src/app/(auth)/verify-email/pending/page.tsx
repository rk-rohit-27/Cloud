"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

function VerificationPendingContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const sendVerificationEmail = async (showLoading = true) => {
    if (!email) {
      setError("No email address provided. Please go back and try signing in again.");
      return;
    }

    if (showLoading) {
      setLoading(true);
    }
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        setError(data.error || "Failed to send verification email. Please try again.");
      } else {
        setSuccess(true);
        startCooldown();
      }
    } catch {
      setError("An unexpected error occurred. Please check your internet connection.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const startCooldown = () => {
    setCooldown(60);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Auto-send verification email once on mount when we have the email parameter
  useEffect(() => {
    if (email) {
      sendVerificationEmail(true);
    }
  }, [email]);

  return (
    <AuthCard>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 mb-5">
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin text-neon" />
          ) : success ? (
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          ) : error ? (
            <AlertCircle className="h-8 w-8 text-red-400" />
          ) : (
            <Mail className="h-8 w-8 text-neon" />
          )}
        </div>

        <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {success ? "Verification Email Sent!" : "Verify Your Email"}
        </h1>

        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          {email ? (
            <>
              We sent a verification link to <span className="text-[var(--text-primary)] font-medium">{email}</span>. 
              Please click the link in the email to activate your account.
            </>
          ) : (
            "An email address is required to resend the verification link. Please go back to the sign in page and try again."
          )}
        </p>

        {/* Display Status Messages */}
        {loading && (
          <div className="mt-5 text-xs text-[var(--text-muted)] flex items-center justify-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" /> Sending link...
          </div>
        )}

        {success && !loading && (
          <div className="mt-5 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5 text-xs sm:text-sm text-green-400">
            A new verification email has been dispatched. Check your inbox and spam folders.
          </div>
        )}

        {error && !loading && (
          <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs sm:text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Resend button */}
        {email && (
          <div className="mt-6">
            <Button
              onClick={() => sendVerificationEmail(true)}
              disabled={loading || cooldown > 0}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              {cooldown > 0 ? (
                `Resend available in ${cooldown}s`
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" /> Resend Verification Email
                </>
              )}
            </Button>
          </div>
        )}

        {/* Navigation back to login */}
        <div className="mt-6 border-t border-[var(--border-default)] pt-5">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

export default function VerificationPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon border-t-transparent" />
        </div>
      }
    >
      <VerificationPendingContent />
    </Suspense>
  );
}
