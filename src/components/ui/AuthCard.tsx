"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="dot-grid relative flex min-h-screen items-center justify-center px-4 py-20 sm:py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[300px] w-[300px] rounded-full bg-neon/8 blur-[100px] sm:h-[500px] sm:w-[500px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/3 h-[250px] w-[250px] rounded-full bg-neon-purple/8 blur-[80px] sm:h-[400px] sm:w-[400px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md sm:max-w-lg"
      >
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center">
          <Logo href="/" height={36} priority className="h-9 w-auto" />
        </div>

        {/* Card */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
