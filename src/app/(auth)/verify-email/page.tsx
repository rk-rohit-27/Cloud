"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Mail, ArrowRight, Loader2 } from "lucide-react";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

type Status = "loading" | "success" | "error";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token found in the URL.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = (await res.json()) as { error?: string };

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error || "Verification failed.");
          return;
        }

        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    }

    verify();
  }, [token]);

  return (
    <AuthCard>
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 mb-5">
              <Loader2 className="h-8 w-8 animate-spin text-neon" />
            </div>
            <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Verifying your email
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Please wait while we confirm your email address&hellip;
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-5">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Email Verified
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Your account is now active. You can sign in to get started.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="mt-6"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-5">
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
            <h1 className="font-(family-name:--font-space-grotesk) text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Verification Failed
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {errorMessage}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-sm text-neon hover:underline font-medium"
              >
                Sign in to request a new verification email
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon border-t-transparent" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
