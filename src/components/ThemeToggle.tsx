"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />; // placeholder to avoid layout shift
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 transition-all hover:border-neon/30 hover:text-neon dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:border-neon/30 dark:hover:text-neon sm:border-neutral-200 sm:bg-neutral-100 sm:text-neutral-600 sm:hover:border-neon-blue/40 sm:hover:text-neon-blue"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
