export type ServiceStatus = "Active" | "Suspended" | "Pending" | "Stopped";
export type ServiceType = "Game Server" | "VPS Hosting" | "Web Hosting";

export interface ServiceDoc {
  _id: { toString(): string };
  userId: { toString(): string };
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  plan: string;
  priceMonthly: number;
  ram: string;
  ramUsedPct: number;
  cpu: string;
  cpuUsedPct: number;
  location: string;
  ip: string;
  renewDate: string;
  createdAt: Date;
}
