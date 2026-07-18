import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMongoDb } from "@/lib/mongodb";
import { createVerificationToken } from "@/lib/verification";
import { sendEmail } from "@/lib/email";

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
    
    let appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
    if (!appUrl) {
      const origin = req.headers.get("origin");
      if (origin) {
        appUrl = origin;
      } else {
        const proto = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
        if (host) {
          appUrl = `${proto}://${host}`;
        } else {
          try {
            appUrl = new URL(req.url).origin;
          } catch {
            appUrl = "http://localhost:3000";
          }
        }
      }
    }
    
    const verifyUrl = `${appUrl}/verify-email?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify your email — ZypherHost",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;background:#0a0a0a;border-radius:12px;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="font-size:24px;font-weight:700;color:#00f0ff;margin:0;">ZypherHost</h1>
            </div>
            <h2 style="color:#e4e4e7;font-size:18px;margin:0 0 8px;">Welcome aboard, ${name}!</h2>
            <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Please verify your email address to activate your account. This link expires in 24 hours.
            </p>
            <a href="${verifyUrl}"
               style="display:inline-block;background:linear-gradient(135deg,#00f0ff,#0080ff);color:#0a0a0a;font-weight:600;font-size:14px;padding:12px 32px;border-radius:8px;text-decoration:none;">
              Verify Email Address
            </a>
            <p style="color:#71717a;font-size:12px;line-height:1.6;margin:24px 0 0;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        `,
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
