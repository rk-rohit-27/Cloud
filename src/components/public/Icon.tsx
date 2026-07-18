"use client";

import {
  Globe,
  Code2,
  Cloud,
  Server,
  Lock,
  Zap,
  Globe2,
  Database,
  RefreshCw,
  Mail,
  ShieldCheck,
  Layers,
  Terminal,
  Gauge,
  GitBranch,
  Cpu,
  MemoryStick,
  Activity,
  HardDrive,
  Network,
  type LucideProps,
} from "lucide-react";

/**
 * Central registry of Lucide icons used across public pages.
 *
 * Why this exists: Next.js App Router Server Components cannot pass component
 * references (functions) as props to Client Components — only serializable
 * values. So public pages pass a string `icon` key, and the client component
 * looks up the actual icon here.
 */
export const ICONS = {
  globe: Globe,
  code: Code2,
  cloud: Cloud,
  server: Server,
  lock: Lock,
  zap: Zap,
  globe2: Globe2,
  database: Database,
  refresh: RefreshCw,
  mail: Mail,
  shield: ShieldCheck,
  layers: Layers,
  terminal: Terminal,
  gauge: Gauge,
  git: GitBranch,
  cpu: Cpu,
  memory: MemoryStick,
  activity: Activity,
  drive: HardDrive,
  network: Network,
} as const;

export type IconKey = keyof typeof ICONS;

export default function Icon({
  name,
  ...props
}: { name: IconKey } & LucideProps) {
  const Cmp = ICONS[name] ?? Globe;
  return <Cmp {...props} />;
}
