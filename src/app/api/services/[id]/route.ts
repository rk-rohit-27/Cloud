import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import type { ServiceStatus } from "@/lib/services";

export const runtime = "nodejs";

const ACTIONS: Record<string, ServiceStatus> = {
  start: "Active",
  stop: "Stopped",
  restart: "Active",
  suspend: "Suspended",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId || !ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid service id" }, { status: 400 });
  }

  const { action } = (await req.json().catch(() => ({}))) as { action?: keyof typeof ACTIONS };
  const newStatus = action ? ACTIONS[action] : undefined;
  if (!newStatus) {
    return NextResponse.json(
      { error: "Invalid action. Use one of: start, stop, restart, suspend." },
      { status: 400 },
    );
  }

  const db = await getMongoDb();
  const result = await db.collection("services").findOneAndUpdate(
    { _id: new ObjectId(id), userId: new ObjectId(userId) },
    {
      $set: {
        status: newStatus,
        ...(action === "restart"
          ? { ramUsedPct: 12, cpuUsedPct: 8 }
          : action === "start"
            ? { ramUsedPct: 18, cpuUsedPct: 10 }
            : {}),
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, status: newStatus });
}
