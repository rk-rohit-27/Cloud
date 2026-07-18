import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { createPasswordResetToken } from "@/lib/password-reset";
import { sendEmail } from "@/lib/email";

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
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password — ZypherHost",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;background:#0a0a0a;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="font-size:24px;font-weight:700;color:#00f0ff;margin:0;">ZypherHost</h1>
          </div>
          <h2 style="color:#e4e4e7;font-size:18px;margin:0 0 8px;">Reset your password</h2>
          <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
            You requested a password reset. Click the button below to set a new password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#00f0ff,#0080ff);color:#0a0a0a;font-weight:600;font-size:14px;padding:12px 32px;border-radius:8px;text-decoration:none;">
            Reset Password
          </a>
          <p style="color:#71717a;font-size:12px;line-height:1.6;margin:24px 0 0;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      `,
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
