import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listServicesForUser } from "@/lib/services";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const services = await listServicesForUser(userId);
  return NextResponse.json({ services });
}
