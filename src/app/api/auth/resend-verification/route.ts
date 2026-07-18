import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { createVerificationToken } from "@/lib/verification";
import { sendEmail, generateEmailHtml } from "@/lib/email";

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
      subject: "Verify your email — NexaSkyCloud",
      html: generateEmailHtml(
        "Verify your email — NexaSkyCloud",
        `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #18181b;">Verify your email</h2>
          <p style="margin: 0 0 16px 0;">You recently requested a new verification link for your NexaSkyCloud account. Please verify your email address to activate your account.</p>
          <p style="margin: 0;">This verification link will expire in 24 hours. If you did not create an account, you can safely ignore this email.</p>
        `,
        verifyUrl,
        "Verify Email Address"
      ),
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
