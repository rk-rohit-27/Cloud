import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMongoDb } from "@/lib/mongodb";
import { createVerificationToken } from "@/lib/verification";
import { sendEmail, generateEmailHtml } from "@/lib/email";

export const runtime = "nodejs"; // force Node runtime — mongodb needs Node built-ins

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    // ── Validate ───────────────────────────────
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // ── Connect & check existing ────────────────
    const db = await getMongoDb();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    // ── Create user ─────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.collection("users").insertOne({
      name,
      email,
      hashedPassword,
      emailVerified: null,
      image: null,
      createdAt: new Date(),
    });

    const userId = result.insertedId.toString();

    // ── Generate verification token & send email ─
    const token = await createVerificationToken(userId, email);
    
    let appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (host) {
      const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      appUrl = `${proto}://${host}`;
    }

    
    const verifyUrl = `${appUrl}/verify-email?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify your email — NexaSkyCloud",
        html: generateEmailHtml(
          "Verify your email — NexaSkyCloud",
          `
            <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #18181b;">Welcome aboard, ${name}!</h2>
            <p style="margin: 0 0 16px 0;">Thank you for creating an account with NexaSkyCloud. Please verify your email address to activate your account.</p>
            <p style="margin: 0;">This verification link will expire in 24 hours. If you did not create an account, you can safely ignore this email.</p>
          `,
          verifyUrl,
          "Verify Email Address"
        ),
      });
    } catch (emailErr) {
      console.error("Failed to send verification email:", emailErr);
      // Still return success — the user was created. They can request a resend.
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Please check your email to verify your account.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
