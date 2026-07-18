import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMongoDb } from "@/lib/mongodb";
import { verifyPasswordResetToken, deletePasswordResetToken } from "@/lib/password-reset";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { token, password } = (await req.json()) as {
      token?: string;
      password?: string;
    };

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 },
      );
    }

    // Verify token
    const result = await verifyPasswordResetToken(token);
    if (!result) {
      return NextResponse.json(
        { error: "Invalid or expired password reset token." },
        { status: 400 },
      );
    }

    const db = await getMongoDb();
    const hashedPassword = await bcrypt.hash(password, 12);

    // Support both ObjectId and string type for _id
    let queryId: any;
    try {
      queryId = new ObjectId(result.userId);
    } catch {
      queryId = result.userId;
    }

    // Update user's password
    const updateResult = await db.collection("users").updateOne(
      { _id: queryId },
      { $set: { hashedPassword } },
    );

    let finalMatched = updateResult.matchedCount;

    if (finalMatched === 0) {
      // Try with string if ObjectId failed or vice versa
      try {
        const altQueryId = typeof queryId === "string" ? new ObjectId(queryId) : queryId.toString();
        const altUpdateResult = await db.collection("users").updateOne(
          { _id: altQueryId },
          { $set: { hashedPassword } },
        );
        finalMatched = altUpdateResult.matchedCount;
      } catch (err) {
        console.error("Failed to try alternative query ID type:", err);
      }
    }

    console.log(`Password reset for userId: ${result.userId}, matched documents: ${finalMatched}`);

    if (finalMatched === 0) {
      return NextResponse.json(
        { error: "User account not found. Password was not updated." },
        { status: 404 },
      );
    }

    // Delete reset token
    await deletePasswordResetToken(token);

    return NextResponse.json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
