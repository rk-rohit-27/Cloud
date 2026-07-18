import "server-only";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type ServiceType = "Game Server" | "VPS Hosting" | "Web Hosting";
export type ServiceStatus = "Active" | "Suspended" | "Pending" | "Stopped";

export interface ServiceRecord {
  _id: string;
  userId: string;
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  plan: string;
  /** Monthly price in dollars (e.g. 12.99) */
  priceMonthly: number;
  ram: string;
  ramUsedPct: number;
  cpu: string;
  cpuUsedPct: number;
  location: string;
  ip: string;
  renewDate: string;
  createdAt: string;
}

interface ServiceDoc {
  _id: ObjectId;
  userId: ObjectId | string;
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

function toObjectId(value: string | ObjectId): ObjectId {
  if (value instanceof ObjectId) return value;
  return new ObjectId(value);
}

function serialize(doc: ServiceDoc): ServiceRecord {
  return {
    _id: doc._id.toString(),
    userId: typeof doc.userId === "string" ? doc.userId : doc.userId.toString(),
    name: doc.name,
    type: doc.type,
    status: doc.status,
    plan: doc.plan,
    priceMonthly: doc.priceMonthly,
    ram: doc.ram,
    ramUsedPct: doc.ramUsedPct,
    cpu: doc.cpu,
    cpuUsedPct: doc.cpuUsedPct,
    location: doc.location,
    ip: doc.ip,
    renewDate: doc.renewDate,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function listServicesForUser(userId: string): Promise<ServiceRecord[]> {
  const db = await getMongoDb();
  const docs = (await db
    .collection<ServiceDoc>("services")
    .find({ userId: toObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()) as unknown as ServiceDoc[];

  return docs.map(serialize);
}

export async function getServiceForUser(
  serviceId: string,
  userId: string,
): Promise<ServiceRecord | null> {
  if (!ObjectId.isValid(serviceId) || !ObjectId.isValid(userId)) return null;
  const db = await getMongoDb();
  const doc = (await db.collection<ServiceDoc>("services").findOne({
    _id: new ObjectId(serviceId),
    userId: new ObjectId(userId),
  })) as unknown as ServiceDoc | null;
  return doc ? serialize(doc) : null;
}

export interface CreateServiceInput {
  userId: string;
  name: string;
  type: ServiceType;
  plan: string;
  priceMonthly: number;
  ram: string;
  cpu: string;
  location: string;
}

export async function createService(input: CreateServiceInput): Promise<ServiceRecord> {
  const db = await getMongoDb();
  const now = new Date();
  const renew = new Date(now);
  renew.setDate(renew.getDate() + 30);

  const doc = {
    userId: toObjectId(input.userId),
    name: input.name,
    type: input.type,
    status: "Pending" as ServiceStatus,
    plan: input.plan,
    priceMonthly: input.priceMonthly,
    ram: input.ram,
    ramUsedPct: 0,
    cpu: input.cpu,
    cpuUsedPct: 0,
    location: input.location,
    ip: "Provisioning…",
    renewDate: renew.toISOString().slice(0, 10),
    createdAt: now,
  };

  const result = await db.collection("services").insertOne(doc);
  return {
    _id: result.insertedId.toString(),
    userId: input.userId,
    name: doc.name,
    type: doc.type,
    status: doc.status,
    plan: doc.plan,
    priceMonthly: doc.priceMonthly,
    ram: doc.ram,
    ramUsedPct: doc.ramUsedPct,
    cpu: doc.cpu,
    cpuUsedPct: doc.cpuUsedPct,
    location: doc.location,
    ip: doc.ip,
    renewDate: doc.renewDate,
    createdAt: doc.createdAt.toISOString(),
  };
}
