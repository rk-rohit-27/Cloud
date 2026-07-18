"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import SidebarNav from "@/components/dashboard/SidebarNav";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Fixed: Replaced raw root redirect with app router microtask pushing to avoid hydration frame flashing
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Prevent background viewport scroll leak interactions when mobile nav panel drawer layer is opened
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon border-t-transparent" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-primary)]">
      {/* Structural Topbar */}
      <DashboardTopbar onToggleSidebar={() => setMobileNavOpen(true)} />

      {/* Global Application Grid Shell Core View */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Desktop Sidebar — Fixed persistent left rail */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0 border-r border-[var(--glass-border)] bg-[var(--bg-primary)] p-6 overflow-y-auto">
          <div className="mb-6 px-2">
            <span className="font-(family-name:--font-space-grotesk) text-lg font-bold text-[var(--text-primary)]">
              Zypher<span className="gradient-text-sm">Host</span>
            </span>
          </div>
          <SidebarNav />
        </aside>

        {/* Mobile Navigation Backdrop & Sliding Drawer Layout Canvas */}
        <AnimatePresence>
          {mobileNavOpen && (
            <>
              {/* High Performance Blurred Screen Space View Overlay Backing Mask */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileNavOpen(false)}
              />
              
              {/* Drawer Container Panel Wrapper Object */}
              <motion.aside
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-[var(--glass-border)] bg-[var(--bg-primary)] p-5 shadow-2xl lg:hidden"
              >
                <div className="mb-6 flex items-center justify-between px-2">
                  <span className="font-(family-name:--font-space-grotesk) text-base font-bold text-[var(--text-primary)]">
                    <Link href="/">
                    Zypher<span className="gradient-text-sm">Host</span>
                  </Link>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                    aria-label="Close navigation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-1">
                  <SidebarNav />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Inner Main Scroll Surface Root Wrapper viewport framework */}
        <div className="flex w-full flex-col ">
          <main className="px-4 py-6  sm:py-8 w-full">
            <div className="mx-auto max-w-full md:max-w-6xl w-full">
              {children}
            </div>
          </main>
          
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}