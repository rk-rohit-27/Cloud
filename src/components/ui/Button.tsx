"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neon" | "ghost" | "outline";
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "neon",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variants = {
    neon: "btn-neon",
    ghost: "btn-ghost",
    outline: "border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent hover:border-neon/30 hover:text-neon",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
