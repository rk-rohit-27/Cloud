"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Intrinsic dimensions of the logo PNGs in /public.
// Dark logo: 1047×696. Light logo: 1080×717. Aspect ratios are effectively
// identical (~1.50), so both render in the same layout slots.
// next/image requires width/height for static string `src` to prevent layout shift.
const LOGO_DARK = { src: "/NexaSkyCloud-logo.png", width: 1047, height: 696 };
const LOGO_LIGHT = { src: "/NexaSkyCloud-logo-light.png", width: 1080, height: 717 };

type LogoProps = {
  /** Height of the rendered logo in pixels. Width scales to preserve aspect ratio. */
  height?: number;
  /** Optional className applied to each <Image> for layout/spacing tweaks. */
  className?: string;
  /** Wraps the logo in a Next.js <Link> when provided. */
  href?: string;
  /** Priority hint for above-the-fold logos (e.g. header). */
  priority?: boolean;
};

/**
 * Single source of truth for the NexaSkyCloud brand logo.
 *
 * Reads the resolved theme from next-themes and renders the appropriate
 * logo variant:
 *   - "dark" theme  → light logo (good contrast on dark backgrounds)
 *   - "light" theme → dark/normal logo (good contrast on light backgrounds)
 */
export default function Logo({
  height = 28,
  className,
  href,
  priority = false,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: next-themes resolves the theme on the client.
  // Render a placeholder until we know the resolved theme.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logo = isDark ? LOGO_DARK : LOGO_LIGHT;
  const width = Math.round((logo.width / logo.height) * height);

  const img = mounted ? (
    <Image
      src={logo.src}
      alt="NexaSkyCloud"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height: "auto", width: "auto" }}
    />
  ) : (
    // SSR/initial render: show dark/normal logo as placeholder (matches
    // defaultTheme="dark" light-logo expectation — avoids visible flash
    // since the client resolves to dark almost instantly).
    <div
      className={className}
      style={{ height, aspectRatio: `${LOGO_DARK.width} / ${LOGO_DARK.height}` }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center" aria-label="NexaSkyCloud home">
        {img}
      </Link>
    );
  }

  return img;
}
