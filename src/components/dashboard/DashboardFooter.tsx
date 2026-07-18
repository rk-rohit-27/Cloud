export default function DashboardFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="dashboard-footer border-t border-[var(--topbar-border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-3 text-[11px] text-[var(--text-muted)] sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>All systems operational</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Build 2026.07</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>&copy; {year} NexaSkyCloud</span>
        </div>
      </div>
    </footer>
  );
}
