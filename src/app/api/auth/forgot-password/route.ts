import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { createPasswordResetToken } from "@/lib/password-reset";
import { sendEmail, generateEmailHtml } from "@/lib/email";

export const runtime = "nodejs";

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

    // Generate reset token and send email
    const token = await createPasswordResetToken(user._id.toString(), email);
    
    let appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (host) {
      const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      appUrl = `${proto}://${host}`;
    }
    
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password — NexaSkyCloud",
      html: generateEmailHtml(
        "Reset your password — NexaSkyCloud",
        `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #18181b;">Reset your password</h2>
          <p style="margin: 0 0 16px 0;">You recently requested to reset your password for your NexaSkyCloud account. Click the button below to set a new password.</p>
          <p style="margin: 0;">This password reset link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
        `,
        resetUrl,
        "Reset Password"
      ),
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
