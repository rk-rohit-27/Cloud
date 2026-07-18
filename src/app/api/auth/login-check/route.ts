import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json({ error: "InvalidCredentials" }, { status: 400 });
    }

    const db = await getMongoDb();
    const user = await db.collection("users").findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "InvalidCredentials" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return NextResponse.json({ error: "InvalidCredentials" }, { status: 400 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ error: "EmailNotVerified", email: user.email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login check error:", error);
    return NextResponse.json({ error: "ServerError" }, { status: 500 });
  }
}
