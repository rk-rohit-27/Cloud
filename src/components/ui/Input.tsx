"use client";

import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, id, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2"
        >
          {label}
        </label>

        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={`w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] py-2.5 sm:py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-neon focus:ring-1 focus:ring-neon/30 ${
              icon ? "pl-9 sm:pl-10 pr-3.5 sm:pr-4" : "px-3.5 sm:px-4"
            } ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""} ${className}`}
            {...props}
          />
        </div>

        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
