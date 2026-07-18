import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "neon" | "ghost" | "outline";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * Renders a Next.js <Link> styled like the shared <Button> variants.
 *
 * Use this instead of wrapping <Button> in an <a>/<Link> — nesting a
 * <button> inside an anchor is invalid HTML and breaks client-side
 * navigation/prefetching.
 */
export default function LinkButton({
  href,
  children,
  variant = "neon",
  className = "",
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-semibold transition-all duration-300";

  const variants: Record<Variant, string> = {
    neon: "btn-neon",
    ghost: "btn-ghost",
    outline:
      "border border-[var(--border-default)] text-[var(--text-primary)] bg-transparent hover:border-neon/30 hover:text-neon",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
