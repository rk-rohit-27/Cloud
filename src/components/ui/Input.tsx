"use client";

import { type InputHTMLAttributes, type ReactNode, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, id, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

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
            type={inputType}
            className={`w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] py-2.5 sm:py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-neon focus:ring-1 focus:ring-neon/30 ${
              icon ? "pl-9 sm:pl-10" : "pl-3.5 sm:pl-4"
            } ${isPasswordType ? "pr-10 sm:pr-11" : "pr-3.5 sm:pr-4"} ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            } ${className}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-neon transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-[var(--text-muted)]" />
              ) : (
                <Eye className="h-4 w-4 text-[var(--text-muted)]" />
              )}
            </button>
          )}
        </div>

        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
