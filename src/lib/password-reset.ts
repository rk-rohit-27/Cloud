import "server-only";
import { randomBytes } from "crypto";
import { getMongoDb } from "@/lib/mongodb";

/** Generate a cryptographically random hex token. */
export function generateResetToken(): string {
  return randomBytes(32).toString("hex");
}

const RESET_TOKEN_EXPIRY_MS = 1 * 60 * 60 * 1000; // 1 hour

/**
 * Store a password reset token in the DB, linked to a user.
 * Replaces any existing token for this user first.
 */
export async function createPasswordResetToken(
  userId: string,
  email: string,
): Promise<string> {
  const db = await getMongoDb();
  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

  // Replace any existing token for this user
  await db.collection("password_reset_tokens").updateOne(
    { identifier: userId },
    {
      $set: {
        token,
        identifier: userId,
        email,
        expires: expiresAt,
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  return token;
}

/**
 * Verify a reset token: look it up, check expiry.
 * Returns the userId and email on success, or null if invalid/expired.
 */
export async function verifyPasswordResetToken(
  token: string,
): Promise<{ userId: string; email: string } | null> {
  const db = await getMongoDb();

  const record = await db.collection("password_reset_tokens").findOne({ token });
  if (!record) return null;

  if (new Date() > record.expires) {
    // Clean up expired token
    await db.collection("password_reset_tokens").deleteOne({ _id: record._id });
    return null;
  }

  return { userId: record.identifier, email: record.email };
}

/**
 * Delete a password reset token from the DB.
 */
export async function deletePasswordResetToken(token: string): Promise<void> {
  const db = await getMongoDb();
  await db.collection("password_reset_tokens").deleteOne({ token });
}
