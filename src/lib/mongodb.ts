import "server-only";
import { MongoClient, type Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);
  cachedClient = client;
  return client;
}

export async function getMongoDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await getMongoClient();
  await client.connect();
  const db = client.db();
  cachedDb = db;
  return db;
}
