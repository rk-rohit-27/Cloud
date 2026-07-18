import { NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/verification";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { token } = (await req.json()) as { token?: string };

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 },
      );
    }

    const result = await verifyEmailToken(token);

    if (!result) {
      return NextResponse.json(
        {
          error:
            "Invalid or expired verification token. Please request a new one.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (err) {
    console.error("Verify email error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
