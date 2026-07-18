import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { createVerificationToken } from "@/lib/verification";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

/** Rate limit: only allow one resend per minute. */
const RATE_LIMIT_MS = 60 * 1000;

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 },
      );
    }

    const db = await getMongoDb();

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 },
      );
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Your email is already verified." },
        { status: 400 },
      );
    }

    const userId = user._id.toString();

    // Rate limit: check for a recently created token
    const existingToken = await db
      .collection("verification_tokens")
      .findOne({ identifier: userId });
    if (existingToken) {
      const elapsed = Date.now() - (existingToken.createdAt as Date).getTime();
      if (elapsed < RATE_LIMIT_MS) {
        return NextResponse.json(
          { error: "Please wait a moment before requesting another email." },
          { status: 429 },
        );
      }
    }

    // Generate new token and send email
    const newToken = await createVerificationToken(
      userId,
      email,
    );
    
    let appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (host) {
      const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      appUrl = `${proto}://${host}`;
    }
    
    const verifyUrl = `${appUrl}/verify-email?token=${newToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email — ZypherHost",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;background:#0a0a0a;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="font-size:24px;font-weight:700;color:#00f0ff;margin:0;">ZypherHost</h1>
          </div>
          <h2 style="color:#e4e4e7;font-size:18px;margin:0 0 8px;">Verify your email</h2>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Please verify your email address to activate your account. This link expires in 24 hours.
          </p>
          <a href="${verifyUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#00f0ff,#0080ff);color:#0a0a0a;font-weight:600;font-size:14px;padding:12px 32px;border-radius:8px;text-decoration:none;">
            Verify Email Address
          </a>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Verification email sent.",
    });
  } catch (err) {
    console.error("Resend verification error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
